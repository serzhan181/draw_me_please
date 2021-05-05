const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const path = require('path')

const clientPath = path.join(__dirname, '..', 'client', 'dist')
app.use(cors())
app.use('/assets', express.static(path.resolve(clientPath, 'assets')))

const PORT = process.env.PORT || 5000

app.get('/room/:id', (req, res) => {
  res.sendFile(path.resolve(clientPath, 'room.html'))
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(clientPath, 'index.html'))
})

// WebSockets
app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    msg = JSON.parse(msg)
    switch (msg.method) {
      case 'connection':
        connectionHandler(ws, msg)
        break

      case 'draw':
        broadcastConnection(ws, msg)
        break
    }
  })
})

app.listen(PORT, () => console.log(`server started at port ${PORT}`))

const connectionHandler = (ws, msg) => {
  ws.id = msg.id
  broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg))
    }
  })
}
