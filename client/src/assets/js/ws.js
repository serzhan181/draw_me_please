import { canvasState } from './store/canvasState.js'
import { Brush } from './tools/brush.js'
import { tool } from './store/toolState.js'
import { requestUsername, toggleModal, closeModal } from './modals.js'
import { Rect } from './tools/rect.js'
import { Eraser } from './tools/eraser.js'
import { Chat } from './chat.js'
import { getRooms, insertRoom } from './lib/supabase.js'

export class Room {
  constructor() {
    if (!canvasState.username.length) {
      requestUsername({ callCallback: true })
      return
    }

    connectionHandler()
  }

  static async pullRooms() {
    const freeRooms = document.getElementById('free-rooms')

    const rooms = await getRooms()

    if (Array.isArray(rooms)) {
      for (const { name, id } of rooms) {
        const r = document.createElement('div')
        r.classList.add(['card', 'is-rounded', 'has-background-white'])

        r.innerHTML = `
      <header class="card-header">
        <p class="card-header-title">
        ${name}
        </p>
      <a class="card-header-icon" aria-label="more options" href="/room/${id}">
        <span class="icon title is-4 has-text-success-dark">
          <strong>▶</strong>
        </span>
      </a>
    </header>
      `

        freeRooms.appendChild(r)
      }
    }
  }

  static listenCreateNewRoom() {
    toggleModal('room-action', 'room-modal', ['room-overlay', 'room-close'])

    const form = document.getElementById('room-form')
    const input = document.getElementById('room-input')

    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      if (!input.value.length) return

      const [room] = await insertRoom({ name: input.value })

      const freeRooms = document.getElementById('free-rooms')
      const roomEl = document.createElement('div')
      roomEl.classList.add(['card', 'is-rounded', 'has-background-white'])

      roomEl.innerHTML = `
      <header class="card-header">
        <p class="card-header-title">
        ${room.name}
        </p>
      <a class="card-header-icon" aria-label="more options" href="/room/${room.id}">
        <span class="icon title is-4 has-text-success-dark">
          <strong>▶</strong>
        </span>
      </a>
    </header>
      `

      freeRooms.appendChild(roomEl)

      closeModal('room-modal')
    })
  }
}

export function connectionHandler() {
  if (canvasState.username) {
    const socket = new WebSocket('ws://localhost:5000/')
    canvasState.setSocket(socket)
    toolInit(socket, canvasState.sessionId)
    tool.setTool(new Brush(canvasState.canvas, socket, canvasState.sessionId)) // Default tool

    new Chat(canvasState.username, socket, canvasState.sessionId)

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          username: canvasState.username,
          id: canvasState.sessionId,
          method: 'connection',
        })
      )

      socket.onmessage = (e) => {
        const msg = JSON.parse(e.data)

        switch (msg.method) {
          case 'connection':
            const chatEl = document.getElementById('chat-in')

            Chat.greetings(chatEl, msg.username)
            break

          case 'draw':
            drawHandler(msg)
            break

          case 'message':
            messageHandler(msg)
            break
        }
      }
    }
  }
}

function messageHandler(msg) {
  const { authorName, body } = msg.message

  const chatEl = document.getElementById('chat-in')
  Chat.staticAddMessage(chatEl, authorName, body)
}

function drawHandler(msg) {
  const figure = msg.figure

  const ctx = canvasState.canvas.getContext('2d')

  switch (figure.type) {
    case 'brush':
      Brush.draw(ctx, figure.x, figure.y, figure.color)
      break

    case 'finish':
      ctx.beginPath()
      break

    case 'rect':
      Rect.finalDraw(ctx, figure.x, figure.y, figure.w, figure.h, figure.color)
      break
  }
}

function toolInit(socket, id) {
  const tool_width = document.getElementById('tool-width')
  const tool_rect = document.getElementById('tool-rect')
  const tool_brush = document.getElementById('tool-brush')
  const tool_color = document.getElementById('tool-color')
  const tool_color_input = document.getElementById('tool-color-input')
  const tool_eraser = document.getElementById('tool-eraser')
  const tool_clear_canvas = document.getElementById('tool-clear-canvas')
  const undo = document.getElementById('undo')
  const redo = document.getElementById('redo')

  const canvas = document.getElementById('canvas')
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  canvasState.setCanvas(canvas)

  let prevToolEl = tool_brush

  const toggleTool = (Tool, toolEl) => {
    if (prevToolEl) prevToolEl.classList.remove('is-active')
    tool.setTool(new Tool(canvas, socket, id))
    toolEl.classList.add('is-active')

    prevToolEl = toolEl
  }

  // Listeners
  tool_brush.addEventListener('click', () => {
    toggleTool(Brush, tool_brush, canvas)
  })
  tool_rect.addEventListener('click', () => toggleTool(Rect, tool_rect))
  tool_eraser.addEventListener('click', () => toggleTool(Eraser, tool_eraser))
  tool_color.addEventListener('click', () => tool_color_input.click())
  tool_color_input.addEventListener('change', (e) => {
    tool.setColor(e.target.value)
  })
  tool_width.addEventListener('change', (e) => {
    tool.setLineWidth(e.target.value)
  })
  tool_clear_canvas.addEventListener('click', () => canvasState.clearCanvas())

  canvas.addEventListener('mousedown', () => {
    canvasState.pushToUndo(canvas.toDataURL())
  })

  undo.addEventListener('click', () => canvasState.undo())
  redo.addEventListener('click', () => canvasState.redo())
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
      canvasState.undo()
    }
    if (e.ctrlKey && e.key === 'y') {
      canvasState.redo()
    }
  })
}
