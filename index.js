const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// GraphQL schemas
const schemas = require('./src/handlers/schemas')

// express server
const app = express()

// middlewares setup
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
// TODO: find a GraphQL-compliant way to authenticate requests

// adds graphql middleware and schemas to server
schemas(app)

const port = 5000

// server start
app.listen(port, () => console.log(`Server started on port ${port}`))