const express = require('express');
const debug = require('debug')('app:main');

const { Config } = require('./src/config/config');
const { multiplicationAPI } = require('./src/v1/routes');
const { IndexAPI, NotFoundAPI} = require('./src/index')
const app = express();

//Midlewares
app.use(express.json());

//Routes
IndexAPI(app);
multiplicationAPI(app);
NotFoundAPI(app);


app.listen(Config.port, () => {
  debug(`Server on ${Config.port}`)
});