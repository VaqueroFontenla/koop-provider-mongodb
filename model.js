// mongo = {
//   connect :
//   query :  returns a promise
// }

const mongo = require('./mongo.js');
const config = require('config');


/**
 * Model constructor
 */
function Model() {}

/**
 * Fetch data from source.  Pass result or error to callback.
 * This is the only public function you need to implement on Model
 * @param {object} express request object
 * @param {function} callback
 */
Model.prototype.getData = function(req, callback) {
  const idQuery = req.params.id.toUpperCase();
  (async (dbConf, cb) => {
    const db = await mongo.connect(dbConf.url,dbConf.dbname);
    const geojson = await mongo.query(db,dbConf.opts).catch((err) => {
      console.error(err);
    });
    cb(null,geojson);
  })({
    url : config.mongodb.url,
      dbname: config.mongodb.databasename,
      opts: {
        collectionName: config.mongodb.collectionname,
        queryObj: {
          [config.mongodb.field_id]: idQuery
        }
      }
    }, callback);
}



module.exports = Model
