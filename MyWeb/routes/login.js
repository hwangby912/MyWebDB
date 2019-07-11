var express = require('../node_modules/express');
var router = express.Router();
const mysql = require('../node_modules/mysql'); //1 드라이버 등록

/* post login 처리 */
router.post('/', function (req, res, next) {
  const result = {
    msg: ''
  };

  const con = mysql.createConnection({ //2 연결
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejs'
  });

  con.connect((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("DB연결됨:", req.body.login_user_id);
    const sql =
      `select * from member where id=?`;
    console.log(sql); // 3 구문 생성
    con.query(sql, [req.body.login_user_id], (err, rs, fields) => { //4 SQL 전송
      if (err) {
        console.error(err.message);
        result.msg = '다시 로그인해주세요';
        res.json(JSON.stringify(result));
      } else {
        if (rs[0] && rs[0].name) { //로그인 ok
          console.log('rs[0].name : ', rs[0].name);
          req.session.user_id = req.body.login_user_id;
          req.session.name = rs[0].name;
          res.redirect('/');
        } else { // 로그인 fail
          result.msg = '다시 로그인해주세요';
          res.json(JSON.stringify(result));
        }
      } //end else
      con.end((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("con close");
      }); //end end
    }); //end query
  }); //end connect
});

module.exports = router;
