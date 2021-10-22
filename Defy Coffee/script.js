const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.list')
eventListeners();

function eventListeners(){
	window.addEventListener('DOMContentLoaded', () => {
		loadJSON();
	})
	//show/hide cart
	document.getElementById('cart-btn').addEventListener
	('click', () => {
		cartContainer.classList.toggle('show-cart-container');
	});
}

//load product items
function loadJSON(){
	fetch('products.json')
	.then(response => response.json())
	.then(data => {
		let html = '';
		data.forEach(product => {
			console.log(product);
		})
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
