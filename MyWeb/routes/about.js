var express = require('../node_modules/express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: '전은수' });
});

module.exports = router;
