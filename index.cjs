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

app.get('/product', (req, res) => {
  const products = [
    {
      prodNo: 'americano_hot',
      prodName: '아메리카노',
      prodPrice: 1500,
      img: 'americano_hot.jpg',
    },
    {
      prodNo: 'americano_ice',
      prodName: '아이스아메리카노',
      prodPrice: 1500,
      img: 'americano_ice.jpg',
    },
    {
      prodNo: 'latte_hot',
      prodName: '라테',
      prodPrice: 2000,
      img: 'latte_hot.jpg',
    },
    {
      prodNo: 'latte_ice',
      prodName: '아이스라테',
      prodPrice: 2000,
      img: 'latte_ice.jpg',
    },
    {
      prodNo: 'flat_white',
      prodName: '콜드브루몰트',
      prodPrice: 2500,
      img: 'flat_white.jpg',
    },
    {
      prodNo: 'milk_shake',
      prodName: '카페브레베',
      prodPrice: 3500,
      img: 'milk_shake.jpg',
    },
    {
      prodNo: 'milk_tea',
      prodName: '바닐라라떼',
      prodPrice: 3500,
      img: 'milk_tea.jpg',
    },
    {
      prodNo: 'affogato',
      prodName: '아포가토',
      prodPrice: 4500,
      img: 'affogato.jpg',
    },
    {
      prodNo: 'milk',
      prodName: '우유',
      prodPrice: 2000,
      img: 'milk.jpg',
    },
    {
      prodNo: 'strawberry_blended',
      prodName: '딸기 블렌디드',
      prodPrice: 3500,
      img: 'strawberry_blended.jpg',
    },
    {
      prodNo: 'choco_ice',
      prodName: '아이스초코',
      prodPrice: 3000,
      img: 'choco_ice.jpg',
    },
    {
      prodNo: 'matcha_ice',
      prodName: '아이스말차',
      prodPrice: 3000,
      img: 'matcha_ice.jpg',
    },
  ];
  res.json(products);
});

app.get('/product/:prodNo', (req, res) => {
  res.send(`${req.params.prodNo}상품의 상세내용입니다`);
  let product;
  if (req.params.prodNo == 'americano_hot') {
    product = { prodName: '아메리카노', img: 'americano_hot.jpg' };
  } else if (req.params.prodNo == 'americano_ice') {
    product = { prodName: '아이스아메리카노', img: 'americano_ice.jpg' };
  } else if (req.params.prodNo == 'latte_hot') {
    product = { prodName: '라테', img: 'latte_hot.jpg' };
  } else if (req.params.prodNo == 'latte_ice') {
    product = { prodName: '아이스라테', img: 'latte_ice.jpg' };
  } else if (req.params.prodNo == 'flat_white') {
    product = { prodName: '콜드브루몰트', img: 'flat_white.jpg' };
  } else if (req.params.prodNo == 'milk_shake') {
    product = { prodName: '카페브레베', img: 'milk_shake.jpg' };
  } else if (req.params.prodNo == 'milk_tea') {
    product = { prodName: '바닐라라떼', img: 'milk_tea.jpg' };
  } else if (req.params.prodNo == 'milk_tea') {
    product = { prodName: '아포가토', img: 'affogato.jpg' };
  } else if (req.params.prodNo == '우유') {
    product = { prodName: '우유', img: 'milk.jpg' };
  } else if (req.params.prodNo == 'milk_tea') {
    product = { prodName: '아이스초코', img: 'choco_ice.jpg' };
  } else if (req.params.prodNo == 'milk_tea') {
    product = { prodName: '아이스말차', img: 'matcha_ice.jpg' };
  } else {
    product = {};
  }
  res.json(product);
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

let cart = [];

app.get('/cart', (req, res) => {
  res.json(cart);
});

let orders = [];

app.get('/orders', (req, res) => {
  res.json(orders);
});

//Listen for connections.
app.listen(port, () => {
  console.log('3000번 포트에서 backend server 실행중...');
});
