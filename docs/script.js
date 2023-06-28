// Utility functions
function shuffle(array){
	let newArray = []
	while(array.length !== 0){
		let randomIndex = Math.floor(Math.random() * array.length)
		newArray.push(array.splice(randomIndex, 1)[0])
	}
	return newArray
}

// Global Variables
const main = document.querySelector("main")
const timer = document.querySelector("header h2")
const viewHighScores = document.querySelector("header a")
var startButton

var button1
var button2
var button3
var button4

var secondsLeft
var interval

var highScores = [] // Array of arrays. [[name1, score1], [name2, score2]]

var questions

//Functions
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
			<hr>
			<h2 class="is_correct"> ${isCorrect ? "Correct!" : "Wrong!"}</h2>
		`
	}
	return returnHTML
}

function buttonClicked(button, wasCorrect, questionOrder){
	button.addEventListener("click", () => {
		questionOrder.shift() // Removes the first question
		if (questionOrder.length === 0){ // if no more questions
			clearInterval(interval)
			scoreScreen(true, wasCorrect)
		}else{
			if(!wasCorrect){
				secondsLeft -= 10
			}
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

function scoreScreen(isThereAnAnswere, isCorrect){
	 let html = `
		<h1 class="question_title">All done!</h1>
		<h2 class="final_score">Your final score is ${secondsLeft}.</h2>
		<div class="submit_container">
			<h2 class="name">Enter name:</h2>	
			<input type="text" id="inputName">
			<button class="submit_button">Submit</button>
		</div>
	`
	if(isThereAnAnswere){
		html += `
			<hr>
			<h2 class="is_correct"> ${isCorrect ? "Correct!" : "Wrong!"}</h2>
		`
	}
	main.innerHTML = html
	const submitButton = document.querySelector(".submit_button")
	const inputName = document.querySelector("#inputName")
	submitButton.addEventListener("click", () => {
		// Add to high scores
		let indexAdded = 0
		for(indexAdded = 0; indexAdded < highScores.length; indexAdded++){
			if(secondsLeft > highScores[indexAdded][1]){
				break
			}
		}
		highScores.splice(indexAdded, 0, [inputName.value, secondsLeft]) // Add score in the correct position
		// Display high score screen
		highScoreScreen()
	})
}

function highScoreScreen(){
	timer.style.visibility = "hidden"
	viewHighScores.style.visibility = "hidden"
	html = `
		<h1 class="question_title">High Scores</h1>
	`
	for(let i = 0; i < highScores.length; i++){
		html += `<p class="score">${i + 1}. ${highScores[i][0]/*name*/} - ${highScores[i][1]/*score*/}</p>`	
	}
	html += `
		<div class="high_score_button_container">
			<button class="go_back_button">Go back</button>
			<button class="clear_high_scores">Clear high scores</button>
		</div>
	`
	main.innerHTML = html
	const goBackButton = document.querySelector(".go_back_button")
	const clear_high_scores = document.querySelector(".clear_high_scores")
	goBackButton.addEventListener("click", () => {
		main.innerHTML = `
			<h1 class="title">Coding Quiz Challenge</h1>
			<p class="description">Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers
				will penalize your score/time by ten seconds!</p>
			<button id="start_button" class="button">Start Quiz</button>
		`
		start()
	})
	clear_high_scores.addEventListener("click", () => {
		highScores = []
		highScoreScreen()
	})
}

function start(){
	startButton = document.getElementById("start_button")
	timer.style.visibility = "visible"
	viewHighScores.style.visibility = "visible"
	secondsLeft = 75
	clearInterval(interval)
	questions = [question1, question2, question3, question4, question5]
	questions = shuffle(questions) // Randomly shuffle array
	startButton.addEventListener("click", () => {
		interval = setInterval(() => {
			timer.textContent = `Time: ${secondsLeft}`
			secondsLeft--
			if(secondsLeft === 0){
				clearInterval(interval)
				scoreScreen(false, false)
			}
		}, 1000)
		questions[0](true, false, questions)
	})
}

// Start
start()

viewHighScores.addEventListener("click", () => {
	clearInterval(interval)
	highScoreScreen()
})
