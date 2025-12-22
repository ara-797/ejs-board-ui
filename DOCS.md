## EJS 기본 문법
### EJS
- HTML 내부에서 JavaScript를 섞어서 쓰는 템플릿 엔진
- EJS는 서버 사이드 렌더링(SSR)을 위한 템플릿 엔진
- 서버에서 HTML을 만들기 위한 도구 (Node, Express)

### SSR과 CSR
- SSR : JavaScript가 서버에서 실행되어 HTML을 만든 뒤 브라우저에게 전달
- CSR : JavaScript가 브라우저에서 실행되어 화면을 만든다.

### 1. 데이터 출력 (HTML 이스케이프 처리)
- 변수값을 HTML로 출력
> <%= 변수 %>
```ejs
<!-- 사용 예시 -->
<p><%= study.subject %></p>
```

### 2. HTML 이스케이프 없이 출력
- HTML 태그를 포함한 데이터를 출력할 때 유용
- 서버에서 HTML 문자열을 전달할 때
> <%- htmlContent %>
```ejs
<!-- 사용 예시 -->
const htmlContent = '<p>이것은 HTML 콘텐츠입니다.</p>';
<div><%- htmlContent %></div>
```

### 3. JavaScript 코드 실행
- HTML에 JavaScript 코드를 삽입하여 로직 처리
- 반복문, 조건문 사용
> <% 코드 %>

#### 조건문
```ejs
<!-- 사용 예시 -->
<% if(filteredList.length > 0) { %>
    <ul class="todo-list"><li></li></ul>
<% } else { %>
    <p class="no-data">등록된 항목이 없습니다.</p>
<% } %>
```

#### 반복문
```ejs
<!-- 사용 예시 -->
<% studyList.forEach(study => { %>
    반복 내용
<% }) %>
```

### 4. 주석
> <%# 주석 내용 %>

### 5. 공백 처리
- 줄바꿈, 들여쓰기 정리

#### 공백 제거
- 반복문, 조건문에서 표준처럼 사용
> <%_ 코드 _%> : 코드 앞/뒤 공백 제거 (trim)

> <%_ 코드 %> : 코드 앞의 공백 제거

> <% 코드 _%> : 코드 뒤의 공백 제거

#### 줄바꿈 제거
- 태그 뒤의 개행 1줄 제거
- 블록 끝에 빈 줄 생길 때 사용
> -%>

### 6. 리터럴 태그
> <%% 코드 %%>

### 7. include
> <%- include('파일 경로') %>
```ejs
<!-- 사용 예시 -->
<%- include('components/header') %>
```


