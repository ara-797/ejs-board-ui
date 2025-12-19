const express = require('express');
const app = express();

// EJS 사용 설정
app.set('view engine', 'ejs');

// 정적 파일(CSS) 설정
app.use('/assets', express.static('assets'));

const todoList = [
  { id: 1, text: '해야할 일 01', done: true },
  { id: 2, text: '해야할 일 02', done: false },
  { id: 3, text: '해야할 일 03', done: false },
  { id: 4, text: '해야할 일 04', done: false },
  { id: 5, text: '해야할 일 05', done: true }
];

// HOME
app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'HOME 화면' });
});

// TODO
app.get('/todo', (req, res) => {
  res.render('todo', { todoList, pageTitle: 'TODO 리스트' });
});

app.listen(3000, () => {
  console.log('http://localhost:3000 서버 실행 중');
});
