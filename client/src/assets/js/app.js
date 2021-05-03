import { Brush } from './tools/brush.js'
import { Rect } from './tools/rect.js'
import { Eraser } from './tools/eraser.js'
import { tool } from './store/toolState.js'
import { canvasState } from './store/canvasState.js'
import { testWs } from './ws.js'

document.addEventListener('DOMContentLoaded', main)

function main() {
  // TESTING ONE TWO ONE TWO
  testWs()
  // Modals
  toggleShortcutsModal()
  // Tools
  if (window.location.pathname === '/room.html') {
    toolInit()
  }
}

function toolInit() {
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
  tool.setTool(new Brush(canvas)) // initially it sets to brush
  canvasState.setCanvas(canvas)

  let prevToolEl = tool_brush

  const toggleTool = (Tool, toolEl) => {
    if (prevToolEl) prevToolEl.classList.remove('is-active')
    tool.setTool(new Tool(canvas))
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

function toggleShortcutsModal() {
  const shortcutsEl = document.getElementById('shortcuts')
  const shortcutsModalEl = document.getElementById('shortcuts-modal')
  const shortcutsModalBackEl = document.getElementById(
    'shortcuts-modal-overlay'
  )
  const shortcutsModalClose = document.getElementById('shortcuts-modal-close')
  shortcutsEl.addEventListener('click', () => {
    shortcutsModalEl.classList.add('is-active')
  })
  shortcutsModalBackEl.addEventListener('click', () => {
    shortcutsModalEl.classList.remove('is-active')
  })
  shortcutsModalClose.addEventListener('click', () => {
    shortcutsModalEl.classList.remove('is-active')
  })
}
