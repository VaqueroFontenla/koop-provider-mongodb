const MongoClient = require('mongodb').MongoClient;

function connect(mongourl, dbName) {
  return _getClient(mongourl)
    .then(client => _getDbConnection(client, dbName))
    .then(db => db);
}

function _getDbConnection(c, database) {
  return new Promise(function(resolve, reject) {
    resolve(c.db(database));
  });
}

function _getClient(url) {
  return new Promise(function(resolve, reject) {
    // TODO try catch to capture runtime errors
    MongoClient.connect(url, function(err, client) {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    })
  });
}

function query(dbCon, optsObj) {
  const collection = dbCon.collection(optsObj.collectionName);
  return new Promise(function(resolve, reject) {
    collection
      .find(optsObj.queryObj)
      .project({
        "lng": 1,
        "lat": 1,
        "PK": 1,
        "alias": 1,
        "carretera": 1,
        "codEle": 1,
        "estado": 1,
        "sentido": 1
      })
      .toArray(function(err, docs) {
        console.log("Found the following records");
        //console.log(docs)
        if (err) {
          reject(err);
        } else {
          resolve(fromArrayToGeoJSON(docs));
        }
      });
  });
}
const geoJSON = {
  "type": "FeatureCollection",
  "features": []
};
const geoJsonFeatures = geoJSON.features;

function fromArrayToGeoJSON(arr) {
  const geoJSON = {
    "type": "FeatureCollection",
    "features": []
  };
  const geoJsonFeatures = geoJSON.features;
  arr.map((el) => {
    geoJsonFeatures.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [el.lng,
          el.lat
        ]
      },
      "properties": {
        'PK': el.PK,
        'alias': el.alias,
        'carretera': el.carretera,
        'codEle': el.codEle,
        'estado': el.estado,
        'sentido': el.sentido,
        'tipo': el.tipo
      }
    })
  });
  return geoJSON;
}

module.exports = {
  connect: connect,
  query: query
};
