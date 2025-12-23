const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// EJS 사용 설정
app.set('view engine', 'ejs');

// layout 사용 설정
app.use(expressLayouts);
app.set('layout', 'layout'); // views > layout.ejs : 기본 레이아웃 파일 지정

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

/*
  - 상태 배지 UI
  - 완료 여부 스타일 분기
  - 우선순위 강조
  - 담당자 / 날짜 표시
*/
const todoList = [
  {
    id: 1,
    text: '메인 페이지 시안 검토',
    done: true,
    status: 'completed',        // pending | in-progress | completed | hold
    priority: 'high',           // low | medium | high
    assignee: '홍길동',
    createdAt: '2025-01-02',
    dueDate: '2025-01-05'
  },
  {
    id: 2,
    text: 'TODO 리스트 마크업',
    done: false,
    status: 'in-progress',
    priority: 'medium',
    assignee: '김퍼블',
    createdAt: '2025-01-03',
    dueDate: '2025-01-10'
  },
  {
    id: 3,
    text: '접근성 aria 속성 점검',
    done: false,
    status: 'pending',
    priority: 'high',
    assignee: '이접근',
    createdAt: '2025-01-04',
    dueDate: '2025-01-08'
  },
  {
    id: 4,
    text: '헤더 레이아웃 수정',
    done: true,
    status: 'completed',
    priority: 'low',
    assignee: '홍길동',
    createdAt: '2025-01-01',
    dueDate: '2025-01-03'
  },
  {
    id: 5,
    text: '관리자 페이지 테이블 스타일',
    done: false,
    status: 'hold',
    priority: 'medium',
    assignee: '김퍼블',
    createdAt: '2025-01-06',
    dueDate: null
  },
  {
    id: 6,
    text: 'Swiper 슬라이드 접근성 개선',
    done: true,
    status: 'completed',
    priority: 'high',
    assignee: '이접근',
    createdAt: '2025-01-02',
    dueDate: '2025-01-04'
  },
  {
    id: 7,
    text: '404 / 500 페이지 마크업',
    done: false,
    status: 'in-progress',
    priority: 'low',
    assignee: '홍길동',
    createdAt: '2025-01-07',
    dueDate: '2025-01-12'
  },
  {
    id: 8,
    text: 'SCSS 구조 정리',
    done: false,
    status: 'pending',
    priority: 'medium',
    assignee: '김퍼블',
    createdAt: '2025-01-08',
    dueDate: '2025-01-15'
  },
  {
    id: 9,
    text: '레이아웃 공통 컴포넌트 분리',
    done: true,
    status: 'completed',
    priority: 'medium',
    assignee: '홍길동',
    createdAt: '2025-01-03',
    dueDate: '2025-01-06'
  },
  {
    id: 10,
    text: '관리자 UI 패턴 정리 문서',
    done: false,
    status: 'in-progress',
    priority: 'high',
    assignee: '이접근',
    createdAt: '2025-01-09',
    dueDate: '2025-01-14'
  }
];

// HOME
app.get('/', (req, res) => {
  
  // 500에러 강제
  // const data = undefined;
  // console.log(data.title);

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

// TODO Detail
app.get('/todo/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todoList.find(item => item.id === id);

  if(!todo) {
    return res.status(404).render('empty', {
      errorNum: '404',
      pageTitle: '페이지를 찾을 수 없습니다',
      layout: 'error-layout'
    });
  }
  res.render('todo-detail', {
    todo,
    pageTitle: 'TODO 상세 페이지',
    activeMenu: 'todo'
  });
});

// 404
app.use((req, res) => {
  res.status(404).render('empty', {
    errorNum: '404',
    pageTitle: '페이지를 찾을 수 없습니다',
    layout: 'error-layout'
  });
});

// 500
app.use((err, req, res, next) => {
  console.log(err.stack);

  res.status(500).render('empty', {
    errorNum: '500',
    pageTitle: '서버 오류가 발생했습니다',
    layout: 'error-layout'
  });
});

app.listen(3000, () => {
  console.log('http://localhost:3000 서버 실행 중');
});

