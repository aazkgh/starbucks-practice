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
          <img src="images/${item.img}" alt="${item.prodName}" />
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
