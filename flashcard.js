//holds basic flashcard functions for assignment

//CREATE JSON FILE INSTEAD TO STORE AND GRAB QUESTIONS
//select 10 random questions, show question->guess->answer
//show score at end

// var json = require("json-update");
var inquirer = require("inquirer");
var flashcard = require("./flashcard.json").cards;

//basic card constructor
function BasicCard(front, back) {
	this.front = front;
	this.back = back;
}

function buildTrivia(cards){
	var length = cards.length;
}

function trivia(){
	
}

//initial menu
function menu(){
	inquirer.prompt([
		{
			type: "list",
			message: "Please select a command.".
			list: ["Play trivia game", "Quit"],
			name: "option"
		}
	]).then(function(select){
		var command = select.option;

		switch (command) {
			case "Play trivia game":
				buildTrivia();
				break;
			default:
				console.log("Closing up shop.");
		}
	};
}

menu();