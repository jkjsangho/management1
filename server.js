const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {  
    res.redirect('/today');
  });

app.get('/api/customers', (req, res) => {
    res.send([
    {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '홍길동',
        'birthday': '961222',
        'gender': '남자',
        'job': '대학생'
    },
    {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '나동빈',
        'birthday': '960508',
        'gender': '남자',
        'job': '프로그래머'
    },
    {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '이순신',
        'birthday': '961127',
        'gender': '남자',
        'job': '디자이너'
    },
    {
        'id':4,
        'image':null,
        'name': '김김김',
        'job': '디자'
    },
    {
        'id': 5,
        'image': 'https://placeimg.com/64/64/4',
        'name': '이순',
        'birthday': '961127',
        'gender': '남자',
        'job': '디자이너'
    },
    {
        'id': 5,
        'image': 'https://placeimg.com/64/64/5',
        'name': '이신',
        'birthday': '961127',
        'gender': '남자',
        'job': '디자이너'
    },
    {
        'id': 7,
        'image': 'https://placeimg.com/64/64/6',
        'name': '순신',
        'birthday': '961127',
        'gender': '남자',
        'job': '디자이너'
    },
    {
        'id': 8,
        'image': 'https://placeimg.com/64/64/7',
        'name': '이신순',
        'birthday': '961127',
        'gender': '남자',
        'job': '디자이너'
    }
    ]);
});

app.get('/api/customers2', (req, res) => {
    res.send([
    {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '동길홍',
        'birthday': '961222',
        'gender': '남자',
        'job': '대학생'
    },
    {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '빈동나',
        'birthday': '960508',
        'gender': '남자',
        'job': '프로그래머'
    },
    {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '신순이',
        'birthday': '961127',
        'gender': '남자',
        'job': '디자이너'
    },
    {
        'id':4,
        'image':null,
        'name': '김김김',
        'job': '디자'
    },
    {
        'id': 5,
        'image': 'https://placeimg.com/64/64/4',
        'name': '순이',
        'birthday': '961127',
        'gender': '남자',
        'job': '디자이너'
    }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));