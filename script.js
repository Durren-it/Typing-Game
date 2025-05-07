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
let phrases = [];
let randomWord;
let lastIndex;
let scoreValue = 0;
let timeValue = 10;
let difficulty = "easy";
let isGameStarted = false;
let timeInterval;

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
    if (index === lastIndex) {
        index = (index + 1) % words.length; // Usa il modulo per tornare a 0 se supera la lunghezza
    }
    lastIndex = index;
    return words[index];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
    word.style.visibility = "visible";
}

async function fetchEngPhrases() {
    // TODO: recupero delle frasi da tradurre
}

async function translatePhrases() {
    // TODO: ciclo di traduzione delle frasi e creazione array da usare nel gioco
}

function getRandomPhrase() {
    // TODO: implementazione logica scelta frase casuale
}

function addPhraseToDOM() {
    // TODO: implementazione logica visualzzazione frase casuale
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
    isGameStarted = false;
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
    if (!isGameStarted) return; // Non aggioriamo il tempo se il gioco non è iniziato
    timeValue--;
    time.innerText = timeValue + "s";
    if (timeValue === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    clearInterval(timeInterval);
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
    } else if (difficulty === "phrases") {
        timeValue = 20;
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

text.addEventListener("keydown", (e) => {
    if (!isGameStarted) {
        clearInterval(timeInterval);
        isGameStarted = true;
        timeInterval = setInterval(updateTime, 1000);
    }
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
        } else if (difficulty === "easy") {
            timeValue += 5;
        } else if (difficulty === " phrases") {
            timeValue += 10;
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