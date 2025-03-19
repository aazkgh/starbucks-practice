// URL에서 상품 ID 가져오기
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
  
// 서버에서 상품 데이터 가져오기
fetch(`http://localhost:3000/product/${productId}`)
  .then(response => response.json())
  .then(product => {
    if (product.message) {
        alert('해당 상품을 찾을 수 없습니다.');
        return;
    }

    // 페이지에 데이터 삽입
    document.getElementById('prodId').innerText = product.id;
    document.getElementById('category').innerText = product.category; 
    document.getElementById('product_name_ko').innerText = product.name_ko;
    document.getElementById('product_name_en').innerText = product.name_en;
    document.getElementById('product_price').innerText = product.price;
    document.getElementById('product_intro').innerText = product.intro;
    document.getElementById('product_kcal').innerText = product.kcal;
    document.getElementById('product_fat').innerText = product.fat;
    document.getElementById('product_protein').innerText = product.protein;
    document.getElementById('product_natrium').innerText = product.natrium;
    document.getElementById('product_sugar').innerText = product.sugar;
    document.getElementById('product_caffeine').innerText = product.caffeine;
    document.getElementById('product_caution').innerText = product.caution;
    document.getElementById('product_image').src = product.image;
})
.catch(error => {
    console.error('Error:', error);
    alert('상품 정보를 불러오는 데 실패했습니다.');
});
  
  
//--장바구니버튼 클릭 이벤트 설정 및 변수 선언 start--
let btn_cart = document.querySelector('button');

btn_cart.addEventListener('click', function () {
    let prodNo = document.getElementById('prodId').textContent;
    let prodName = document.getElementById('product_name_ko').innerText;
    let prodPrice = document.getElementById('product_price').innerText;
    let img = document.getElementById('product_image').src;
    let quantity = document.querySelector('input').value;


    // 수량이 0 이하인 경우, 경고 메시지를 출력하고 함수 종료
    if (quantity <= 0) {
        alert('수량을 선택해주세요!');
        return;
    }
    // 장바구니에 추가할 상품 정보를 객체로 생성
    let data = {
        prodNo : prodNo,
        prodName: prodName,
        prodPrice:prodPrice,
        img: img,
        quantity: quantity
    };

    // 장바구니 API로 POST 요청 보내기
    fetch('http://localhost:3000/cart', { // Express 서버로 POST 요청
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('장바구니에 추가되었습니다!');
        window.location.href = 'cart.html'; //내부 경로로 수정
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
    //--장바구니버튼 클릭 이벤트 설정 및 변수 선언 end--Z