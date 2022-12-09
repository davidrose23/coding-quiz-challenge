var questions = [
    {
        title: "Every line of code must end with:",
        choices: [":", ";", ")", "}"],
        answer: ";"
    },

    {
        title: "Does an if statement ALWAYS need to be followed by an else statement?",
        choices: ["Yes", "No"],
        answer: "No"
    },

    {
        title: "What is the correct syntax for opening and closing an array?",
        choices: ["''", "()", '""', "[]"],
        answer: "[]"
    },

    {
        title: "How many arguments can a function take?",
        choices: ["1", "2", "3", "As many as you choose when creating the function"],
        answer: "As many as you choose when creating the function"
    },

    {
        title: "What does '===' mean?",
        choices: ["is equal to in type", "is equal to in value", "is equal to in both type and value"],
        answer: "is equal to in both type and value"
    }

];

var answerChoices = document.getElementById("answer-choices");
var incorrectAnswers = 0;
var answers = 0;
var correctAnswers = 0;
var startBtn = document.getElementById("start-btn");
var JSQuiz = document.getElementById("js-quiz");
var qTitle = document.getElementById("q-title");
var qAnswers = document.getElementById("q-answers");
var timeLeft = 30;
var timerEl = document.getElementById("timer-el");





function startQuiz() {



    JSQuiz.style.display = "none";
    startBtn.style.display = "none";
    var timerId = setInterval(countDown, 1000);
    getQuestion();


}

function countDown() {
    if (timeLeft < 1) {
        endQuiz();
    } else {
        timerEl.innerHTML = timeLeft + " seconds remaining";
        timeLeft--;
    }
}

function getQuestion() {


    
    while (answerChoices.hasChildNodes()) {
        answerChoices.removeChild(answerChoices.firstChild);
    }
    var rndInt = Math.floor(Math.random() * questions.length);
    var currentQuestion = questions[rndInt];



    window.localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
    qTitle.innerHTML = currentQuestion.title;
    document.getElementById("answer-choices").style.display = "block";
    createChoices();
    questions.splice(rndInt, 1);
}



function createChoices() {

    var currentQuestion = JSON.parse(window.localStorage.getItem("currentQuestion"));

    for (i = 0; i < currentQuestion.choices.length; i++) {

        var newBtn = document.createElement("button");
        newBtn.innerHTML = currentQuestion.choices[i];
        newBtn.id = currentQuestion.choices[i];
        newBtn.className = "btn btn-success ml-2 form-control m-1";
        answerChoices.appendChild(newBtn);

        if (currentQuestion.answer === currentQuestion.choices[i]) {
            newBtn.addEventListener("click", function () {
                correctAnswers++;
                console.log(correctAnswers + "correct");

                if (questions.length > 0) getQuestion();
                else endQuiz();
            })
        } else {
            newBtn.addEventListener("click", function () {
                timeLeft -= 10;
                incorrectAnswers++;
                console.log(incorrectAnswers + "incorrect");

                if (questions.length > 0) getQuestion();
                else endQuiz();

            })
        }

    }

}


function endQuiz() {

    var userScore = correctAnswers / 5 * 100;

    window.localStorage.setItem("user-score", JSON.stringify(userScore));
    window.location.assign("./highScores.html");

}

startBtn.addEventListener('click', startQuiz);

