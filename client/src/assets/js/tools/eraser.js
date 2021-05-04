import { Brush } from './brush.js'

export class Eraser extends Brush {
  constructor(canvas, socket, id) {
    super(canvas, socket, id)
    this.ctx.strokeStyle = 'rgb(238, 238, 238)'
  }

  static draw(ctx, x, y) {
    ctx.lineTo(x, y)
    ctx.lineCap = 'round'
    ctx.stroke()
  }
}
