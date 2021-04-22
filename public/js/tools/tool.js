export class Tool {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this._destroyEvents()
  }

  _destroyEvents() {
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
    this.canvas.onmousemove = null
  }
}
