var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/* post member_insert */
router.post('/', function (req, res, next) {
  const result = {
    msg: '회원 가입 오류'
  };

  const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejs'
  });

  con.connect((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("DB연결됨", `${req.body.name} : ${req.body.user_id} : ${req.body.comments}`);
    const sql = `insert into member(name,id,comments) values('${req.body.name}', '${req.body.user_id}', '${req.body.comments}')`;
    console.log(sql);
    con.query(sql, (err, results, fields) => {
      if (err) {
        console.error(err.message);
        res.json(JSON.stringify(result));
      } else {
        console.log(results, fields);
        result.msg = `${req.body.name}님 가입되셨습니다`;
        res.json(JSON.stringify(result));
      }
      con.end((err) => {
        if (err) {
          return console.error(err.message);
        }
      });
    });
  });
});
module.exports = router;
