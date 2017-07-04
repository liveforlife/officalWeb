var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
	});

router.get('/about', function(req, res, next) {
	  res.render('about', { title: 'Express' });
	});

router.get('/product', function(req, res, next) {
	  res.render('product', { title: 'Express' });
	});

router.get('/application', function(req, res, next) {
	  res.render('application', { title: 'Express' });
	});

router.get('/news', function(req, res, next) {
	  res.render('news', { title: 'Express' });
	});

module.exports = router;
