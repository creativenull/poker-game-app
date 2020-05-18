import shuffle from 'lodash/shuffle'
import uniqueId from 'lodash/uniqueId'

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
    return ['S', 'C', 'H', 'D']
  }

  static get SUITS_COLOR () {
    return ['black', 'black', 'red', 'red']
  }

  static get SUITS_UTF () {
    return ['\u2660', '\u2663', '\u2665', '\u2665']
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

    // Fill the deck
    for (let j = 0; j < Deck.SUITS.length; j++) {
      for (let i = 0; i < Deck.CARDS.length; i++) {
        this._deck.push({
          id: uniqueId('c_'),
          value: Deck.CARDS[i],
          rank: i + 1,
          suit: {
            color: Deck.SUITS_COLOR[j],
            value: Deck.SUITS[j],
            utf: Deck.SUITS_UTF[j]
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
      const cards = this._deck.splice(0, amount)
      return cards
    } else {
      return []
    }
  }

  /**
   * Stringify an array of card objects in the format: c_[id]#[card][suit]
   * Eg. ['c_23#AS', 'c_94#3D', ...]
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
      const [id, card] = c.split('#')
      const value = card.length === 3 ? '10' : card[0] // with 10 we get string of length 3
      const rank = Deck.CARDS.indexOf(value) + 1
      const suitValue = card.length === 3 ? card[2] : card[1]
      const suitColor = Deck.SUITS_COLOR[Deck.SUITS.indexOf(suitValue)]
      const utf = Deck.SUITS_UTF[Deck.SUITS.indexOf(suitValue)]

      return {
        id,
        value,
        rank,
        suit: {
          color: suitColor,
          value: suitValue,
          utf
        }
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
