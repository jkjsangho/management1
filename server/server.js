const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const api = require('./routes/index');
/* var cookieParser = require('cookie-parser'); */

const sqlite3 = require('sqlite3').verbose();

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json()); //json 파싱
app.use(bodyParser.urlencoded({ extended: true })); //req.body를 만들어줌
/* app.use(cookieParser()); //req.cookies.쿠키명 */

//static 파일들 여기서 찾아
/* app.use(express.static(path.join(__dirname, './../client/public'))); */
/* app.use('/', express.static(path.join(__dirname, './../public'))); */


// open database in memory
let db = new sqlite3.Database('./db/EE7DB.sqlite', (err) => {
    if (err) {
        console.log("==============");
        console.error(err.message);
    }
    console.log('Connected to the EE7 database.');
})

// close the database connection
/* db.close((err) => {
    if (err) {
        console.log("=-=-=-=-=-=-=-=");
        return console.error(err.message);
    }
    console.log('Close the database connection.');
}); */

//SQLite 접속 및 REST API 출력
app.get('/GetUserInfo',(req, res, next)=>{

    /* res.send(['SQLite 접속완료']); */

    var parms = [];
    const query = `SELECT * FROM EE7_USERINFO`;

    db.serialize(); //DB 사용선언?
    db.all(query, parms,(err,row)=>{
        if(err){
            console.log(err);
            console.log("err err err err err");
/*             callback(err) */
        }
        else {
            res.json({
                "message":"success",
                "data":row
            })
            /* console.log(row); */
/*             row.forEach((row)=>{
                console.log(row);
            }) */
            console.log("OK OK OK OK OK");
/*             callback(data) */
        }
    });
})

/* app.get('/bbb', function(err, req, res, next){
    console.error(err.stack)
    res.status(500).send('Something broke!')
    res.send({greeting:'Hello React x Node.js'});
  })
 */
//index의 /api/hello 호출
app.get('/api/hello', api);

//abc로 접근하면 /api/customers로 리다이렉트
app.get('/abc', function (req, res, next) {
    res.redirect('/api/customers');
});

app.get('/post', (req, res) => {
    console.log('a user connected');
    res.send({greeting:'This is Post Server'});

});

app.post('/post', (req, res) => {
    console.log('==============')
    console.log(req.body)
    console.log('==============')
    res.send({greeting:'Post Data Success'});
    res.status(404).end();
});

setTimeout(() => {
    app.get('/api/customers', (req, res) => {
        res.send([
            {
                'id': 1,
                'image': 'https://placeimg.com/64/64/1',
                'name': '홍길동',
                'birthday': '1996-12-22',
                'time': '1996-12-22 10:11:22',
                'gender': '남자',
                'job': '대학생'
            },
            {
                'id': 2,
                'image': 'https://placeimg.com/64/64/2',
                'name': '나동빈',
                'birthday': '2002-05-08',
                'time': '2002-05-08 10:11:22',
                'gender': '남자',
                'job': '프로그래머'
            },
            {
                'id': 3,
                'image': 'https://placeimg.com/64/64/3',
                'name': '이순신',
                'birthday': '1996-11-27',
                'time': '1996-11-27 10:11:22',
                'gender': '남자',
                'job': '디자이너'
            },
            {
                'id': 4,
                'image': null,
                'name': '김김김',
                'job': '프로그래머'
            },
            {
                'id': 5,
                'image': 'https://placeimg.com/64/64/4',
                'name': '이순',
                'birthday': '1996-10-27',
                'time': '1996-10-27 10:11:22',
                'gender': '남자',
                'job': '디자이너'
            },
            {
                'id': 6,
                'image': 'https://placeimg.com/64/64/5',
                'name': '이신',
                'birthday': '1994-11-29',
                'time': '1992-11-29 10:11:21',
                'gender': '남자',
                'job': '디자이너'
            },
            {
                'id': 7,
                'image': 'https://placeimg.com/64/64/6',
                'name': '순신',
                'birthday': '1992-11-29',
                'time': '1992-11-29 10:11:22',
                'gender': '남자',
                'job': '디자이너'
            },
            {
                'id': 8,
                'image': 'https://placeimg.com/64/64/7',
                'name': '이신순',
                'birthday': '1992-11-29',
                'time': '1992-11-29 10:11:23',
                'gender': '남자',
                'job': '디자이너'
            }
        ]);
    });
}, 20);

/* app.use(function(req, res, next) {
    next(createError(404, req.url + ' Not Found'));
  });
  
  //custom error handler
  app.use(function(err, req, res, next){
    if(err.type == 'json'){
      res.json({errors: err});
    }else{
      next(err);
    }
  })
  
  // error handler
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }); */
  


app.listen(port, () => console.log(`Listening on port ${port}`));