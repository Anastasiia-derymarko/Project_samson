<?php 
// echo mb_language();
// mixed mb_language ([ string $language = mb_language('r') ] )

// читать json файл
$json = file_get_contents('../product.json'); //берем в переменную json файл

$json = json_decode($json, true); //конвектируем в массив


// письмо
$message = '';
$message .= '<h1>Заказать в магазине</h1>';
$message .= '<p>Телефон: '.$_POST['aphone'].'</p>';
$message .= '<p>Почта: '.$_POST['email'].'</p>';
$message .= '<p>Имя: '.$_POST['aname'].'</p>';

$cart = $_POST['cart'];
$sum = 0;
//цикл
foreach($cart as $id=>$count) {
		//количество $count
	$message .=$json[$id]['name'].'-----';//название товара с переменной json где лежит json файл 
	$message .=$count.'----';
	$message .=$count*$json[$id]['cost'];
	$message .='<br>';
	$sum =$sum+$count*$json[$id]['cost'];
}
$message.='Всего:'.$sum;

// print_r($message);

$to = 'lolololo2263@gmail.com'.',';
$to .=$_POST['email'];
$spectext = '<!DOCTYPE html><html><head><title>Заказ</title></head><body>';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Заказ в магазине', $spectext.$message.'</body></html>', $headers);

if ($m) {echo 1;} else {echo 0;}
