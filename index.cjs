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
        { prodNo: 'latte_hot', prodName: '라테', prodPrice: 2000, img: 'latte_hot.jpg' },
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
            img:'affogato.jpg',
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
