import { Brush } from './tools/brush.js'
import { Rect } from './tools/rect.js'
import { Eraser } from './tools/eraser.js'
import { tool } from './store/toolState.js'

document.addEventListener('DOMContentLoaded', main)

function main() {
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
  const tool_eraser = document.getElementById('tool-eraser')

  const canvas = document.getElementById('canvas')
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  tool.setTool(new Brush(canvas)) // initially it sets to brush

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
  tool_color.addEventListener('change', (e) => tool.setColor(e.target.value))
  tool_width.addEventListener('change', (e) => {
    tool.setLineWidth(e.target.value)
  })
}
