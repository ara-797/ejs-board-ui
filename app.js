const express = require('express');
const app = express();

// EJS 사용 설정
app.set('view engine', 'ejs');

// 정적 파일(CSS) 설정
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.render('index', {
    todos: ['첫 번째 할 일', '두 번째 할 일']
  });
});

app.listen(3000, () => {
  console.log('http://localhost:3000 서버 실행 중');
});
