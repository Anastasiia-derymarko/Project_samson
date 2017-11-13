 var cart={};//корзина

function init(){

	$.getJSON("js/product.json", productOut);


};

function productOut(data){
	//вывод товара на главную страницу 
	// console.log(data);
	var out = '';
	for (var key in data){
		out+=`	
		<div class="col l6">
			<div class="card-product valign-wrapper"> 
	    		<img src="${data[key].img}">
	        		<div class="col l8">
		       			<p class="light-blue-text">${data[key].name}</p>     
		    			<p><span class="grey-text text-lighten-1">Страна: </span>${data[key].country}</p>        
		    			<p><span class="grey-text text-lighten-1">Производитель: </span>${data[key].manufacturer}</p>     
		        		<p><span class="grey-text text-lighten-1">Объем: </span>${data[key].ml}мл</p>            
		     			<h5 class="cyan-text bold">${data[key].cost} грн.</h5>
		        		<a class="waves-effect waves-light btn cyan center text-white buy" data-id="${key}" >
		        			<i class="fa fa-cart-arrow-down" aria-hidden="true"></i> КУПИТЬ
		        		</a>
	        		</div>
        		</div>
        	</div>`           
	

 	}
 	$('.product-out').html(out);
 	$('.buy').on('click', addToCart);
};
//функция которая добовляет данные в корзину
function addToCart(){
	var id=$(this).attr('data-id');
	// console.log(id);
	if(cart[id]==undefined){
		cart[id] = 1; //если в корзине нет товара - добовляем
	}
	else{
		cart[id]++; //если такой товар есть - увеличиваем
	}
	// showMiniCart();//выводит что в корзине
	saveCart(); // сохранение что в корзине
	sumCart();
	// console.log(cart);

};

// отображает что взяли и сколько 
// function showMiniCart(){
// 	var out = '';
// 	for (var key in cart){
// 		out+= key + '-----' + cart[key]+'<br>';
// 	}
	
// 	$('.mini-basket').html(out);
	
// 	sumCart();
// }
// сохранение что в корзине localStorage
function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));

}


function loadCart() {
	//проверяет есть ли в localStorage запись cart
	if (localStorage.getItem('cart')){
		//если есть - расшифровываю и записываю в переменую cart
		cart=JSON.parse(localStorage.getItem('cart'));
		// showMiniCart();
		// console.log(cart);
		sumCart();
	}
}

$(document).ready(function(){
	init();
	loadCart();
});



//  количество товара в корзине

function sumCart(){
var t = 0;

	for (var key in cart){
		t=t+cart[key]
			// console.log(t);
	}

	$('.sumCart').html(t);

}
