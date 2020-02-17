import Deck, {
  PlayingCard,
  PlayingCards,
  CardSuit,
  CardName,
} from '@/lib/Deck'
import { copyArray } from '@/utils/copy'

export const enum PokerWin {
  None = 0,
  HighCard,
  OnePair,
  TwoPairs,
  ThreeOfAKind,
  Straight,
  Flush,
  FullHouse,
  FourOfAKind,
  StraightFlush,
  RoyalFlush,
}

export interface Hand {
  id: number
  cards: PlayingCards
  winningHand: PokerWin
  highestRank: number
}

interface HighCardResult {
  winningHand: PokerWin
  highestRank: number
}

export default class Poker extends Deck {
  private hands: PlayingCards[] = []
  private highestRank: number = 0

  constructor(hands: PlayingCards[]) {
    super()
    // Create a copy of array
    const copyHand = copyArray<PlayingCards[]>(hands)
    // Sort playing cards by rank in acending order
    this.hands = copyHand.map((hand: PlayingCards) => {
      return hand.sort((a, b) => a.card.rank - b.card.rank)
    })
  }

  /**
   * Return winner as the first index
   *
   * @return {Hand[]}
   */
  public winner(): Hand {
    const winners: Hand[] = []
    let i = 0
    this.highestRank = 0

    // Iterate over all hands and get winner for each
    for (const hand of this.hands) {
      // Compute for sequences and pairs
      const kindCount = this.setupKindAndPairChecker(hand)
      // Straight flush or royal flush
      if (this.isStraight(hand) && this.isFlush(hand)) {
        if (this.hasAce(hand)) {
          winners.push({
            id: i,
            cards: hand,
            winningHand: PokerWin.RoyalFlush,
            highestRank: 0,
          })
          i++
          continue
        } else {
          winners.push({
            id: i,
            cards: hand,
            winningHand: PokerWin.StraightFlush,
            highestRank: hand[4].card.rank,
          })
          i++
          continue
        }
      } else if (this.isKindOrPair(kindCount) === PokerWin.FourOfAKind) {
        winners.push({
          id: i,
          cards: hand,
          winningHand: PokerWin.FourOfAKind,
          highestRank: this.highestRank,
        })
        i++
        continue
      } else if (this.isKindOrPair(kindCount) === PokerWin.FullHouse) {
        winners.push({
          id: i,
          cards: hand,
          winningHand: PokerWin.FullHouse,
          highestRank: this.highestRank,
        })
        i++
        continue
      } else if (!this.isStraight(hand) && this.isFlush(hand)) {
        winners.push({
          id: i,
          cards: hand,
          winningHand: PokerWin.Flush,
          highestRank: hand[4].card.rank,
        })
        i++
        continue
      } else if (this.isStraight(hand) && !this.isFlush(hand)) {
        winners.push({
          id: i,
          cards: hand,
          winningHand: PokerWin.Straight,
          highestRank: hand[4].card.rank,
        })
        i++
        continue
      } else if (this.isKindOrPair(kindCount) === PokerWin.ThreeOfAKind) {
        winners.push({
          id: i,
          cards: hand,
          winningHand: PokerWin.ThreeOfAKind,
          highestRank: this.highestRank,
        })
        i++
        continue
      } else if (this.isKindOrPair(kindCount) === PokerWin.TwoPairs) {
        winners.push({
          id: i,
          cards: hand,
          winningHand: PokerWin.TwoPairs,
          highestRank: this.highestRank,
        })
        i++
        continue
      } else if (this.isKindOrPair(kindCount) === PokerWin.OnePair) {
        winners.push({
          id: i,
          cards: hand,
          winningHand: PokerWin.OnePair,
          highestRank: this.highestRank,
        })
        i++
        continue
      } else {
        // High card
        const highCard = this.highCard(hand)
        winners.push({
          id: i,
          cards: hand,
          ...highCard,
        })
        i++
      }

    }

    // Return only the first winner
    if (winners.length === 1) {
      return winners[0]
    }

    // return the winner while comparing when tied
    return winners.sort((a: Hand, b: Hand) => {
      return b.winningHand === a.winningHand ? (b.highestRank - a.highestRank) : (b.winningHand - a.winningHand)
    })[0]
  }

  /**
   * Check if a hand has a winning hand of 'Straight'
   *
   * @param {PlayingCards} hand An array of playing cards
   *
   * @return {boolean}
   */
  private isStraight(hand: PlayingCards): boolean {
    const isSequential = hand[4].card.rank - hand[3].card.rank === 1
      && hand[3].card.rank - hand[2].card.rank === 1
      && hand[2].card.rank - hand[1].card.rank === 1
      && hand[1].card.rank - hand[0].card.rank === 1
      && hand[4].card.rank - hand[0].card.rank === 4
    return isSequential
  }

  /**
   * Check if a hand has a winning hand of 'Flush'
   *
   * @param {PlayingCard} hand An array of playing cards
   *
   * @return {boolean}
   */
  private isFlush(hand: PlayingCards): boolean {
    const suitKeys = Object.keys(CardSuit)
    for (const suit of suitKeys) {
      const suitCount = hand.filter((pc: PlayingCard) => pc.suit.name === CardSuit[suit as CardSuit])
      if (suitCount.length === 5) {
        // It is flush when all cards are of the same suit
        return true
      }
    }
    return false
  }

  /**
   * Check if Ace card exists in hand
   *
   * @param {PlayingCards} hand An array of playing cards
   *
   * @return {boolean}
   */
  private hasAce(hand: PlayingCards): boolean {
    const isAce = hand.find((pc: PlayingCard) => pc.card.name === CardName.Ace)
    return isAce ? true : false
  }

  /**
   * Calculate the count of each card in hand, how many occurrence of a card is present in hand
   *
   * @param {PlayingCards} hand An array of playing cards
   *
   * @return {number[]}
   */
  private setupKindAndPairChecker(hand: PlayingCards): number[] {
    const kindCount: number[] = []
    const cardKeys = Object.keys(CardName)

    for (const card of cardKeys) {
      // @ts-ignore
      const cardCount = hand.filter((pc: PlayingCard) => pc.card.name === CardName[card as CardName])

      if (cardCount.length === 4) {
        // Four of a Kind
        kindCount.push(4)
        kindCount.push(0)
        this.highestRank = cardCount[0].card.rank
        break
      } else if (cardCount.length === 3) {
        // Full house, first part
        kindCount.push(3)
        this.highestRank = cardCount[0].card.rank
      } else if (cardCount.length === 2 && kindCount.length === 1 && kindCount[0] === 3) {
        // Full house, second part
        kindCount.push(2)
        break
      } else if (cardCount.length === 2 && kindCount.length === 0) {
        // Two Pairs, first part OR One Pair
        kindCount.push(2)
        this.highestRank = cardCount[0].card.rank
      } else if (cardCount.length === 2 && kindCount.length === 1 && kindCount[0] === 2) {
        // Two Pairs, second part
        kindCount.push(2)
        this.highestRank = this.highestRank > cardCount[0].card.rank ? this.highestRank : cardCount[0].card.rank
        break
      }

    }

    return kindCount
  }

  /**
   * Check if hand has four of a kind, three of a kind, full house, two pairs, one pair winning hand
   *
   * @param {number[]} kindCount
   *
   * @return {PokerWin}
   */
  private isKindOrPair(kindCount: number[]): PokerWin {
    if (kindCount[0] === 4) {
      // Four of a kind
      return PokerWin.FourOfAKind
    } else if (kindCount.find((el) => el === 3)) {

      // Check for Full house and three of a kind
      if (kindCount.find((el) => el === 2)) {
        return PokerWin.FullHouse
      } else {
        return PokerWin.ThreeOfAKind
      }

    } else if (kindCount[0] === 2 && kindCount[1] === 2) {
      return PokerWin.TwoPairs
    } else if (kindCount[0] === 2) {
      return PokerWin.OnePair
    }

    return PokerWin.None
  }

  /**
   * Get the highest ranked card in hand
   *
   * @param {PlayingCards} hand An array of playing cards
   *
   * @return {HighCardResult}
   */
  private highCard(hand: PlayingCards): HighCardResult {
    let sum = 0
    for (const pc of hand) {
      sum = pc.card.rank + sum
    }

    return {
      winningHand: PokerWin.HighCard,
      highestRank: sum,
    } as HighCardResult
  }
}
