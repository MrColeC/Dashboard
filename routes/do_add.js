var express = require('express');
var router = express.Router();

var database = require('../classes/database.js');

/* Handle add post. */
router.post('/', function(req, res) {
  var body = req.body;
  console.log(body);
  // res.send(body);


  // Console.log the request
  // console.log("Receieved: " + req.body);
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

router.get('/', function(req, res) {
      res.send("POST me");
});

module.exports = router;
