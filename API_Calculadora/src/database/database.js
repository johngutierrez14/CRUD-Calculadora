const mysql = require('mysql');
const debug = require('debug')('app:database');

const { Config } = require('../config/config');

const connection = mysql.createConnection({
  host: Config.host,
  user: Config.user,
  password: Config.password,
  database: Config.database
});

connection.connect((err) => {
  if (err) throw err;
  debug("Connected");
});

module.exports.Connection = {
  connection
}