const provider = {
  type: 'provider',
  name: 'mongodb',
  hosts: false,
  disableIdParam: false,
  Model: require('./model'),
  version: require('./package.json').version
}

module.exports = provider
