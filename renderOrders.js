function renderOrders() {
  const tableBody = document.getElementById('orderTableBody');
  tableBody.innerHTML = '';

  fetch('http://localhost:3000/orders')
    .then((response) => response.json())
    .then((orders) => {
      if (orders.length === 0) {
        tableBody.innerHTML =
          '<tr><td colspan="6">주문 내역이 없습니다.</td></tr>';
        return;
      }

      orders.forEach((order) => {
        order.items.forEach((item, index) => {
          const row = document.createElement('tr');
          if (index === 0) {
            row.innerHTML = `
      <td rowspan="${order.items.length}">${order.orderId}</td>
      <td rowspan="${order.items.length}">${order.date}</td>
      <td>${item.prodNo}</td>
      <td>${item.prodName}</td>
      <td>${item.prodPrice}</td>
      <td>${item.quantity}</td>
    `;
          } else {
            row.innerHTML = `
      <td>${item.prodNo}</td>
      <td>${item.prodName}</td>
      <td>${item.prodPrice}</td>
      <td>${item.quantity}</td>
    `;
          }
          tableBody.appendChild(row);
        });
      });
    });
}

document.addEventListener('DOMContentLoaded', renderOrders);
