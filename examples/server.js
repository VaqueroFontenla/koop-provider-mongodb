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

const PORT = 8080
// In Local Development, be aware that port has to be greater than 1024   ( Unpriviledge port)
koop.server.listen(PORT);
