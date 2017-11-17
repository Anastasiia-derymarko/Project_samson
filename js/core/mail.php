<?php 
// читать json файл
$json = file_get_contents('../js/product.json'); //берем в переменную json файл
$json = json_decode($json); //конвектируем в массив

// письмо
$message = '';
$message .= '<h1>Заказ в магазине</h1>';
$message .= '<p>Телефон: '.$_POST['aphone'].'</p>';
$message .= '<p>Почта: '.$_POST['email'].'</p>';
$message .= '<p>Имя: '.$_POST['aname'].'</p>';

$cart = $_POST['cart'];

//цикл
foreach($cart as $id=>$count) {
		//количество $count
	$message .=$json[$id]['name'];//название товара с переменной json где лежит json файл 

}
print_r($message);
