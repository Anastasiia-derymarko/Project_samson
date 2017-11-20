function init(){
	$.post(
		'admin/core.php',
		{
			'action': 'init'
		},
			showProduct
		);
}

function showProduct(data){
	console.log(data);
}

$('document').ready(function () {
	init();
});