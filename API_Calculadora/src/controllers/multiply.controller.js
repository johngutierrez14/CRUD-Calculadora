const debug = require('debug')('app:multiply-controller');

const { Connection } = require('../database/database');
const { Response } = require('../common/response');
const createHttpError = require('http-errors');

module.exports.multiplicationController = {
  getMultiplications: async (req, res) => {
    try {
      await Connection.connection.query('SELECT * FROM multiplication', (error, result) => {
        //res.json(result);
        Response.success(res, 200, 'multiplication facts list', result)
      });
    } catch (error) {
      debug(error)
      //res.status(500).json({ message: "Internal server error" });
      Response.error(res)
    }
  },
  createMultiplication: async (req, res) => {
    try {
      const { body } = req;
      let valor1 = req.body.value_1;
      let valor2 = req.body.value_2;
      let resultMultiplication = BigInt(valor1) * BigInt(valor2);

      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.badRequest());
      } else {
        await Connection.connection.query('INSERT INTO multiplication SET value_1= ? , value_2= ?, result= ?', [valor1, valor2, resultMultiplication], (err, result) => {
          //res.send('multiplication added');
          Response.success(res, 201, 'added multiplication', result.insertId)
        });
      }
    } catch (error) {
      debug(error)
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteMultiplication: async (req, res) => {
    await Connection.connection.query('DELETE  FROM multiplication WHERE id = ?', [req.params.id], (err, result) => {
      try {
        res.send('multiplication deleted');
      } catch (error) {
        debug(error)
        res.status(500).json({ message: "Internal server error" });
      }
    });
  },
  updateMultiplication: async (req, res) => {
    try {
      let valor1 = req.body.value_1;
      let valor2 = req.body.value_2;
      let resultMultiplication = BigInt(valor1) * BigInt(valor2);
      await Connection.connection.query('UPDATE multiplication SET value_1= ? , value_2= ?, result= ? WHERE id = ?', [valor1, valor2, resultMultiplication, req.params.id], (err, rows) => {
        res.send('multiplication updated');
      });
    } catch (error) {
      debug(error)
      res.status(500).json({ message: "Internal server error" });
    }
  }

}
