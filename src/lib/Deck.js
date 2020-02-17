// Lowest to highest order
const Cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

// Spades, Clubs, Hearts, Diamonds
const Suits = ['S', 'C', 'H', 'D']
const SuitsColor = ['black', 'black', 'red', 'red']
const SuitsUTF = ['\u2660', '\u2663', '\u2665', '\u2665']

// Empty card
const EmptyCardType = {
  card: '',
  rank: -1,
  suit: {
    value: '',
    utf: ''
  }
}

export default class Deck {
  /**
   * Generate a deck and shuffle by default, if preShuffle is false then just return a clean deck
   *
   * @param {Boolean} preShuffle
   */
  constructor (preShuffle = true) {
    this._deck = []

    // Fill the deck
    for (let j = 0; j < Suits.length; j++) {
      for (let i = 0; i < Cards.length; i++) {
        this._deck.push({
          card: Cards[i],
          rank: i,
          color: SuitsColor[j],
          suit: {
            value: Suits[j],
            utf: SuitsUTF[j]
          }
        })
      }
    }

    // Shuffle by default
    if (preShuffle) {
      this.shuffle()
    }
  }

  /**
   * Shuffles the deck of cards. Use a Fisher-Yates shuffle algorithm
   * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
   *
   * @return {Array}
   */
  shuffle () {
    const shuffledDeck = this._deck.slice()

    for (let i = shuffledDeck.length; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]
    }

    this._deck = shuffledDeck
  }

  getCards (length) {
    if (length > 1 && length < (this._deck.length - length)) {
      // Get the cards and remove from deck
      return this._deck.splice(0, length)
    } else if (length === 1) {
      // Get just a single card
      const single = this._deck[0]
      this._deck.shift()
      return [single]
    } else {
      // Otherwise, return nothing
      throw new Error('Get Cards: Length must be defined')
    }
  }

  /**
   * Return the word equivalent of the card suit
   *
   * @param {EmptyCardType} playingCard
   *
   * @return {String}
   */
  static getSuitText (playingCard = EmptyCardType) {
    if (JSON.stringify(playingCard) !== JSON.stringify(EmptyCardType)) {
      switch (playingCard.card) {
        case 'S':
          return 'Spades'
        case 'C':
          return 'Clubs'
        case 'H':
          return 'Hearts'
        case 'D':
          return 'Diamonds'
        default:
          throw new Error('GetCardText: Invalid card')
      }
    } else {
      throw new TypeError('GetCardText: Unknown card type')
    }
  }

  /**
   * Return the word equivalent of the card value
   *
   * @param {EmptyCardType} playingCard
   *
   * @return {String}
   */
  static getCardText (playingCard = EmptyCardType) {
    if (JSON.stringify(playingCard) !== JSON.stringify(EmptyCardType)) {
      switch (playingCard.card) {
        case '2':
          return 'Two'
        case '3':
          return 'Three'
        case '4':
          return 'Four'
        case '5':
          return 'Five'
        case '6':
          return 'Six'
        case '7':
          return 'Seven'
        case '8':
          return 'Eight'
        case '9':
          return 'Nine'
        case '10':
          return 'Ten'
        case 'J':
          return 'Jack'
        case 'Q':
          return 'Queen'
        case 'K':
          return 'King'
        case 'A':
          return 'Ace'
        default:
          throw new Error('GetCardText: Invalid card')
      }
    } else {
      throw new TypeError('GetCardText: Unknown card type')
    }
  }
}
