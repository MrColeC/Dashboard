var express = require('express');
var router = express.Router();

var database = require('../classes/database.js');

/* Handle add post. */
router.post('/add', function(req, res) {
  // Extract & log
  var body = req.body;
  console.log("Recieved add request: " + JSON.stringify(body));

  // Perform the database load (add) operaton on the created object
  var toLoad = [];
  toLoad.push(body);
  database.load(toLoad);

  // Render page notifying success
  res.send(req.body);
});

router.get('/add', function(req, res) {
      res.send("POST to me");
});

router.get('/get', function(req, res) {
  console.log(database.get());
  res.send("Cat");
});

module.exports = router;
