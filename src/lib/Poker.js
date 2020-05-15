import Deck, { Cards, Suits } from './Deck'

export const HandRanking = {
  ROYAL_FLUSH: 9,
  STRAIGHT_FLUSH: 8,
  FOUR_OF_A_KIND: 7,
  FULL_HOUSE: 6,
  FLUSH: 5,
  STRAIGHT: 4,
  THREE_OF_A_KIND: 3,
  TWO_PAIR: 2,
  PAIR: 1,
  HIGH_CARD: 0,
  NONE: -1
}

/**
 * Poker class
 * Rankings from https://www.cardplayer.com/rules-of-poker/hand-rankings
 */
class Poker extends Deck {
  /**
   * Get new hands
   */
  getPlayerHand () {
    return this.getCards(5)
  }

  /**
   * Replace a card with a new one, return a new hand and the new card
   *
   * @param {Object} card
   * @param {Array} hand
   *
   * @returns
   */
  replace (card, hand) {
    const cardIndex = hand.findIndex(handCard => card.id === handCard.id)
    const [newCard] = this.getCards(1)
    const newHand = hand.slice(0)
    newHand.splice(cardIndex, 1, newCard)
    return [newHand, newCard]
  }

  /**
   * Returns the winner from the array
   *
   * @param {Array} players List of players in the session
   *
   * @returns An array of winning hand, starting from the highest rank
   */
  winner (players) {
    const list = players.map(player => {
      const { id } = player
      const hand = this.sort(player.hand)
      const pairs = this._getPairs(hand)

      const isS = this._isStraight(hand)
      const isF = this._isFlush(hand)
      const isSF = isS && isF
      const hasAce = this._hasAce(hand)
      const isFK = this._isFourOfAKind(pairs)
      const isFH = this._isFullHouse(pairs)
      const isTK = this._isThreeOfAKind(pairs)
      const is2P = this._isTwoPair(pairs)
      const is1P = this._isPair(pairs)

      if (isS || isF) {
        if (isSF) {
          if (hasAce) {
            // Royal Flush
            return {
              id,
              handRank: HandRanking.ROYAL_FLUSH,
              name: 'Royal Flush'
            }
          } else {
            // Straight Flush
            return {
              id,
              handRank: HandRanking.STRAIGHT_FLUSH,
              name: 'Straight Flush'
            }
          }
        } else if (isS) {
          // Straight
          return {
            id,
            handRank: HandRanking.STRAIGHT,
            name: 'Straight'
          }
        } else if (isF) {
          // Flush
          return {
            id,
            handRank: HandRanking.FLUSH,
            name: 'Flush'
          }
        }
      } else if (isFK || isFH || isTK || is2P || is1P) {
        if (isFK) {
          // Four of a Kind
          return {
            id,
            handRank: HandRanking.FOUR_OF_A_KIND,
            name: 'Four-of-a-Kind'
          }
        } else if (isFH) {
          // Full House
          return {
            id,
            handRank: HandRanking.FULL_HOUSE,
            name: 'Full House'
          }
        } else if (isTK) {
          // Three of a Kind
          return {
            id,
            handRank: HandRanking.THREE_OF_A_KIND,
            name: 'Three-of-a-Kind'
          }
        } else if (is2P) {
          // Two Pair
          return {
            id,
            handRank: HandRanking.TWO_PAIR,
            name: 'Two Pair'
          }
        } else if (is1P) {
          // One Pair
          return {
            id,
            handRank: HandRanking.PAIR,
            name: 'Pair'
          }
        } else {
          // None
          return {
            id,
            handRank: HandRanking.NONE,
            name: 'None'
          }
        }
      } else {
        // High Card
        return {
          id,
          handRank: HandRanking.HIGH_CARD,
          cardRank: hand[0].rank,
          name: 'High Card'
        }
      }
    })

    return list.sort((a, b) => {
      if (a.handRank === HandRanking.HIGH_CARD && b.handRank === HandRanking.HIGH_CARD) {
        return b.cardRank - a.cardRank
      } else {
        return b.handRank - a.handRank
      }
    })
  }

  /**
   * Checks if the hand and an ace card
   *
   * @param {Array} hand
   *
   * @returns {boolean}
   */
  _hasAce (hand) {
    for (const card of hand) {
      if (card.value === 'A') {
        return true
      }
    }

    return false
  }

  /**
   * Checks of the hand is a sequence of card ranks
   *
   * @param {Array} hand
   *
   * @returns {boolean}
   */
  _isStraight (hand) {
    const first = 0
    const last = hand.length - 1
    const diff = hand[first].rank - hand[last].rank
    return diff === 4
  }

  /**
   * Checks if the hand has the same card suit
   *
   * @param hand Array of card object
   *
   * @returns {boolean}
   */
  _isFlush (hand) {
    for (const value of Suits) {
      const count = hand.reduce((acc, card) => acc + (card.suit.value === value), 0)

      if (count === 5) {
        return true
      } else {
        continue
      }
    }

    return false
  }

  /**
   * Generates a two item array of pairs
   *
   * @param {object[]} hand Array of card object
   *
   * @returns
   */
  _getPairs (hand) {
    const pair = []

    for (const value of Cards) {
      const count = hand.reduce((acc, card) => acc + (card.value === value), 0)

      if (count === 4) {
        pair.push(count)
        break
      } else if (count === 3) {
        pair.push(count)
      } else if (count === 2) {
        pair.push(count)
        if (pair.length === 2) {
          break
        }
      }
    }

    // Make length 2
    if (pair.length === 1) {
      pair.push(0)
    }

    return pair
  }

  /**
   * Checks if the pair is four of a kind
   *
   * @param {number[]} pairs Array of two number item
   *
   * @returns {boolean}
   */
  _isFourOfAKind (pairs) {
    return pairs.length === 2 && pairs[0] === 4
  }

  /**
   * Checks if the pair is a full house
   *
   * @param {number[]} pairs Array of two number item
   *
   * @returns {boolean}
   */
  _isFullHouse (pairs) {
    return pairs.length === 2 && (pairs[0] + pairs[1]) === 5
  }

  /**
   * Checks if the pair is three of a kind
   *
   * @param {number[]} pairs Array of two number item
   *
   * @returns {boolean}
   */
  _isThreeOfAKind (pairs) {
    return pairs.length === 2 && (pairs[0] === 3)
  }

  /**
   * Checks if the pair is a two pair
   *
   * @param {number[]} pairs Array of two number item
   *
   * @returns {boolean}
   */
  _isTwoPair (pairs) {
    return pairs.length === 2 && pairs[0] === 2 && pairs[1] === 2
  }

  /**
   * Checks if the pair is a pair
   *
   * @param {number[]} pairs Array of two number item
   *
   * @returns {boolean}
   */
  _isPair (pairs) {
    return pairs.length === 2 && (pairs[0] === 2)
  }
}

export default Poker
