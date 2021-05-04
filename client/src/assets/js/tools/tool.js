export class Tool {
  constructor(canvas, socket, id) {
    this.socket = socket
    this.id = id

    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.ctx.lineWidth = 3
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this._destroyListens()
  }

  set fillColor(color) {
    this.ctx.fillStyle = color
  }

  set strokeColor(color) {
    this.ctx.strokeStyle = color
  }

  set lineWidth(width) {
    this.ctx.lineWidth = width
  }

  _destroyListens() {
    this.canvas.onmouseup = null
    this.canvas.onmousedown = null
    this.canvas.onmousemove = null
  }
}
