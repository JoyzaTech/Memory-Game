document.addEventListener('DOMContentLoaded', function () {
    const cardsColors = ['red', 'red', 'blue', 'blue', 'green', 'green', 'yellow', 'yellow', 'purple', 'purple', 'orange', 'orange', 'pink', 'pink', 'brown', 'brown', 'cyan', 'cyan', 'magenta', 'magenta', 'lime', 'lime', 'indigo', 'indigo', 'teal', 'teal', 'maroon', 'maroon', 'navy', 'navy'];
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let moves = 0;
    let timerInterval;
    let seconds = 0;
    let minutes = 0;

    // Shuffle the cards
    cardsColors.sort(() => 0.5 - Math.random());

    const grid = document.getElementById('memory-board');
    const moveCounter = document.getElementById('move-counter');
    const timerDisplay = document.getElementById('timer');

    // Start the timer
    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            updateTimerDisplay();
        }, 1000);
    }

    // Update the timer display
    function updateTimerDisplay() {
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        timerDisplay.textContent = `${minutes}:${formattedSeconds}`;
    }

    // Stop the timer
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Create the game board
    function createBoard() {
        for (let i = 0; i < cardsColors.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
        startTimer();
    }

    // Check for matches
    function checkForMatch() {
        const allCards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1]) {
            allCards[optionOneId].style.backgroundColor = "grey";
            allCards[optionTwoId].style.backgroundColor = "grey";
            cardsWon.push(cardsChosen);
            // Make matched cards unclickable
            allCards[optionOneId].removeEventListener('click', flipCard);
            allCards[optionTwoId].removeEventListener('click', flipCard);
        } else {
            allCards[optionOneId].style.backgroundColor = '#ccc';
            allCards[optionTwoId].style.backgroundColor = '#ccc';
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardsColors.length / 2) {
            stopTimer(); // Stop the timer when all matches are found
            alert('Congratulations! You found all matches!');
        }
    }

    // Flip the card
    function flipCard() {
        const cardId = this.getAttribute('data-id');
        // Check if the card has already been matched
        if (cardsWon.includes(cardsColors[cardId])) {
            return;
        }
        if (cardsChosen.length === 1 && cardsChosenId[0] === cardId) {
            // Prevent selecting the same card twice
            return;
        }
        cardsChosen.push(cardsColors[cardId]);
        cardsChosenId.push(cardId);
        this.style.backgroundColor = cardsColors[cardId];
        this.textContent = cardsColors[cardId];

        if (cardsChosen.length === 2) {
            moves++; // Increment move counter only for a pair of guesses
            moveCounter.textContent = moves; // Update move counter display
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();
});
