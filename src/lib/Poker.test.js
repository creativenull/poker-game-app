import Deck from './Deck'
import Poker, { HandRanking } from './Poker'

const poker = new Poker()

const royalFlushPlayer = {
  id: 'player',
  hand: Deck.parse(['AS', 'KS', 'QS', 'JS', '10S'])
}

const straightFlushPlayer = {
  id: 'player2',
  hand: Deck.parse(['KD', 'QD', 'JD', '10D', '9D'])
}

const fourKindPlayer = {
  id: 'player3',
  hand: Deck.parse(['10H', '7D', '10H', '10H', '10H'])
}

const fullHousePlayer = {
  id: 'player4',
  hand: Deck.parse(['7D', '7S', '9C', '9S', '9H'])
}

const flushPlayer = {
  id: 'player5',
  hand: Deck.parse(['2H', '4H', '9H', 'KH', '10H'])
}

const straightPlayer = {
  id: 'player6',
  hand: Deck.parse(['3H', '5D', '4H', '6C', '7H'])
}

const threeKindPlayer = {
  id: 'player7',
  hand: Deck.parse(['KH', '10S', 'KS', 'KD', '5C'])
}

const twoPlayer = {
  id: 'player8',
  hand: Deck.parse(['KH', 'AS', 'AD', '8H', '8C'])
}

const onePlayer = {
  id: 'player9',
  hand: Deck.parse(['8H', '8H', '2S', '3H', '9C'])
}

const highPlayer = {
  id: 'player10',
  hand: Deck.parse(['AS', '8D', '9D', '3C', '2S'])
}

const highPlayer2 = {
  id: 'player11',
  hand: Deck.parse(['KH', '7D', 'QS', '2D', '3D'])
}

test('Royal Flush', () => {
  const winner = poker.winner([straightFlushPlayer, royalFlushPlayer])
  expect(winner.handRank).toEqual(HandRanking.ROYAL_FLUSH)
})

test('Straight Flush', () => {
  const winner = poker.winner([straightFlushPlayer, fourKindPlayer])
  expect(winner.handRank).toEqual(HandRanking.STRAIGHT_FLUSH)
})

test('Four of a Kind', () => {
  const winner = poker.winner([highPlayer, fourKindPlayer])
  expect(winner.handRank).toEqual(HandRanking.FOUR_OF_A_KIND)
})

test('Full House', () => {
  const winner = poker.winner([onePlayer, fullHousePlayer, twoPlayer])
  expect(winner.handRank).toEqual(HandRanking.FULL_HOUSE)
})

test('Flush', () => {
  const winner = poker.winner([highPlayer, twoPlayer, flushPlayer])
  expect(winner.handRank).toEqual(HandRanking.FLUSH)
})

test('Straight', () => {
  const winner = poker.winner([highPlayer, twoPlayer, straightPlayer])
  expect(winner.handRank).toEqual(HandRanking.STRAIGHT)
})

test('Three of a Kind', () => {
  const winner = poker.winner([twoPlayer, threeKindPlayer])
  expect(winner.handRank).toEqual(HandRanking.THREE_OF_A_KIND)
})

test('Two Pairs', () => {
  const winner = poker.winner([twoPlayer, highPlayer])
  expect(winner.handRank).toEqual(HandRanking.TWO_PAIR)
})

test('One Pair', () => {
  const winner = poker.winner([highPlayer, onePlayer])
  expect(winner.handRank).toEqual(HandRanking.PAIR)
})

test('High Card', () => {
  const winner = poker.winner([highPlayer, highPlayer2])
  expect(winner.handRank).toEqual(HandRanking.HIGH_CARD)
})
