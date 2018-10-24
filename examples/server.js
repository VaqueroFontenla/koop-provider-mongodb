const config = require('config')
const Koop = require('koop');

const koop = new Koop(config);
const FeatureServer = require('koop-output-geoservices')
const Provider = require('koop-provider-mongodb')

koop.register(Provider);
koop.register(FeatureServer);


koop.server.listen(8000);
