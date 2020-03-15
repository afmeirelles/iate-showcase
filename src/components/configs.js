const dotenv = require('dotenv')
const get = require('lodash/get')

const { parsed } = dotenv.config()

module.exports = configName => get(parsed, configName)