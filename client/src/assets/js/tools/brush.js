import { Tool } from './tool.js'

export class Brush extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id)
    this.listen()
    this.ctx.strokeStyle = 'black'
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
    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'finish',
          x: e.x,
          y: e.y,
          color: this.ctx.strokeStyle,
        },
      })
    )
  }

  mouseUpHandler() {
    this.mouseDown = false
    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'finish',
        },
      })
    )
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.id,
          figure: {
            type: 'brush',
            x: e.x,
            y: e.y,
            color: this.ctx.strokeStyle,
          },
        })
      )
    }
  }

  static draw(ctx, x, y, color) {
    ctx.strokeStyle = color
    ctx.lineTo(x, y)
    ctx.lineCap = 'round'
    ctx.stroke()
  }
}
