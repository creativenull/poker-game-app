import Deck from './Deck'
import Poker, { HandRanking } from './Poker'

/* Mock poker data */
const poker = new Poker()

const royalFlushPlayer = {
  id: 'player',
  hand: Deck.parse(['c_87#AS', 'c_12#KS', 'c_33#QS', 'c_88#JS', 'c_90#10S'])
}

const straightFlushPlayer = {
  id: 'player2',
  hand: Deck.parse(['c_87#KD', 'c_12#QD', 'c_33#JD', 'c_88#10D', 'c_90#9D'])
}

const fourKindPlayer = {
  id: 'player3',
  hand: Deck.parse(['c_87#10H', 'c_12#7D', 'c_33#10H', 'c_88#10H', 'c_90#10H'])
}

const fullHousePlayer = {
  id: 'player4',
  hand: Deck.parse(['c_87#7D', 'c_12#7S', 'c_33#9C', 'c_88#9S', 'c_90#9H'])
}

const flushPlayer = {
  id: 'player5',
  hand: Deck.parse(['c_87#2H', 'c_12#4H', 'c_33#9H', 'c_88#KH', 'c_90#10H'])
}

const straightPlayer = {
  id: 'player6',
  hand: Deck.parse(['c_87#3H', 'c_12#5D', 'c_33#4H', 'c_88#6C', 'c_90#7H'])
}

const threeKindPlayer = {
  id: 'player7',
  hand: Deck.parse(['c_87#KH', 'c_12#10S', 'c_33#KS', 'c_88#KD', 'c_90#5C'])
}

const twoPlayer = {
  id: 'player8',
  hand: Deck.parse(['c_87#KH', 'c_12#AS', 'c_33#AD', 'c_88#8H', 'c_90#8C'])
}

const onePlayer = {
  id: 'player9',
  hand: Deck.parse(['c_87#8H', 'c_12#8H', 'c_33#2S', 'c_88#3H', 'c_90#9C'])
}

const highPlayer = {
  id: 'player10',
  hand: Deck.parse(['c_87#AS', 'c_12#8D', 'c_33#9D', 'c_88#3C', 'c_90#2S'])
}

const highPlayer2 = {
  id: 'player11',
  hand: Deck.parse(['c_87#KH', 'c_12#7D', 'c_33#QS', 'c_88#2D', 'c_90#3D'])
}

/* Test each case */
test('Royal Flush', () => {
  const winner = poker.winner([straightFlushPlayer, royalFlushPlayer])
  expect(winner[0].handRank).toEqual(HandRanking.ROYAL_FLUSH)
})

test('Straight Flush', () => {
  const winner = poker.winner([straightFlushPlayer, fourKindPlayer])
  expect(winner[0].handRank).toEqual(HandRanking.STRAIGHT_FLUSH)
})

test('Four of a Kind', () => {
  const winner = poker.winner([highPlayer, fourKindPlayer])
  expect(winner[0].handRank).toEqual(HandRanking.FOUR_OF_A_KIND)
})

test('Full House', () => {
  const winner = poker.winner([onePlayer, fullHousePlayer, twoPlayer])
  expect(winner[0].handRank).toEqual(HandRanking.FULL_HOUSE)
})

test('Flush', () => {
  const winner = poker.winner([highPlayer, twoPlayer, flushPlayer])
  expect(winner[0].handRank).toEqual(HandRanking.FLUSH)
})

test('Straight', () => {
  const winner = poker.winner([highPlayer, twoPlayer, straightPlayer])
  expect(winner[0].handRank).toEqual(HandRanking.STRAIGHT)
})

test('Three of a Kind', () => {
  const winner = poker.winner([twoPlayer, threeKindPlayer])
  expect(winner[0].handRank).toEqual(HandRanking.THREE_OF_A_KIND)
})

test('Two Pairs', () => {
  const winner = poker.winner([twoPlayer, highPlayer])
  expect(winner[0].handRank).toEqual(HandRanking.TWO_PAIR)
})

test('One Pair', () => {
  const winner = poker.winner([highPlayer, onePlayer])
  expect(winner[0].handRank).toEqual(HandRanking.PAIR)
})

test('High Card', () => {
  const winner = poker.winner([highPlayer, highPlayer2])
  expect(winner[0].handRank).toEqual(HandRanking.HIGH_CARD)
})
