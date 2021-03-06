class CanvasState {
  constructor() {
    this.canvas = null
    this.undoList = []
    this.redoList = []
    this.username = localStorage.getItem('username') || ''
    this.sessionId = null
    this.socket = null
  }

  setCanvas(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  setSocket(socket) {
    this.socket = socket
  }

  setSessionId(sessionId) {
    this.sessionId = sessionId
  }

  setUsername(username) {
    localStorage.setItem('username', username)
    this.username = username
  }

  pushToUndo(data) {
    this.undoList.push(data)
  }

  pushToRedo(data) {
    this.redoList.push(data)
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  undo() {
    if (this.undoList.length) {
      const dataUrl = this.undoList.pop()
      this.redoList.push(this.canvas.toDataURL())
      const img = new Image()
      img.src = dataUrl

      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
      return
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  redo() {
    if (this.redoList.length) {
      let dataUrl = this.redoList.pop()
      this.undoList.push(this.canvas.toDataURL())
      let img = new Image()
      img.src = dataUrl
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
    }
  }
}

export const canvasState = new CanvasState()
