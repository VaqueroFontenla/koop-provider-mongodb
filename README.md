# koop-provider-mongodb

This provider accesses a collection of json documents in MongoDB,


This provider makes it possible to access a collection of json documents in MongoDB as either GeoJSON or an Esri FeatureService. This is particular useful for making maps and doing analysis on the web.
This is provider was created from the [koop-provider-sample](https://github.com/koopjs/koop-provider-sample) that demonstrates how to build a Koop Provider.

## Required:
- [node.js](https://nodejs.org/es/)
- [mongoDB](https://docs.mongodb.com/manual/installation/)


## Getting started

1. Create the `field.js` that will start a Koop instance and register the mondodb-provider.
This `field.js` contains:
 ```js
 var koop = require('koop')(config);
 const FeatureServer = require('koop-output-geoservices')
 const Provider = require('koop-provider-mongodb')
 
 koop.register(Provider);
 koop.register(FeatureServer);
 
 koop.server.listen(80);
 ```
1. Open `config/default.json` with any configurable parameters
1. Open `model.js` and configure `:id` parameter into `getData function` to call the provider and return GeoJSON.
1. Open `mongo.js` and specifies the fields to return in the documents that match the query filter into `query function`.
1. Install dependencies `npm install`.
1. Run a local server `npm start`.

## Usage

By default, Koop will start listening on http://localhost:8080.

You can issue a request by using:

```sh
$ curl http://localhost:8080/mongodb/:id/FeatureServer0/query
```

Any query-parameters added to the request URL can accessed within getData and leveraged for data fetching purposes.
