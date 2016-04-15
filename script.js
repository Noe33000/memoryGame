var photos = [
	{url: 'img/cat.jpg', animal: 'cat'},
	{url: 'img/dog.jpg', animal: 'dog'},
	{url: 'img/fox.jpg', animal: 'fox'},
	{url: 'img/panda.jpg', animal: 'panda'},
	{url: 'img/snake.jpg', animal: 'snake'}
];

var arrayDoubled = [];


function setEnviroment() {

	createFinalArray();
	createCards();
	
}


function createFinalArray() {
	
	for (var j = 0; j < photos.length; j++) {
		arrayDoubled.push(photos[j]);
		arrayDoubled.push(photos[j]);
	}
	arrayDoubled.sort(function(){
		return (0.5 - Math.random());
	})
}


function createCards() {
	for (var i = 0; i < arrayDoubled.length; i++) {

		var newDiv = document.createElement('div');
		$(newDiv).addClass('img-container');
		$('#cards-container').append(newDiv);

		var newImg = document.createElement('img');
		newImg.src = arrayDoubled[i]['url'];
		$(newImg).addClass('img-to-guess');
		$(newDiv).append(newImg);
	}

}

setEnviroment();


console.log(arrayDoubled);