const words = [
    "Danylo", "die Sonnenenergie", "die Atomenergie", "Fossile Brennstoffe", "Kohlenkraftwerk", "die Wasserenergie", "die Gravitationsenergie", "Windkraftwerk", "Stromkreis", "gefährlich", "der Kabel", "Batterie", "Akku", "Glühbirne", "Schalter", "Werkraumordnung"
];

const firstWord = words[0]; // Erstes Wort fixieren
const shuffledWords = [firstWord, ...words.slice(1).sort(() => Math.random() - 0.5)];

let currentIndex = 0;
let attemptsLeft = 3; // Anzahl der Versuche

const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');

function displayNextWord() {
    if (currentIndex >= shuffledWords.length) {
        wordDisplay.textContent = "Fertig!";
        feedback.textContent = "Alle Wörter geprüft.";
        userInput.style.display = "none";
        submitBtn.style.display = "none";
        return;
    }

    wordDisplay.textContent = shuffledWords[currentIndex];
    userInput.value = "";
    userInput.disabled = true; // Eingabefeld blockieren
    feedback.textContent = "";
    attemptsLeft = 3; // Versuche zurücksetzen
    setTimeout(() => {
        wordDisplay.textContent = "";
        userInput.disabled = false; // Eingabefeld freigeben
        userInput.focus();
    }, 1000);
}

function checkWord() {
    const userAnswer = userInput.value.trim();
    const correctWord = shuffledWords[currentIndex];

    if (userAnswer === correctWord) {
        feedback.textContent = "Richtig!";
        feedback.style.color = "green";
        currentIndex++;
        setTimeout(displayNextWord, 1000);
    } else {
        attemptsLeft--;
        if (attemptsLeft > 0) {
            feedback.textContent = `Falsch! Noch ${attemptsLeft} Versuch(e).`;
            feedback.style.color = "orange";
            userInput.value = "";
        } else {
            feedback.textContent = `Falsch! Richtig wäre: "${correctWord}"`;
            feedback.style.color = "red";
            currentIndex++;
            setTimeout(displayNextWord, 1000);
        }
    }
}

// Enter-Taste Event
userInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        checkWord();
    }
});

// Button-Klick Event
submitBtn.addEventListener('click', checkWord);

// Start
displayNextWord();
