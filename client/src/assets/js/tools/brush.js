import { Tool } from './tool.js'

export class Brush extends Tool {
  constructor(canvas) {
    super(canvas)
    this.ctx.strokeStyle = 'black'
    this.listen()
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.ctx.moveTo(e.x, e.y)
  }

  mouseUpHandler() {
    this.mouseDown = false
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(e.x, e.y)
    }
  }

  draw(x, y) {
    this.ctx.lineTo(x, y)
    this.ctx.lineCap = 'round'
    this.ctx.stroke()
  }
}
