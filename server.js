// clean shutdown on `cntrl + c`
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

// Initialize Koop
const Koop = require('koop')
const koop = new Koop()
// var tiles = require('@koopjs/output-vector-tiles')
// koop.register(tiles)

const config = require('config')

// Install the provider and apply authentication
const provider = require('./index.js')
koop.register(provider)

// Set port for configuration or fall back to default
const port = config.port || 8080
koop.server.listen(port)