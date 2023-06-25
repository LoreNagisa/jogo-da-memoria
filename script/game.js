let game = {

  lockMode: false,
  firstCard:null,
  secondCard:null,

  setCard: function(id){

    let card = this.cards.filter(card=>card.id===id)[0];

    if(card.flipped || this.lockMode){
      return false;
    }

    if (!this.firstCard){
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    }else{
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }

  },

  checkMatch: function(){
    if(!this.firstCard || !this.secondCard){
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
      this.firstCard = null;
      this.secondCard = null;
      this.lockMode = false;

    },

    unflipCards: function(){
      this.firstCard.flipped = false;
      this.secondCard.flipped = false;
      this.clearCards();
    },

    checkGameOver: function(){
     return this.cards.filter(card=>!card.flipped).length == 0;
    },


  cats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],

  cards: null,

  createCardsFromCats: function () {

    this.cards = [];

    this.cats.forEach((cat) => {
      this.cards.push(this.createPairFromCats(cat));
    })

    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    return this.cards;

  },

  //criando os pares para serem usados na função acima
  createPairFromCats: function (cat) {
    return [{
      id: this.createIdWithCat(cat),
      icon: cat,
      flipped: false,
    }, {
      id: this.createIdWithCat(cat),
      icon: cat,
      flipped: false,
    }]
  },

  //criando Id randômico para poder embaralhar as cartas
  createIdWithCat: function (cat) {
    return cat + parseInt(Math.random() * 1000);
  },

  //embaralhando as cartas
  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {

      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]

    }

  },
}
