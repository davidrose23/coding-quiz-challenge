var initialsInput = document.getElementById("initials");
var displayScore = document.getElementById("display-score");
var scoresList = document.getElementById("scores-list");
var clearBtn = document.getElementById("clear-btn");
var submitBtn = document.getElementById("submit-btn");
var returnBtn = document.getElementById("return-btn");
var listRow = document.getElementById("list-row");
var played = false;
var submitted = false;

function clearScores() {
    window.localStorage.clear();
    document.getElementById("list-row").style.display = "none";
    while (scoresList.hasChildNodes()) {
        scoresList.removeChild(scoresList.firstChild);
    }
    console.log("high scores cleared");
}

function showScore() {
    var userScore = JSON.parse(window.localStorage.getItem("user-score"));
    if (userScore != null) {
        played = true;
        displayScore.innerHTML = "This attempt: " + userScore;
    }
}

function saveScore() {
    if (played == true && submitted == false) {
        document.getElementById("list-row").style.display = "block";
        var initials = initialsInput.value;
        initials = initials.toUpperCase();
        var userScore = JSON.parse(window.localStorage.getItem("user-score"));
        var itemText = initials + ": " + userScore;
        var newItem = document.createElement("li");
        newItem.className = "p-2";
        newItem.textContent = itemText;
        scoresList.appendChild(newItem);
        initialsInput.value = "";

        var existingEntries = JSON.parse(window.localStorage.getItem("existing-entries"));
        var newEntry = initials + ": " + userScore;
        if (existingEntries == null) existingEntries = [];
        existingEntries.push(newEntry);
        localStorage.setItem("existing-entries", JSON.stringify(existingEntries));
        console.log(existingEntries);
    }

    submitted = true;
}

function quizAgain() {
    window.location.assign("./index.html");
}

function displaySavedScores() {
    var existingEntries = JSON.parse(window.localStorage.getItem("existing-entries"));
    if (existingEntries != null) {
        document.getElementById("list-row").style.display = "block";
        for (i = 0; i < existingEntries.length; i++) {
            var thisScore = existingEntries[i];
            var scoreLi = document.createElement("li");
            scoreLi.className = "p-2";
            scoreLi.textContent = thisScore;
            scoresList.appendChild(scoreLi);
        }
    }
}

showScore();
displaySavedScores();
returnBtn.addEventListener("click", quizAgain);
clearBtn.addEventListener("click", clearScores);
submitBtn.addEventListener("click", saveScore);
initialsInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitBtn.click();
    }
});