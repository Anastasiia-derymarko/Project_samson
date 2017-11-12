var cart={};

function loadCart() {
  //проверяет есть ли в localStorage запись cart
  if (localStorage.getItem('cart')) {
    //если есть - расшифровываю и записываю в переменую cart
    cart = JSON.parse(localStorage.getItem('cart'));
    showCart();
  }
  // если корзина пуста сказать 
  else{
    $('table').html('корзина пуста')
  }
}
function showCart(){
  $.getJSON("js/product.json", function (data){
    
    var product = data;

    var out = '';
    for ( var id in cart){
      out+=`          
              <tr>
                <td>
                 <img src="${product[id].img}">
                 <span>${product[id].name}</span>
                </td>
                <td>
                  <a class="z-depth-1 cyan white-text bot bold" href="#">-</a>
                  <span class="bold mar">1</span>
                  <a class="z-depth-1 cyan white-text bot bold" href="#">+</a>
                </td>
                <td>${product[id].cost}грн.</td>
              </tr>
      `

    }
    $('.tbody').html(out);
  });
}
$(document).ready(function(){
  loadCart();
});