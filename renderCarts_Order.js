let cartData = [];
function renderCarts() {
  fetch('http://localhost:3000/cart')
    .then((response) => response.json())
    .then((cart) => {
      cartData = cart;
      const cartList = document.getElementById('cartList');
      cartList.innerHTML = '';

      if (cart.length === 0) {
        tableBody.innerHTML = '<div>empty</div>';
        return;
      }

      cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${item.img}" alt="${item.prodName}" />
          <div>
            <span>상품명: ${item.prodName}</span>
            <span>가격: ${item.prodPrice}원</span>
            <span>수량: ${item.quantity}</span>
          </div>
        `;
        cartList.appendChild(cartItem);
      });
    });
}

function order() {
  if (cartData.length === 0) {
    alert('장바구니가 비어 있습니다.');
    return;
  }
  const orderData = {
    orderId: Math.floor(Math.random() * 100) + 1, // 주문 ID (랜덤으로 생성)
    date: new Date().toISOString().split('T')[0], // 주문 일자 (오늘 날짜)
    items: cartData, // 장바구니 데이터
  };

  fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      cartData = [];
      window.location.href = 'orderList.html';
    })
    .catch((error) => {
      console.error('주문 오류:', error);
    });
}

document.addEventListener('DOMContentLoaded', renderCarts);
