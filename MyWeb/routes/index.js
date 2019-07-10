var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //biz db...
  console.log("세션ID = ", req.sessionID);
  let name;
  if(req.session.user_id){
    name = req.session.name;
  }
  res.render('index', {
    name 
    }); //응답
  
});

module.exports = router;
