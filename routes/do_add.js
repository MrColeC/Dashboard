var express = require('express');
var router = express.Router();

var database = require('../classes/database.js');

/* Handle add post. */
router.post('/', function(req, res, next) {
  // Create project JSON object
  var project = {};
  project.area = req.body.area;
  project.name = req.body.name;
  project.leader = req.body.leader;
  project.date = req.body.date;
  project.members = req.body.members;
  project.deliverables = req.body.deliverables;
  project.software = req.body.software;
  project.effort = req.body.effort;

  // Perform the database load (add) operaton on the created object
  var toLoad = [];
  toLoad.push(project);
  database.load(toLoad);

  // Render page notifying success
  res.render('do_add', { title: 'Project Management Dashboard' });
});

module.exports = router;
