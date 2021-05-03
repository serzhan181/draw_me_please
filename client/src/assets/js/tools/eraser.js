import { Brush } from './brush.js'

export class Eraser extends Brush {
  constructor(canvas) {
    super(canvas)
  }

  draw(x, y) {
    this.ctx.strokeStyle = 'rgb(238, 238, 238)'
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }
}
