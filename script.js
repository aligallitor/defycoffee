const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-cnt')
const cartList = document.querySelector('.cart-list');

eventListeners();

let cartItemID = 1;


function eventListeners(){
	window.addEventListener('DOMContentLoaded', () => {
		loadJSON();
    loadCart();
	})
	//show/hide cart
	document.getElementById('cart-btn').addEventListener
	('click', () => {
		cartContainer.classList.toggle('show-cart-container');
	});

  productList.addEventListener('click', purchaseProduct);

  cartList.addEventListener('click', deleteProduct);

}

function updateCartInfo(){
  let cartInfo = findCartInfo();
  cartCountInfo.textContent = cartInfo.productCount;
  cartTotalValue.textContent = cartInfo.total;
}

updateCartInfo();

//load product items
function loadJSON(){
	fetch('products.json')
	.then(response => response.json())
	.then(data => {
		let html = '';
		data.forEach(product => {
			html += `
        <div class = "product-item">
            <div class="product-img">
              <img src="${product.imgSrc}">	
                <button type= "button" class="add-to-cart-btn">
                  <i class="shopping-cart"></i>Add To Cart
                </button>
          </div>

      <div class = "product-content">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">₱${product.price}</p>
      </div>
      </div>
      `;
		})
    productList.innerHTML = html;
	})
}

var swiper = new Swiper(".home-slider", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 5500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop:true,
      });

function purchaseProduct(e){
  if(e.target.classList.contains('add-to-cart-btn')){
    let product = e.target.parentElement.parentElement;
    getProductInfo(product);
  }
}

function getProductInfo(product){
  let productInfo = {
    id: cartItemID,
    imgSrc: product.querySelector('.product-img img').
    src,
    name: product.querySelector('.product-name').
    textContent,
    price: product.querySelector('.product-price').
    textContent
  }
  cartItemID++;
  addToCartList(productInfo);
  saveProductInStorage(productInfo);
}

function addToCartList(product){
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.setAttribute('data-id', `${product.id}`);
  cartItem.innerHTML = `
              <img src= "${product.imgSrc}">
							<div class="cart-item-info">
                <h3 class="cart-item-name">"${product.name}"</h3>
                <span class="cart-item-price">${product.price}"
                </span>
							</div>

							<button type="button" class="cart-item-del-btn">
              <i class="times">x</i></button>
              `; 
  cartList.appendChild(cartItem);
}

function saveProductInStorage(item){
  let products = getProductFromStorage();
  products.push(item);
  localStorage.setItem('products', JSON.stringify(products));
  updateCartInfo();
}

function getProductFromStorage(){
  return localStorage.getItem('products') ? JSON.parse
  (localStorage.getItem('products')) :[];
}

function loadCart(){
  let products = getProductFromStorage();
  if(products.length < 1){
    cartitemID = 1;
  }
  else {
    cartItemID = products[products.length - 1].id;
    cartItemID++;
  }
  products.forEach(product => addToCartList(product));
}

function findCartInfo(){
  let products = getProductFromStorage();
  let total = products.reduce((acc, product) => {
    let price = parseFloat(product.price.substr(1));
    return acc += price;
  }, 0);
  
  return{
    total: total.toFixed(2),
    productCount: products.length
  }
}

// delete product
function deleteProduct(e){
  let cartItem;
  if(e.target.tagName === "BUTTON"){
    cartItem = e.target.parentElement;
    cartItem.remove();
  }
  else if(e.target.tagName === "I"){
    cartItem = e.target.parentElement.parentElement;
    cartItem.remove();
  }

  let products = getProductFromStorage();
  let updatedProducts = products.filter(product => {
    return product.id !== parseInt(cartItem.dataset.id);
  });
  localStorage.setItem('products', JSON.stringify
  (updatedProducts));

  updateCartInfo();
}

