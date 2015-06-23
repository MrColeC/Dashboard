var express = require('express');
var router = express.Router();

var database = require('../classes/database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // database.test();
  var object = [{"area": "Weekly Update", "leader":"Cole"}];
  //
  // ","
  // Enable Data Out loaders to be ran earlier in the pipeline
  // ","
  //
  // ","
  // Vladimir Li Chris
  // ","
  // 2016-Q2
  // ","
  // Core Operations
  // ","
  // Modularize loaders define inputs/outputs create workflows
  // ","
  // Small effort commitment
  // "];

  database.load(object);
  res.render('add', { title: 'Project Management Dashboard' });
});

module.exports = router;
