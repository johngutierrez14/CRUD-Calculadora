const express = require('express');

const { multiplicationController } = require('../../controllers/multiply.controller')

const router = express.Router();

module.exports.multiplicationAPI = (app) => {
  router
  .get('/', multiplicationController.getMultiplications)
  .post('/', multiplicationController.createMultiplication)
  .delete('/:id', multiplicationController.deleteMultiplication)
  .put('/:id', multiplicationController.updateMultiplication)

  app.use('/api/v1/multiplication', router);
}