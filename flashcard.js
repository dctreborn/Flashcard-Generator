//holds basic flashcard functions for assignment

//CREATE JSON FILE INSTEAD TO STORE AND GRAB QUESTIONS
//select 10 random questions, show question->guess->answer
//show score at end

// var json = require("json-update");
var inquirer = require("inquirer");
var flashcard = require("./flashcard.json");
var count = 0;
var hit = 0;
var miss = 0;

//basic card constructor
function BasicCard(front, back) {
    this.front = front;
    this.back = back;
}

function buildTrivia(cards) {
    var length = cards.length;
    var array = [];

    for (var i = 0; i < length; i++) {
        array.push(new BasicCard(cards[i].front, cards[i].back));
    }
    console.log("Welcome to Capital Trivia!");
    console.log("Do your best to guess the capitals!");
    console.log("-----");
    trivia(array);
}

function trivia(questions) {

    if (count < questions.length) {
        inquirer.prompt([
	        {
	            message: "Question #" + (count + 1) + ": " + questions[count].front,
	            type: "input",
	            name: "answer"
	        }
        ]).then(function(user){
        	if (user.answer.toLowerCase().trim() == questions[count].back.toLowerCase()) {
        		hit++;
        		console.log("Correct!");
        	} else {
        		miss++;
        		console.log("The answer is " + questions[count].back);
        	}
        	count++
        	trivia(questions);
        });
    } else {
        //display score
        console.log("-----");
        console.log("Game over!");
        console.log("Correct Answers: " + hit);
        console.log("Misses: " + miss);
        console.log("-----");
        inquirer.prompt([
        {
        	type: "confirm",
        	message: "Replay?",
    		default: false,
    		name: "replay"
        }]).then(function(user){
        	if (user.replay) {
        		buildTrivia(flashcard.cards);
        	} else {
        		console.log("Goodbye!");
        	}
        });
    }
}

//initial menu
function menu() {
    inquirer.prompt([{
        type: "list",
        message: "Please select a command.",
        choices: ["Play trivia game", "Quit"],
        name: "option"
    }]).then(function(select) {
        var command = select.option;

        switch (command) {
            case "Play trivia game":
                buildTrivia(flashcard.cards);
                break;
            default:
                console.log("Closing up shop.");
        }
    });
}

menu();