const express = require('express')

const app = express()

app.use(express.json())

// Static
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/styles'))
app.use('/js', express.static(__dirname + 'public/js'))

// Template Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

// Routes
const homeRouter = require('./src/routes/home')

app.use('/', homeRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
