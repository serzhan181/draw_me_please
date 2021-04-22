import { Brush } from './tools/brush.js'
const canvas = document.querySelector('canvas')
canvas.width = innerWidth - 50
canvas.height = innerHeight - 50

document.addEventListener('DOMContentLoaded', () => {
  new Brush(canvas)
})
