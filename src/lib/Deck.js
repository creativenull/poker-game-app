import shuffle from 'lodash/shuffle'

/**
 * The base playing card deck class
 */
export default class Deck {
  // Lowest to highest order
  static get CARDS () {
    return ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  }

  // Spades, Clubs, Hearts, Diamonds
  static get SUITS () {
    return [
      {
        value: 'S',
        color: 'black',
        utf: '\u2660'
      },
      {
        value: 'H',
        color: 'red',
        utf: '\u2665'
      },
      {
        value: 'D',
        color: 'red',
        utf: '\u2666'
      },
      {
        value: 'C',
        color: 'black',
        utf: '\u2663'
      }
    ]
  }

  static get SUITS_COLOR () {
    return ['black', 'red', 'red', 'black']
  }

  static get SUITS_UTF () {
    return ['\u2660', '\u2665', '\u2666', '\u2663']
  }

  // Blank Card for display only
  static get BLANK_CARD_UTF () {
    return '\u2605'
  }

  /**
   * Generate a new deck
   *
   * @param {boolean} preShuffle Shuffle the deck on initialization, default: true
   */
  constructor (preShuffle = true) {
    this._deck = []
    this._id = 0

    // Fill the deck
    for (let j = 0; j < Deck.SUITS.length; j++) {
      for (let i = 0; i < Deck.CARDS.length; i++) {
        this._deck.push({
          id: this._id++,
          value: Deck.CARDS[i],
          rank: i + 1,
          suit: {
            ...Deck.SUITS[j]
          }
        })
      }
    }

    // Shuffle by default
    if (preShuffle) {
      this._deck = shuffle(this._deck)
    }
  }

  /**
   * Sort the cards
   *
   * @param {object[]} cards Shuffled deck
   *
   * @returns Sorted deck
   */
  sort (cards) {
    return cards.sort((a, b) => b.rank - a.rank)
  }

  /**
   * Get a set amount of cards from the deck and remove them from the deck
   *
   * @param {number} amount Number of cards to return
   *
   * @returns
   */
  getCards (amount) {
    if (amount >= 1 && amount < (this._deck.length - amount)) {
      const removedCards = []
      for (let i = 0; i < amount; i++) {
        removedCards.push(this._deck.shift())
      }
      return removedCards
    } else {
      return []
    }
  }

  /**
   * Stringify an array of card objects in the format: {id}#{card}{suit}
   * Eg. ['23#AS', '4#3D', ...]
   *
   * @param {object[]} cards Array of card objects
   *
   * @returns Seralized card objects
   */
  static stringify (cards) {
    return cards.map(card => `${card.id}#${card.value}${card.suit.value}`)
  }

  /**
   * Parse an array of serialized cards
   *
   * @param {object[]} cards Seralized card array
   *
   * @returns Parsed card object array
   */
  static parse (cards) {
    return cards.map(c => {
      // Get the card and id by spliting string
      // Assuming the string format: '{id}#{card}{suit}'
      const [id, card] = c.split('#')
      const value = card.length === 3 ? '10' : card[0] // with 10 we get string of length 3
      const rank = Deck.CARDS.indexOf(value) + 1
      const suitValue = card.length === 3 ? card[2] : card[1]
      const suit = Deck.SUITS.find((suit) => suit.value === suitValue)

      return {
        id: parseInt(id),
        value,
        rank,
        suit
      }
    })
  }

  /**
   * Return the word equivalent of the card suit
   *
   * @param {object} playingCard
   *
   * @returns
   */
  static getSuitText (playingCard) {
    if (playingCard.card) {
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
   * @param {object} playingCard
   *
   * @returns
   */
  static getCardText (playingCard) {
    if (playingCard.card) {
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
