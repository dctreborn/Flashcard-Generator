//holds extended flashcard functions not used in assignment

//CREATE JSON FILE INSTEAD TO STORE AND GRAB QUESTIONS
//select 10 random questions, show question->guess->answer
//show score at end

var fs = require("fs");
var inquirer = require("inquirer");

//basic card constructor
function BasicCard(front, back) {
	this.front = front;
	this.back = back;
}

function createBasic(){
	console.log("Creating a basic card.")
	inquirer.promt([
		{
			type: "input",
			message: "Enter a question to ask",
			name: "question"
		},
		{
			type: "input",
			message: "Enter the answer to the question".
			name: "answer"
		}
	]).then(function(card){
		var basic = new BasicCard(card.question, card.answer);
		storeCard(basic);
		menu();
	});
}

//cloze card constructor
function ClozeCard(text, cloze) {
	this.text = text; //full text
	this.cloze = cloze;
	this.partial = text.trim().replace(cloze, "...");
}

//cloze match
ClozeCard.prototype.IsMatch = function(guess) {
	if (guess != this.cloze.toLowerCase()) {
		console.log("Sorry. Wrong guess.")
	} else {
		console.log("Correct!\n" + this.text);
	}
}

function createCloze() {
	console.log("Creating a cloze card.")
	inquirer.promt([
		{
			type: "input",
			message: "Enter the whole sentence",
			name: "sentence"
		},
		{
			type: "input",
			message: "Enter the phrase to guess".
			name: "phrase"
		}
	]).then(function(card){
		var sentence = card.sentence;
		var phrase = card.phrase;

		if (sentence.match(/phrase/g) == null) {
			console.log("Phrase not found in sentence. Please reenter cloze card.");
			createCloze();
		}
		var cloze = new ClozeCard(sentence, phrase);
		storeCard(cloze);
		menu();
	});
}

//store to text
function storeCard(card) {
	var str = "";

	for (key in card) {
		if (key != "IsMatch"){
			str += card[key] + "***"; //*** used as phrase marker; basic will have two, cloze will have three
		}
	}
	str += "\n"; //add newline to end of string

	fs.appendFile("cards.txt", str, function(err){
		if (err) throw err;

		console.log("Card added!");
	});	
}

function clearCards() {
	fs.unlink("cards.txt", function(err){
		if (err) throw err;

		console.log("Cards deleted.");
	});
}

//read all cards
function readCards() {
	fs.readFile("cards.txt", function(err, data){
		if (err) throw err;

		var formatted = data.replace(/(\*\*\*)/g, ", ");
		console.log(data);
	});
}

//pick random card
function randomCard() {
	fs.readFile("cards.txt", function(err, data){
		if (err) throw err;

		var datArray = data.split("\n");
		var length = datArray.length;
		var random = Math.floor(Math.random() * length);

		var picked = datArray[random];
		var count = picked.match(/(\*\*\*)/g); //counts number of ***
		picked = picked.split(/(\*\*\*)/); //to split by *** and read array to guess

		flashcard(picked);
	});
}

//show and guess flashcard
function flashcard(card){

}

//initial menu
function menu(){
	inquirer.prompt([
		{
			type: "list",
			message: "Please select a command.".
			list: ["Create basic card", "Create cloze card", "See current cards", "Pick a random card", "Clear all cards", "Quit"],
			name: "option"
		}
	]).then(function(select){
		var command = select.option;

		switch (command) {
			case "Create basic card":
				createBasic();
				break;
			case "Create cloze card":
				createCloze();
				break;
			case "See current cards":
				readCards();
				break;
			case "Clear all cards":
				clearCards();
				break;
			case "Pick a random card":
				randomCard();
				break;
			case "Clear all cards":
				clearCards()
				break;
			default:
				console.log("Closing up shop.");
		}
	};
}

menu();