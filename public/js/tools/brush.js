import { Tool } from './tool.js'

export class Brush extends Tool {
  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousedown = this.mouseDown.bind(this)
    this.canvas.onmouseup = this.mouseUp.bind(this)
    this.canvas.onmousemove = this.mouseMove.bind(this)
  }

  mouseUp = () => {
    this.isDrawing = false
  }
  mouseDown = (e) => {
    this.isDrawing = true
    this.ctx.beginPath()
    this.ctx.moveTo(e.x, e.y)
  }
  mouseMove = (e) => {
    if (this.isDrawing) {
      this.draw(e.x, e.y)
    }
  }

  draw(x, y) {
    this.ctx.lineTo(x, y)
    this.ctx.lineWidth = 3
    this.ctx.lineCap = 'round'
    this.ctx.strokeStyle = '#000'
    this.ctx.stroke()
  }
}
