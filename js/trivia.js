
var questions = ["What is EDM?", "What is a program used by music producers?", "This producer is famous for future bass.", "Which artist wears a mouse hat when performing?", "Which artist was responsible for Language?", "Which song is not produced by Alesso?", "Who does not belong in Swedish House Mafia?", "What genre of music does Chainsmokers make currently compared to their older releases that were a lot better?"];

var answers = [["Electronic Dance Music", "Electronic Dance Machine", "Enhanced Domestic Mules", "Enhanced Domestic Monkeys"],["Logic", "FL Studios", "Ableton", "All of The Above"], ["Kygo","Marshmello","Tiesto","Illenium"],["DeadMau5","Marshmello","Bucket Head","Mouse Daddy"], ["Porter Robinson", "Alesso", "Zedd", "TokiMonsta"], ["Cool","Heroes","Sweet Escape","Beyond Ready"], ["Axwell", "Sebastian Ingrosso", "Steve Angello", "Alesso"], ["Deathstep","Crappy Pop Music","Trap","Electro House"]];

var correct = ["A. Electronic Dance Music", "D. All of The Above", "D. Illenium", "A. DeadMau5", "A. Porter Robinson", "D. Beyond Ready", "D. Alesso", "B. Crappy Pop Music"];

var initialScreen;

var game;

var theClock;

var selected;

var unansweredTally = 0;

var questionCounter = 0;

var correctTally = 0;

var incorrectTally = 0;

var counter = 10;

$(document).ready(function() {

function initialScreen() {
	initialScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start The Trivia!</a></p>";
	$(".mainArea").html(initialScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	generateHTML();

	timerWrapper();

});

$("body").on("click", ".answer", function(event){
	selected = $(this).text();
	if(selected === correct[questionCounter]) {
		
		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	resetGame();
});

}); 

function generateLossDueToTimeOut() {
	unansweredTally++;
	game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correct[questionCounter] + "</p>";
	$(".mainArea").html(game);
	setTimeout(wait, 2000);
}

function generateWin() {
	correctTally++;
	game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correct[questionCounter] + "</p>";
	$(".mainArea").html(game);
	setTimeout(wait, 2000);  
}

function generateLoss() {
	incorrectTally++;
	game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correct[questionCounter] + "</p>";
	$(".mainArea").html(game);
	setTimeout(wait, 2000);
}

function generateHTML() {
	game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class='text-center'>" + questions[questionCounter] + "</p><p class='first-answer answer'>A. " + answers[questionCounter][0] + "</p><p class='answer'>B. "+answers[questionCounter][1]+"</p><p class='answer'>C. "+answers[questionCounter][2]+"</p><p class='answer'>D. "+answers[questionCounter][3]+"</p>";
	$(".mainArea").html(game);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 10;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(tenSeconds, 1000);
	function tenSeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	game = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Restart Trivia?</a></p>";
	$(".mainArea").html(game);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 10;
	generateHTML();
	timerWrapper();
}

