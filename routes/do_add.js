var express = require('express');
var router = express.Router();

var database = require('../classes/database.js');

/* GET page. */
router.post('/', function(req, res, next) {
  // database.test();
  var object = [{
    "area": "Weekly Update",
    "name": "Enable Data Out loaders to be ran earlier in the pipeline",
    "leader": "Cole",
    "members": "Vladimir, Li, Chris",
    "date": "2016-Q2",
    "deliverables": "Core Operations",
    "software": "Modularize loaders define inputs/outputs create workflows",
    "effort": "Small effort commitment"
    }];

  database.load(object);
  res.render('do_add', { title: 'Project Management Dashboard' });
});

module.exports = router;
