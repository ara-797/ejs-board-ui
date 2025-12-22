const express = require('express');
const app = express();

// EJS 사용 설정
app.set('view engine', 'ejs');

// 정적 파일(CSS) 설정
app.use('/assets', express.static('assets'));

const studyList = [
  { id: 1, subject: '반복문', syntax: "<% todos.forEach() %>", htmlContent: '<p>HTML 콘텐츠 01</p>' },
  { id: 2, subject: '조건문', syntax: "<% if() %> <% else %>", htmlContent: '<p>HTML 콘텐츠 02</p>' },
  { id: 3, subject: 'include 문법', syntax: "<%- include('파일경로') %>", htmlContent: '<p>HTML 콘텐츠 03</p>' },
  { id: 4, subject: '변수 출력', syntax: "<%= %>", htmlContent: '<p>HTML 콘텐츠 04</p>' },
  { id: 5, subject: 'HTML escape 없이 출력', syntax: "<%- %>", htmlContent: '<p>HTML 콘텐츠 05</p>' },
  { id: 6, subject: 'partials 나누기 (components) : header + item(옵션)', syntax: '', htmlContent: '<p>HTML 콘텐츠 06</p>' },
  { id: 7, subject: 'EJS 내부에서 JavaScript 활용하기', syntax: '', htmlContent: '<p>HTML 콘텐츠 07</p>' }
];

const todoList = [
  { id: 1, text: '해야할 일 01', done: true },
  { id: 2, text: '해야할 일 02', done: false },
  { id: 3, text: '해야할 일 03', done: false },
  { id: 4, text: '해야할 일 04', done: false },
  { id: 5, text: '해야할 일 05', done: true }
];

// HOME
app.get('/', (req, res) => {
  res.render('index', { 
    studyList, 
    pageTitle: 'HOME 화면',
    activeMenu: 'home'
  });
});

// TODO
app.get('/todo', (req, res) => {
  const filter = req.query.filter; // 쿼리스트링
  let filteredList = todoList;

  if(filter === 'done') {
    filteredList = todoList.filter(todo => todo.done);
  }

  res.render('todo', { 
    filteredList, 
    pageTitle: 'TODO 리스트',
    activeMenu: 'todo',
    activeFilter: filter || 'all'
  });
});

app.listen(3000, () => {
  console.log('http://localhost:3000 서버 실행 중');
});
