var cart={};

function loadCart() {
  //проверяет есть ли в localStorage запись cart
  if (localStorage.getItem('cart')) {
    //если есть - расшифровываю и записываю в переменую cart
    cart = JSON.parse(localStorage.getItem('cart'));
    //прововерка корзины на постоту
       	showCart();
    }
  // если корзина пуста сказать 
  else{
    $('table').html('корзина пуста')
  }
}

function showCart(){
	if(!isEnpty(cart)){
    	$('table').html('корзина пуста')
    }
    else{
		  	$.getJSON("js/product.json", function (data){
		    
		    var product = data;
		    var out = '';
			    for ( var id in cart){
			      out+=`          
			             <tr>
			                <td><button class="z-depth-1 cyan white-text bold del-product" data-id="${id}" >x</button></td>
			                <td>
			                
			                 <img src="${product[id].img}">
			                 <span>${product[id].name}</span>
			                </td>
			                <td>
			                  <button class="z-depth-1 cyan white-text bot bold" href="#">-</button>
			                  <span class="bold mar">${cart[id]}</span>
			                  <button class="z-depth-1 cyan white-text bot bold" href="#">+</button>
			                </td>
			                <td>${product[id].cost}грн.</td>
			              
			             </tr>
			      `
			    }
			$('.tbody').html(out);
			$('.del-product').on('click', delProduct);
			});
	}
	
};


function delProduct(){
  // удаляем товар из корзины
  var id = $(this).attr('data-id');
  delete cart[id];
  saveCart();
  showCart();

}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));

}
function isEnpty(object){
	//прововерка корзины на постоту
	for(var key in object)
	if(object.hasOwnProperty(key)) return true;
	return false;	 
}

$(document).ready(function(){
  loadCart();
});