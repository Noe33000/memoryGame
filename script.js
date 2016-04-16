var photos = [
	{url: 'img/cat.jpg', animal: 'cat'},
	{url: 'img/dog.jpg', animal: 'dog'},
	{url: 'img/fox.jpg', animal: 'fox'},
	{url: 'img/panda.jpg', animal: 'panda'},
	{url: 'img/snake.jpg', animal: 'snake'}
];

console.log(photos.length);

var arrayDoubled = [];

/***********************
SETTING GAME ENVIRONMENT
***********************/

setEnviroment();

function setEnviroment() {

	$('#start-btn').addClass('btn-hidden');
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
		$(newDiv).addClass('img-container card-hidden');
		$('#cards-container').append(newDiv);

		var newImg = document.createElement('img');
		newImg.src = arrayDoubled[i]['url'];
		$(newImg).addClass('img-to-guess');
		$(newDiv).append(newImg);
	}

}


/***********************
   CARDS MANIPULATING
***********************/
var countGuesses = 0;
var countRightGuesses = 0;
var firstCardClicked;
var secondCardClicked;
var div1;
var div2;

 

$('.img-container').on('click', function() {

	if (div1 == undefined && div2 == undefined) { 

		if ($(this).hasClass('card-hidden')) {
			$(this).removeClass('card-hidden');
			firstCardClicked = $(this).children('.img-to-guess').attr('src');

			div1 = this;
		}

	} 

	else if (div1 != undefined && div2 == undefined) {

		if ($(this).hasClass('card-hidden')) {
			$(this).removeClass('card-hidden');
			secondCardClicked = $(this).children('.img-to-guess').attr('src');

			div2 = this;

			checkMatch();
		}
	} 
});




function checkMatch() {

	if (firstCardClicked == secondCardClicked) {

		resetTempVars();
		countRightGuesses++;
		console.log('right ones :' + countRightGuesses);

		if (countRightGuesses == photos.length) {
			finishGame();
		}
	}
	else {
		setTimeout(function() {

			$(div1).addClass('card-hidden');
			$(div2).addClass('card-hidden');
			resetTempVars();

		}, 1200);
	}
	countGuesses++;
}


function resetTempVars() {
	firstCardClicked = undefined;
	secondCardClicked = undefined;
	div1 = undefined;
	div2 = undefined;
}

function finishGame() {
	$('#cards-container').empty();
	$('#result-text').text('You won finally, that was not very impressive');
	$('#restart-btn').removeClass('btn-hidden');
}


