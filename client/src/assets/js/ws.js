export function testWs() {
  const test_ws = document.getElementById('test-ws')
  const socket = new WebSocket('ws://localhost:5000/')

  socket.onopen = () => {
    console.log('FRONT: WS CONNECTED')
  }
  socket.onmessage = (e) => {
    console.log(`S: ${e.data}`)
  }

  test_ws.addEventListener('click', () => {
    socket.send('Hello server)))')
  })
}
