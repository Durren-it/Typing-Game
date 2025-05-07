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

let words = [];
let randomWord;
let lastIndex = -1;
let scoreValue = 0;
let timeValue = 10;
let difficulty = "easy";

let timeInterval = setInterval(updateTime, 1000);

async function fetchWords() {
    try {
        const response = await fetch ("https://random-word-api.herokuapp.com/word?number=100&lang=it");
        words = await response.json();
    } catch (error) {
        console.error("Errore nel recupero parole:", error);
        words = ["errore", "rete", "riprova", "connessione"];
    }
}

function getRandomWord() {
    let index = Math.floor(Math.random() * (words.length - 1));
    if (index >= lastIndex) index++; // Salta l'indice precedente
    lastIndex = index;
    return words[index];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
    word.style.visibility = "visible";
}

function updateScore() {
    scoreValue++;
    score.innerText = scoreValue;
}

function reloadPage() {
    window.location.reload();
}

async function restartHandle() {
    await fetchWords();
    clearInterval(timeInterval);
    scoreReset();
    difficultyTime();
    hideEndGameMessages();
    time.innerText = timeValue + "s";
    text.value = "";
    addWordToDOM();
    text.focus();
    timeInterval = setInterval(updateTime, 1000);
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

restartButton.addEventListener("click" , async () => {
    await restartHandle();
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

settingsForm.addEventListener("change", async (e) => {
    difficulty = e.target.value;
    await restartHandle();
})

async function initGame() {
    word.style.visibility = "hidden";
    await fetchWords();
    addWordToDOM();
    text.focus();
};

initGame();