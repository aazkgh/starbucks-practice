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
        id: "C0001", 
        category:"에스프레소",
        name_ko: "카페 아메리카노", 
        name_en: "Caffe Americano", 
        price: "4700", 
        intro: "진한 에스프레소와 뜨거운 물을 섞어 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽게 잘 느낄 수 있는 커피", 
        kcal: 10, 
        fat: 0, 
        protein: 1, 
        natrium: 5, 
        sugar: 0, 
        caffeine: 150, 
        caution: "없음", 
        image: "images/C0001.jpg"
    },
    { 
        id: "C0002", 
        category:"에스프레소",
        name_ko: "아이스 카페 아메리카노", 
        name_en: "Iced Caffe Americano", 
        price: "4700", 
        intro: "진한 에스프레소에 시원한 정수물과 얼음을 더하여 스타벅스의 깔끔하고 강렬한 에스프레소를 가장 부드럽고 시원하게 즐길 수 있는 커피", 
        kcal: 10, 
        fat: 0, 
        protein: 1, 
        natrium: 5, 
        sugar: 0, 
        caffeine: 150, 
        caution: "없음", 
        image: "images/C0002.jpg"
    },
    { 
        id: "C0003", 
        category:"에스프레소",
        name_ko: "카페 라떼", 
        name_en: "Caffe Latte", 
        price: "5200", 
        intro: "풍부하고 진한 에스프레소가 신선한 스팀 밀크를 만나 부드러워진 커피 위에 우유 거품을 살짝 얹은 대표적인 커피 라떼", 
        kcal: 180, 
        fat: 5, 
        protein: 10, 
        natrium: 115, 
        sugar: 13, 
        caffeine: 75, 
        caution: "우유", 
        image: "images/C0003.jpg"
    },
    { 
        id: "C0004", 
        category:"에스프레소",
        name_ko: "아이스 카페 라떼", 
        name_en: "Iced Caffe Latte", 
        price: "5200", 
        intro: "풍부하고 진한 농도의 에스프레소가 시원한 우유와 얼음을 만나 고소함과 시원함을 즐길 수 있는 대표적인 커피 라떼", 
        kcal: 110, 
        fat: 3.5, 
        protein: 6, 
        natrium: 75, 
        sugar: 8, 
        caffeine: 75, 
        caution: "우유", 
        image: "images/C0004.jpg"
    },
    { 
        id: "C0005", 
        category:"콜드 브루",
        name_ko: "콜드 브루 몰트", 
        name_en: "Cold Brew Malt", 
        price: "8500", 
        intro: "[리저브 전용음료] 리저브 콜드 브루, 바닐라 아이스크림, 몰트가 블렌딩된 리저브만의 쉐이크", 
        kcal: 505, 
        fat: 20, 
        protein: 7, 
        natrium: 150, 
        sugar: 41, 
        caffeine: 190, 
        caution: "대두/우유", 
        image: "images/C0005.jpg"
    },
    { 
        id: "C0006", 
        category:"브레베",
        name_ko: "라벤더 카페 브레베", 
        name_en: "Lavender Cafe Breve", 
        price: "7000", 
        intro: "진한 리저브 에스프레소 샷과 은은한 라벤더향이 고급스럽게 어우러진 부드럽고 세련된 풍미의 라벤더 카페 브레베", 
        kcal: 400, 
        fat: 22, 
        protein: 8, 
        natrium: 140, 
        sugar: 30, 
        caffeine: 105, 
        caution: "우유", 
        image: "images/C0006.jpg"
    },
    { 
        id: "C0007", 
        category:"라떼",
        name_ko: "바닐라빈 라떼", 
        name_en: "Vanilla Bean Latte", 
        price: "7000", 
        intro: "리저브만을 위한 바닐라 빈 시럽이 부드럽게 어우러진 카페 라떼", 
        kcal: 245, 
        fat: 6, 
        protein: 9, 
        natrium: 150, 
        sugar: 27, 
        caffeine: 210, 
        caution: "우유", 
        image: "images/C0007.jpg"
    }
    ];

//---상품 정보 선언 end---

      
// 특정 상품 정보를 반환하는 엔드포인트 추가
app.get('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.json({ message: '해당 상품을 찾을 수 없습니다.' });
    }
    res.json(product);
});
//---

//---장바구니 데이터 Start---

let cartData = {}; // 장바구니 데이터 저장

// 장바구니 데이터 저장 (POST 요청)
app.post('/cart', (req, res) => {
    cartData = req.body; // 받은 데이터를 저장
    res.json({ message: '장바구니에 추가됨', data: cartData });
});

// 장바구니 데이터 가져오기 (GET 요청)
app.get('/cart', (req, res) => {
    
    res.json(cartData);
});

//---장바구니 데이터 End---



//Listen for connections.
app.listen(port, () => {
    console.log('3000번 포트에서 backend server 실행중...');
});