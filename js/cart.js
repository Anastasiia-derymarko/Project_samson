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
			    for (var id in cart){
				      out+=`          
			             <tr>
			                <td><button class="z-depth-1 cyan white-text bold del-product" data-id="${id}" >x</button></td>
			                <td>
			                
			                 <img src="${product[id].images}">
			                 <span>${product[id].name}</span>
			                </td>
			                <td>
			                  <button class="z-depth-1 cyan white-text bot bold removeProduct" data-id="${id}">-</button>
			                  <span class="bold mar">${cart[id]}</span>
			                  <button class="z-depth-1 cyan white-text bot bold addProduct" data-id="${id}">+</button>
			                </td>
			                <td><span class="sum">${product[id].cost*cart[id]}</span> грн.</td>
			             </tr>
			      `
		

			}

			$('.tbody').html(out);
			$('.del-product').on('click', delProduct);
			$('.removeProduct').on('click', removeProduct);
			$('.addProduct').on('click', addProduct);
			
			
			var text=[];

			$('.sum').each(function (){
				text.push($(this).text());	
			});
     		
     		// console.log(text);
     		var a = 0;
     		for (var i = 0; i < text.length; i++) {
     			a=a+parseInt(text[i]);

     			
     		}
     		$('.all-sum').text(a);
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

function addProduct (){
	// добавляем кнопкой + количество
	var id = $(this).attr('data-id');
	cart[id]++
	saveCart();
	showCart();
	
};

function removeProduct(){
	// отнимаем кнопкой - количество
	var id = $(this).attr('data-id');
	if(cart[id]>=2){	
		cart[id]--
		saveCart();
		showCart();

	}	
	// удаляем товар из корзины
	else{
		delete cart[id];
		saveCart();
		showCart();
	}
}




// сохранение что в корзине localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));

}
function isEnpty(object){
	//прововерка корзины на постоту
	for(var key in object)
	if(object.hasOwnProperty(key)) return true;
	return false;	 
}
function sendEmail (){
	var aname = $('#ename').val();
	var aphone = $('#ephone').val();
	var email = $('#email').val();

	if(aname!='' && aphone!='' && email!=''){
		if(isEnpty(cart)){
			$.post(
				"js/core/mail.php",
				{	
					"aphone" : aphone,
					"email"  : email,
					"aname" : aname,
					"cart" : cart
				},
				function (data){
					if(data==1){
						alert('Заказ отправлен')
					}
					else{
						alert('Повторите заказ')
					}
				}
			);
		}
		else{
			alert('корзина пуста')
		}
	}
	else{
		alert('заполни поля')
	}

}	


$(document).ready(function(){
  loadCart();
  $('.send-button').on('click', sendEmail); //отправить письмо с заказом

});

 
// function f1(){
// 	var t = $('.sum');
// 	for (var i = 0; i < t.length; i++) {
// 		t= t[i].text();
		
// 	}
	
// 	console.log(t);
// }


 
