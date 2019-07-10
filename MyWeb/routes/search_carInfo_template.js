var express = require('express');
var router = express.Router();

/* GET search_carInfo_template */
router.get('/', function(req, res, next) {  
  res.render('search_carInfo_template.html');//응답  
});

module.exports = router;
