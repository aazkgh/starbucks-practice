async function requestStarbucksProducts(){
    console.log('음료 리스트 호출')
    return fetch('http://localhost:3000/product').then((res) => {
        return res.json();
    })
}

async function showProductList() {
    const products = await requestStarbucksProducts();
    let productList = document.getElementById('beverage_list');

    products.forEach((element) => {
        let p = element;
        let prodBox = document.createElement('div');
        prodBox.setAttribute('class', 'beverage_box');
        productList.appendChild(prodBox);

        let imgBox = document.createElement('a');
        imgBox.setAttribute('href', 'productDetail.html?id=' + encodeURIComponent(p.prodNo));        imgBox.setAttribute('class', 'beverage_img_box');
        prodBox.appendChild(imgBox);

        let prodImg = document.createElement('img');
        prodImg.setAttribute('src', './images/' + p.img);
        prodImg.setAttribute('alt', p.prodName);        
        prodImg.setAttribute('class', 'beverage_img');        
        imgBox.appendChild(prodImg);
        
        
        let prodTitle = document.createElement('span');
        prodTitle.innerText = p.prodName;   
        prodBox.appendChild(prodTitle);
    })
}

showProductList();
