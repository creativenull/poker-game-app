// Lowest to highest order
export const Cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

// Spades, Clubs, Hearts, Diamonds
export const Suits = ['S', 'C', 'H', 'D']
export const SuitsColor = ['black', 'black', 'red', 'red']
export const SuitsUTF = ['\u2660', '\u2663', '\u2665', '\u2665']
export const CardBlankUTF = '\u2605'

// Empty card
const EmptyCardType = {
  value: '',
  rank: -1,
  suit: {
    color: '',
    utf: '',
    value: ''
  }
}

/**
 * The base playing card deck class
 */
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
          value: Cards[i],
          rank: i + 1,
          suit: {
            color: SuitsColor[j],
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

  sort (cards = []) {
    return cards.sort((a, b) => b.rank - a.rank)
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

  /**
   * Get a set amount of cards from the deck and remove them from the deck
   *
   * @param {Number} amount - number of cards to return
   * @param {Object} opts - initial options to attach to the object
   *
   * @returns {Array}
   */
  getCards (amount = 0, opts = {}) {
    if (amount >= 1 && amount < (this._deck.length - amount)) {
      const cards = this._deck.splice(0, amount)
      if (opts) {
        return cards.map((card) => ({ ...card, ...opts }))
      } else {
        return cards
      }
    } else {
      return []
    }
  }

  /**
   * Stringify an array of card objects
   *
   * @param {Array} cards
   *
   * @returns {Array}
   */
  static stringify (cards = []) {
    return cards.map((card) => `${card.value}${card.suit.value}`)
  }

  /**
   * Parse an array of serialized cards
   *
   * @param {Array} cards
   *
   * @returns {Array}
   */
  static parse (cards = []) {
    return cards.map((card) => {
      const cardValue = card.length === 3 ? '10' : card[0] // with 10 we get string of length 3
      const cardRank = Cards.indexOf(cardValue) + 1
      const suitValue = card.length === 3 ? card[2] : card[1]
      const suitColor = SuitsColor[Suits.indexOf(suitValue)]
      const suitUTF = SuitsUTF[Suits.indexOf(suitValue)]

      return {
        value: cardValue,
        rank: cardRank,
        suit: {
          color: suitColor,
          value: suitValue,
          utf: suitUTF
        }
      }
    })
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
          return ''
      }
    } else {
      return ''
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
          return ''
      }
    } else {
      return ''
    }
  }
}
