const express = require('express')
const app = express()

const WSServer = require('express-ws')(app)

const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
  console.log('CONNECTED TO WS')

  ws.send("FROM SERVER: YOU'RE CONNECtED SUCCESFULLY")
  ws.on('message', (msg) => {
    console.log('FROM FRONT: ' + msg)
  })
})

app.listen(PORT, () => console.log(`server started at port ${PORT}`))
