import { canvasState } from './store/canvasState.js'

export function connectionHandler() {
  if (canvasState.username) {
    const socket = new WebSocket('ws://localhost:5000/')

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          username: canvasState.username,
          id: canvasState.sessionId,
          method: 'connection',
        })
      )

      socket.onmessage = (e) => {
        console.log(e.data)
      }
    }
  }
}
