var express = require('express');
var router = express.Router();

var database = require('../classes/database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  database.insert();
  res.render('add', { title: 'Project Management Dashboard' });
});

module.exports = router;
