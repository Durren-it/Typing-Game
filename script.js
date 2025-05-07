const word = document.getElementById("word");
const text = document.getElementById("input");
const score = document.getElementById("score");
const time = document.getElementById("time");
const message = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settingsDiv = document.getElementById("settings-div");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const endGameMessage = document.getElementById("end-game-container");
const endGameScore = document.getElementById("end-game-score");
const restartButton = document.getElementById("restart-button");

const words = [
    "ciao",
    "cane",
    "gatto",
    "computer",
    "javascript",
    "programmazione",
    "sviluppo",
    "web",
    "applicazione",
    "sito",
    "internet",
    "tecnologia",
    "software",
    "hardware",
    "sistema",
    "rete",
    "database",
    "algoritmo",
    "programmatore",
    "codice",
];

let randomWord;
let scoreValue = 0;
let timeValue = 10;
let difficulty = "easy";

let timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

function updateScore() {
    scoreValue++;
    score.innerText = scoreValue;
}

function reloadPage() {
    window.location.reload();
}

function updateTime() {
    timeValue--;
    time.innerText = timeValue + "s";
    if (timeValue === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    endGameMessage.style.visibility = "visible";
    restartButton.style.visibility = "visible";
    endGameScore.innerText = scoreValue;
}

function difficultyTime () {
    if (difficulty === "easy") {
        timeValue = 10;
    } else if (difficulty === "medium") {
        timeValue = 7;
    } else if (difficulty === "hard") {
        timeValue = 5;
    }
}

function scoreReset() {
    scoreValue = 0;
    score.innerText = scoreValue;
}

function hideEndGameMessages() {
    endGameMessage.style.visibility = "hidden";
    restartButton.style.visibility = "hidden";
}

restartButton.addEventListener("click" , () => {
    hideEndGameMessages();
    scoreReset();
    difficultyTime();
    time.innerText = timeValue + "s";
    text.value = "";
    addWordToDOM();
    text.focus();
    timeInterval = setInterval(updateTime, 1000);
})

text.addEventListener("input", (e) => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        e.target.value = "";
        addWordToDOM();
        updateScore();
        if (difficulty === "hard") {
            timeValue += 2;
        } else if (difficulty === "medium") {
            timeValue += 3;
        } else {
            timeValue += 5;
        }
        updateTime();
    }
});

settingsForm.addEventListener("change", (e) => {
    difficulty = e.target.value;
    clearInterval(timeInterval);
    scoreReset();
    difficultyTime();
    hideEndGameMessages();
    time.innerText = timeValue + "s";
    text.value = "";
    addWordToDOM();
    text.focus();
    timeInterval = setInterval(updateTime, 1000);
})

addWordToDOM();
text.focus();