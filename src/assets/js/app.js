import { Brush } from './tools/brush.js'
import { Rect } from './tools/rect.js'

let prevToolEl

document.addEventListener('DOMContentLoaded', main)
const tool_erase = document.getElementById('tool-erase')
const tool_rect = document.getElementById('tool-rect')
const tool_brush = document.getElementById('tool-brush')

function main() {
  const canvas = document.getElementById('canvas')
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  new Brush(canvas) // initially it sets to brush
  prevToolEl = tool_brush

  // Tools
  tool_brush.addEventListener('click', () => {
    toggleTool(Brush, tool_brush, canvas)
  })

  tool_rect.addEventListener('click', () => toggleTool(Rect, tool_rect, canvas))
}

function toggleTool(Tool, toolEl, canvas) {
  if (prevToolEl) prevToolEl.classList.remove('is-active')
  new Tool(canvas)
  toolEl.classList.add('is-active')

  prevToolEl = toolEl
}
