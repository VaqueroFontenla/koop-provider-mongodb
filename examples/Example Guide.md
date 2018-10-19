# Example Guide

## Creating a koop provider

1. **Create Node.js project**:
 1. Create a directory:
 ```sh
 $ mkdir my-project
 ```
 2. To execute in the project:
 ```sh
 $ npm init –y
 ```
**npm init -y**: generate the package.json file with default options (without asking any questions)

1. **Install mongodb**:

  We install the mongodb driver and it's dependencies by executing the following `npm` command.
  ```sh
  $ npm install mongodb --save
  ```
  This will download the MongoDB driver and add a dependency entry in your `package.json` file.

1. **Import the data to MongoDB server**

  To execute in the project:
  ```sh
  $ mongoimport.exe -d koop -c cameras --type csv --file cameras.csv --headerline
  ```
  - `d`: Specifies the name of the database on which to run the mongoimport
  - `c`: Specifies the collection to import
  - `type`: Specifies the file type to import. The default format is JSON, but in this case, we're going to to import csv files.
  - `field`: field name.
  - `heardline`:uses the first line as field names

  The project is in the local computer, that is, it is in "localhost".
  The port that is listening is the default port of the MongoDB installation.

  We can use [**Robo 3T**](https://robomongo.org/download) too.
  Previously known as RoboMongo, Robo 3T is a tool that we allow us to visually manage our MongoDB databases.

  This is a visual manager of non-relational databases with MongoDB, in which we will be able to manipulate all our collections and documents.

4. **Create Koop Provider**
 1. Open `config/default.json` with any configurable parameters:

    - `databasename`: Database name,
    - `collectionname`: Collection name,
    - `url`: MongoDB connection string,

 1. Open `model.js` and configure :id parameter into getData:

    ```js
    const road = req.params.id;

    var queryObj= {
      'carretera': road.toUpperCase(),
    }
    ```

 1. Open `mongo.js` and specifies the fields to return

    ```js
    ...

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
    ...

    ```
 1. Configure JSON (coordinates and PopUp):

    ```js
     function fromArrayToGeoJSON()
     ...

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
   ...
   ```
 1. Create the field that will start a Koop instance and register the mondodb-provider.
 Koop exposes an Express server at koop.server which can be instructed to  listen on port 80

    ```js

    const koop = require('config');
    const koop = require('koop')(config);

    const FeatureServer = require('koop-output-geoservices')
    const Provider = require('koop-provider-mongodb')

    koop.register(Provider);
    koop.register(FeatureServer);

    koop.server.listen(80);
    ```

1. Enjoy!
