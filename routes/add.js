var express = require('express');
var router = express.Router();

/* GET page. */
router.get('/', function(req, res, next) {
  res.render('add', { title: 'Project Management Dashboard' });
});

module.exports = router;
