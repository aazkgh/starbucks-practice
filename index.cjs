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

//---상품 정보 선언 start---
const products = [
  {
    id: 'americano_hot',
    category: '에스프레소',
    name_ko: '카페 아메리카노',
    name_en: 'Caffe Americano',
    price: '4700',
    intro:
      '진한 에스프레소와 뜨거운 물을 섞어 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽게 잘 느낄 수 있는 커피',
    kcal: 10,
    fat: 0,
    protein: 1,
    natrium: 5,
    sugar: 0,
    caffeine: 150,
    caution: '없음',
    image: './images/americano_hot.jpg',
  },
  {
    id: 'americano_ice',
    category: '에스프레소',
    name_ko: '아이스 카페 아메리카노',
    name_en: 'Iced Caffe Americano',
    price: '4700',
    intro:
      '진한 에스프레소에 시원한 정수물과 얼음을 더하여 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽고 시원하게 즐길 수 있는 커피',
    kcal: 10,
    fat: 0,
    protein: 1,
    natrium: 5,
    sugar: 0,
    caffeine: 150,
    caution: '없음',
    image: './images/americano_ice.jpg',
  },
  {
    id: 'latte_hot',
    category: '에스프레소',
    name_ko: '카페 라떼',
    name_en: 'Caffe Latte',
    prhot: '5200',
    intro:
      '풍부하고 진한 에스프레소가 신선한 스팀 밀크를 만나 부드러워진 커피 위에 우유 거품을 살짝 얹은 대표적인 커피 라떼',
    kcal: 180,
    fat: 5,
    protein: 10,
    natrium: 115,
    sugar: 13,
    caffeine: 75,
    caution: '우유',
    image: './images/latte_hot.jpg',
  },
  {
    id: 'latte_ice',
    category: '에스프레소',
    name_ko: '아이스 카페 라떼',
    name_en: 'Iced Caffe Latte',
    price: '5200',
    intro:
      '풍부하고 진한 농도의 에스프레소가 시원한 우유와 얼음을 만나 고소함과 시원함을 즐길 수 있는 대표적인 커피 라떼',
    kcal: 110,
    fat: 3.5,
    protein: 6,
    natrium: 75,
    sugar: 8,
    caffeine: 75,
    caution: '우유',
    image: './images/latte_ice.jpg',
  },
  {
    id: 'flat_white',
    category: '콜드 브루',
    name_ko: '콜드 브루 몰트',
    name_en: 'Cold Brew Malt',
    price: '8500',
    intro:
      '[리저브 전용음료] 리저브 콜드 브루, 바닐라 아이스크림, 몰트가 블렌딩된 리저브만의 쉐이크',
    kcal: 505,
    fat: 20,
    protein: 7,
    natrium: 150,
    sugar: 41,
    caffeine: 190,
    caution: '대두/우유',
    image: './images/flat_white.jpg',
  },
  {
    id: 'milk_shake',
    category: '브레베',
    name_ko: '라벤더 카페 브레베',
    name_en: 'Lavender Cafe Breve',
    price: '7000',
    intro:
      '진한 리저브 에스프레소 샷과 은은한 라벤더향이 고급스럽게 어우러진 부드럽고 세련된 풍미의 라벤더 카페 브레베',
    kcal: 400,
    fat: 22,
    protein: 8,
    natrium: 140,
    sugar: 30,
    caffeine: 105,
    caution: '우유',
    image: './images/milk_shake.jpg',
  },
  {
    id: 'milk_tea',
    category: '라떼',
    name_ko: '바닐라빈 라떼',
    name_en: 'Vanilla Bean Latte',
    price: '7000',
    intro: '리저브만을 위한 바닐라 빈 시럽이 부드럽게 어우러진 카페 라떼',
    kcal: 245,
    fat: 6,
    protein: 9,
    natrium: 150,
    sugar: 27,
    caffeine: 210,
    caution: '우유',
    image: './images/milk_tea.jpg',
  },
];

//---상품 정보 선언 end---

// 특정 상품 정보를 반환하는 엔드포인트 추가
app.get('/product/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.json({ message: '해당 상품을 찾을 수 없습니다.' });
  }
  res.json(product);
});
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
//---

//---장바구니 데이터 Start---

// let cartData = {}; // 장바구니 데이터 저장

// 장바구니 데이터 저장 (POST 요청)
app.post('/cart', (req, res) => {
  cartData = req.body; // 받은 데이터를 저장
  res.json({ message: '장바구니에 추가됨', data: cart });
});

// 장바구니 데이터 가져오기 (GET 요청)
// app.get('/cart', (req, res) => {

//     res.json(cartData);
// });

//---장바구니 데이터 End---

app.post('/orders', (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder);
  cart = [];
  res.json({ message: '주문이 저장되었습니다!', order: newOrder });
});

//Listen for connections.
app.listen(port, () => {
  console.log('3000번 포트에서 backend server 실행중...');
});
