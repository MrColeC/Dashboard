var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project Management Dashboard' });
});

router.get('/favicon.ico', function(req, res, next) {
  res.redirect('/favicon/favicon.ico')
});

router.get('/browserconfig.xml', function(req, res, next) {
  res.redirect('/favicon/browserconfig.xml')
});

module.exports = router;
