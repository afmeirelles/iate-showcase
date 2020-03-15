const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// middleware handlers
const routes = require('./src/handlers/routes')

// express server
const app = express()

// middlewares setup
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// incorporate routes to express server
routes(app)

const port = 5000

// server start
app.listen(port, () => console.log(`Server started on port ${port}`))