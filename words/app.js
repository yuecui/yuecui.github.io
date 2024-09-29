let flashcards = [];
let currentCardIndex = 0;
let savedWords = [];

function showCard(index) {
    const wordElement = document.getElementById('word');
    const definitionElement = document.getElementById('definition');
    const exampleSentenceElement = document.getElementById('example_sentence');

    const card = flashcards[index];

    wordElement.textContent = card.word;
    definitionElement.textContent = card.definition;
    exampleSentenceElement.textContent = card.example_sentence;

    // Reset view to only show the word
    wordElement.classList.remove('hidden');
    definitionElement.classList.add('hidden');
    exampleSentenceElement.classList.add('hidden');

    // Enable/disable buttons based on the index
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === flashcards.length - 1;
}

function flipCard() {
    const definitionElement = document.getElementById('definition');
    const exampleSentenceElement = document.getElementById('example_sentence');

    if (definitionElement.classList.contains('hidden')) {
        definitionElement.classList.remove('hidden');
    } else if (exampleSentenceElement.classList.contains('hidden')) {
        exampleSentenceElement.classList.remove('hidden');
    } else {
        // If both are shown, hide them again
        definitionElement.classList.add('hidden');
        exampleSentenceElement.classList.add('hidden');
    }
}

function nextCard() {
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
        showCard(currentCardIndex);
    }
}

function prevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        showCard(currentCardIndex);
    }
}


function saveWord() {
    const card = flashcards[currentCardIndex];
    const wordInfo = `{"word": ${card.word},\n"definition": ${card.definition},\n"example_sentence": ${card.example_sentence}},`;
    savedWords.push(wordInfo);
    displaySavedWords();
}
function displaySavedWords() {
    const savedWordsList = document.getElementById('savedWordsList');
    savedWordsList.textContent = savedWords.join('\n\n');
}

function populateWordList() {
    const wordList = document.getElementById('wordList');
    flashcards.forEach((card, index) => {
        const li = document.createElement('li');
        li.textContent = card.word;
        li.onclick = () => selectWord(index);
        wordList.appendChild(li);
    });
}

function selectWord(index) {
    currentCardIndex = index;
    showCard(currentCardIndex);
}

// Fetch the flashcards data from the JSON file
fetch('words.json')
    .then(response => response.json())
    .then(data => {
        flashcards = data;
        populateWordList(); // Populate the word list
        showCard(currentCardIndex); // Initial load
    })
    .catch(error => console.error('Error loading flashcards:', error));

// Event listener for flashcard click to flip
document.getElementById('flashcard').addEventListener('click', flipCard);