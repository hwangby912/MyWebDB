var express = require('express');
var router = express.Router();

/* post login 처리 */
router.post('/', function (req, res, next) {
  //biz
  const result = {
    msg: ''
  };
  console.log("세션ID = ", req.sessionID);
  console.log(myDB);
  if (myDB[req.body.login_user_id]) {
    req.session.regenerate((err) => {
      req.session;
      console.log("세션ID = ", req.sessionID);
      req.session.user_id = req.body.login_user_id;
      req.session.name = myDB[req.body.login_user_id].name;
      res.redirect('/');
    });
  } else {
    result.msg = '다시 로그인해주세요';
    res.json(JSON.stringify(result));
  }

});

module.exports = router;
