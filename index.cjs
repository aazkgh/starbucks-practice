const express = require('express');
const app = express();
const port = 3000;

//CORS문제 해결
const cors = require('cors');
app.use(cors());
/*요청ContentType이 x-www-form-urlencoded인 경우
요청의 body사용하고 싶다면 아래 함수를 사용하세요*/
app.use(express.urlencoded({ extended: true }));
/*요청ContentType이 application/json인 경우
요청의 body사용하고 싶다면 아래 함수를 사용하세요*/
app.use(express.json());
//get요청이 되었을때 할 일
app.get('/', (req, res) => {
  res.send('WELCOME');
});

const users = new Map(); // 임시 회원 저장소

//test data 생성
users.set('admin', { password: '1234', name: '관리자' });

// request.body에 회원가입 정보를 json 형태로 왔다 가정 -> postman으로 테스트
app.post('/singup', (req, res) => {
  const { id, password, name } = req.body;

  if (users.has(id)) {
    return res.status(400).send('이미 존재하는 회원입니다.');
  }

  users.set(id, { password, name });

  console.log('회원가입 성공!!', { id, name });
  res.status(200).json({
    message: '회원가입 성공',
    data: { id, name },
  });
});

app.post('/check', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send('아이디를 입력해주세요.');
  }
  if (users.has(id)) {
    return res.status(400).send('이미 존재하는 아이디입니다.');
  }
  return res.status(200).send('사용 가능한 아이디입니다.');
});

app.post('/login', (req, res) => {
  const { id, password } = req.body;
  if (!users.has(id)) {
    return res.status(401).send('아이디를 확인해주세요.');
  }
  if (users.get(id).password != password) {
    return res.status(401).send('아이디 또는 비밀번호를 확인해주세요.');
  }

  console.log(`로그인 성공 아이디 : ${id}`);
  return res.status(201).json({
    message: '로그인 성공',
    data: { id },
  });
});

//Listen for connections.
app.listen(port, () => {
  console.log('3000번 포트에서 backend server 실행중...');
});
