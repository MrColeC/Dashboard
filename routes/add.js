var express = require('express');
var router = express.Router();

/* GET add page. */
router.get('/', function(req, res, next) {
  res.render('add', { title: 'Project Management Dashboard' });
});

module.exports = router;
