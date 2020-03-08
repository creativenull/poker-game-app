import Deck from './Deck'

test('Get 5 cards', () => {
  const deck = new Deck()
  const amount = 5
  const cards = deck.getCards(amount)

  expect(cards.length).toBe(amount)
})

test('Stringify 5 cards', () => {
  const deck = new Deck()
  const amount = 5
  const cards = deck.getCards(amount)
  const cardsStringify = Deck.stringify(cards)

  expect(Deck.stringify(cards)).toEqual(cardsStringify)
})

test('Parse 5 cards', () => {
  const deck = new Deck()
  const amount = 5
  const cards = deck.getCards(amount)
  const cardsStringify = Deck.stringify(cards)
  const cardsParse = Deck.parse(cardsStringify)

  expect(cards).toEqual(cardsParse)
})
