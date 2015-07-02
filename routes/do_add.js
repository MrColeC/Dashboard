var express = require('express');
var router = express.Router();

var database = require('../classes/database.js');

/* Handle add post. */
router.post('/do_add', function(req, res) {
  // Console.log the request
  console.log("Receieved: " + req.body);
  // console.log("JSON stringify: " + JSON.stringify(req));

  // Perform the database load (add) operaton on the created object
  // var toLoad = [];
  // toLoad.push(req);
  // database.load(toLoad);

  // Render page notifying success
  // res.render(req.body);
  // res.status = 200;
  // res.render();
  res.send(req.body);
});

module.exports = router;
