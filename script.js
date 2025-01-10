document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // Array of card objects
    const cardArray = [
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card5', img: 'images/success.png' },
        { name: 'card5', img: 'images/success.png' }
    ];

    // Shuffle cards randomly
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    // Create the game board
    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        cardArray.forEach((_, index) => {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', index);
            card.setAttribute('width', '240px'); // Set card width
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    // Flip a card
    function flipCard() {
        const cardId = this.getAttribute('data-id');
        
        // Prevent double-click on the same card
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);

            // Check for a match when two cards are chosen
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    // Check if two selected cards match
    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const [firstCardId, secondCardId] = cardsChosenId;

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            // Hide matching cards
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';

            // Remove event listeners
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);

            cardsWon.push(cardsChosen);
        } else {
            // Reset unmatched cards
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        // Reset selections
        cardsChosen = [];
        cardsChosenId = [];

        // Check for game completion
        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found all the matches!');
        }
    }

    // Start the game when the start button is clicked
    startButton.addEventListener('click', createBoard);
});
