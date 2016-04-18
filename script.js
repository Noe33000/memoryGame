/*
1. Upload all the photo's urls to the array photos;
2. Call setEnvironment() to double photos array and sort it randomly;
3. Create a div with an image inside and append it to the document;
4. Then their's an anonymous function called on click:
	4.1 firstCardClicked variable stores url of the first clicked img;
	4.2 secondCardClicked variable stores url of the second clicked img;
	4.2 they are compared, variables of guesses and right guesses are increased ;
5. When count of right guesses is equal to photos array, finishGame() executed:
	5.1 All images are deleted;
	5.2 Final phrase with counters and an image to illustarte it are inserted;
	5.3 Restart button shown.
6. ????????
7. PROFIT	
*/

var photos = [
	'img/cat.jpg',
	'img/chimpanzee.jpg',
	'img/panda.jpg',
	'img/snake.jpg',
	'img/fuchs.jpg',
	'img/owl.jpg',
	'img/pelikan.jpg',
	'img/parrot.jpg'
];

var countGuesses = 0;
var countRightGuesses = 0;

var firstCardClicked;
var secondCardClicked;
var div1;
var div2;

var photoArrayDoubled = [];

/***********************
SETTING GAME ENVIRONMENT
***********************/

$('#restart-btn').on('click', setEnviroment);

setEnviroment();

function setEnviroment() {

	photoArrayDoubled = [];
	countGuesses = 0;
	countRightGuesses = 0;

	$('#restart-btn').addClass('btn-hidden');
	$('#result-content').empty();

	createFinalArray();
	createCards();

	resetTempVars();
}


function createFinalArray() {
	
	for (var j = 0; j < photos.length; j++) {
		photoArrayDoubled.push(photos[j]);
		photoArrayDoubled.push(photos[j]);
	}
	photoArrayDoubled.sort(function(){
		return (0.5 - Math.random()); //sorts this array's elements randomly
	});
}


function createCards() {
	for (var i = 0; i < photoArrayDoubled.length; i++) {

		var newDiv = document.createElement('div');
		$(newDiv).addClass('img-container card-hidden');
		$('#cards-container').append(newDiv);

		var newImg = document.createElement('img');
		newImg.src = photoArrayDoubled[i];
		$(newImg).addClass('img-to-guess');
		$(newDiv).append(newImg);
	}

}


/***********************
   CARDS MANIPULATING
***********************/

$(document).on('click', '.img-container', function() {

	if (div1 === undefined && div2 === undefined) { 

		if ($(this).hasClass('card-hidden')) {
			$(this).removeClass('card-hidden');
			firstCardClicked = $(this).children('.img-to-guess').attr('src');

			div1 = this;
		}

	} 

	else if (div1 !== undefined && div2 === undefined) {

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

		if (countRightGuesses == photos.length) {
			setTimeout(finishGame, 1000);
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
	showResult();
	$('#restart-btn').removeClass('btn-hidden');
}

function showResult() {
	if (countGuesses / countRightGuesses >=1 && 
		countGuesses / countRightGuesses <=1.5) {
		$('#result-content').prepend('<p class="result-text">It took you ' + countGuesses + ' to guess ' + countRightGuesses + ' pairs of pictures. Congratulations, you have a very good memory!</p>');
		$('#result-content').prepend('<img src="img/doge_suchwow.jpg" /> <br />');
	}
	else if (countGuesses / countRightGuesses > 1.5 && 
		countGuesses / countRightGuesses <= 2) {
		$('#result-content').prepend('<p class="result-text">It took you ' + countGuesses + ' to guess ' + countRightGuesses + ' pairs of pictures. Maybe you should play this game more often? ;-)</p>');
		$('#result-content').prepend('<img src="img/sceptical_dog.jpg" /> <br />');
	}
	else {
		$('#result-content').prepend('<p class="result-text">Finally! It took you ' + countGuesses + ' to guess ' + countRightGuesses + ' pairs of pictures. That was not very impressive.</p>');
		$('#result-content').prepend('<img src="img/grumpy_cat.jpg" /> <br />');
	}
}

