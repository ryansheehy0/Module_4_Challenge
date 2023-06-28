const startButton = document.getElementById("start_button")
const main = document.querySelector("main")

var button1
var button2
var button3
var button4

function setButtons(){
	// Gets the buttons from the new dom
	button1 = document.querySelector(".button1")
	button2 = document.querySelector(".button2")
	button3 = document.querySelector(".button3")
	button4 = document.querySelector(".button4")
}

function htmlQuestion(title, button1, button2, button3, button4, isFirstQuestion, isCorrect){
	let returnHTML = `
		<h1 class="question_title">${title}</h1>
		<div class="button_container">
			<button class="button1">1. ${button1}</button>
			<button class="button2">2. ${button2}</button>
			<button class="button3">3. ${button3}</button>
			<button class="button4">4. ${button4}</button>
		</div>
	`
	if(!isFirstQuestion){
		returnHTML += `
			<hr style="width: '100%'">
			<h2> ${isCorrect ? "Correct!" : "Wrong!"}</h2>
		`
	}
	return returnHTML
}

function buttonClicked(button, wasCorrect, questionOrder){
	button.addEventListener("click", () => {
		questionOrder.shift() // Removes the first question
		if (questionOrder.length === 0){ // if no more questions or time is 0
			scoreScreen()
		}else{
			// Ask next question
			questionOrder[0](false, wasCorrect, questionOrder)
		}
	})
}

const question1 = (isFirstQuestion, isCorrect, questionOrder) => {
	document.documentElement.style.setProperty("--button-width", "150px")
	main.innerHTML = htmlQuestion(
		"Commonly used data types DO Not Include:", 
		"strings", 
		"booleans", 
		"alerts", 
		"numbers", 
		isFirstQuestion, 
		isCorrect)
	setButtons()
	buttonClicked(button1, false, questionOrder)
	buttonClicked(button2, false, questionOrder)
	buttonClicked(button3, true, questionOrder)
	buttonClicked(button4, false, questionOrder)
}

const question2 = (isFirstQuestion, isCorrect, questionOrder) => {
	document.documentElement.style.setProperty("--button-width", "300px")
	main.innerHTML = htmlQuestion(
		"The condition in an if/else statement is enclosed with _____.", 
		"quotes", 
		"curly brackets", 
		"parenthesis", 
		"square brackets", 
		isFirstQuestion, 
		isCorrect)
	setButtons()
	buttonClicked(button1, false, questionOrder)
	buttonClicked(button2, false, questionOrder)
	buttonClicked(button3, true, questionOrder)
	buttonClicked(button4, false, questionOrder)
}

const question3 = (isFirstQuestion, isCorrect, questionOrder) => {
	document.documentElement.style.setProperty("--button-width", "300px")
	main.innerHTML = htmlQuestion(
		"Arrays in JavaScript can be used to store _____.", 
		"numbers and strings", 
		"other arrays", 
		"booleans", 
		"all of the above", 
		isFirstQuestion, 
		isCorrect)
	setButtons()
	buttonClicked(button1, false, questionOrder)
	buttonClicked(button2, false, questionOrder)
	buttonClicked(button3, false, questionOrder)
	buttonClicked(button4, true, questionOrder)
}

const question4 = (isFirstQuestion, isCorrect, questionOrder) => {
	document.documentElement.style.setProperty("--button-width", "300px")
	main.innerHTML = htmlQuestion(
		"String values must be enclosed within _____ when being assigned to variables.", 
		"commas", 
		"curly brackets", 
		"quotes", 
		"parenthesis", 
		isFirstQuestion, 
		isCorrect)
	setButtons()
	buttonClicked(button1, false, questionOrder)
	buttonClicked(button2, false, questionOrder)
	buttonClicked(button3, true, questionOrder)
	buttonClicked(button4, false, questionOrder)
}

const question5 = (isFirstQuestion, isCorrect, questionorder) => {
	document.documentElement.style.setProperty("--button-width", "300px")
	main.innerHTML = htmlQuestion(
		"A very useful tool used during development and debugging for printing content to the debugger is:", 
		"javascript", 
		"terminal/bash", 
		"for loops", 
		"console.log", 
		isFirstQuestion, 
		isCorrect)
	setButtons()
	buttonClicked(button1, false, questionorder)
	buttonClicked(button2, false, questionorder)
	buttonClicked(button3, false, questionorder)
	buttonClicked(button4, true, questionorder)
}

function scoreScreen(){
	main.innerHTML = `
		<h1 class="question_title">All done!</h1>
		<p>Your final score is 22.</p>
		<label for="initials">Enter initials:</label>	
		<input type="text" id="initials" name="initials">
		<button class="submit_button">Submit</button>
	`
}

let questions = [question1, question2, question3, question4, question5]
// Randomly shuffle array

startButton.addEventListener("click", () => {
	// Set timer
	questions[0](true, false, questions)
})
