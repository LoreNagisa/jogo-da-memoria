const FRONT = "cardFront";
const BACK = "cardBack";
const CARD = "card";
const ICON = "icon";




startGame();

// O jogo começa com as cartas embaralhadas.
function startGame() {
    initializeCards(game.createCardsFromCats());

}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard")
    gameBoard.innerHTML ='';
    game.cards.forEach(card => {

        let cardElemnt = document.createElement('div');
        cardElemnt.id = card.id;
        cardElemnt.classList.add(CARD);
        cardElemnt.dataset.icon = card.icon;

        createCardContent(card, cardElemnt);


        cardElemnt.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElemnt);

    })

}

function createCardContent(card, cardElemnt) {

    createCardFace(FRONT, card, cardElemnt);
    createCardFace(BACK, card, cardElemnt);

}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON)
        iconElement.src = "./image/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&#11088";
    }
    element.appendChild(cardElementFace);
}



//criando todas as cartas, a partir do array das imagens


function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                };
            } else {
                setTimeout(() => {

                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000)

            };
        }
    }

}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}