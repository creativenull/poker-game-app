export interface PlayingCard {
  card: DeckCard
  suit: DeckSuit
  highlight?: boolean
}

interface DeckCard {
  name: CardName
  rank: CardRank
}

interface DeckSuit {
  name: CardSuit
  icon: CardIcon
}

export enum CardName {
  Ace   = 'A',
  Two   = '2',
  Three = '3',
  Four  = '4',
  Five  = '5',
  Six   = '6',
  Seven = '7',
  Eight = '8',
  Nine  = '9',
  Ten   = '10',
  Jack  = 'J',
  Queen = 'Q',
  King  = 'K',
}

export enum CardRank {
  Two = 2,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace,
}

export enum CardSuit {
  Hearts   = 'Hearts',
  Diamonds = 'Diamonds',
  Spades   = 'Spades',
  Clubs    = 'Clubs',
}

export enum CardIcon {
  Hearts   = '\u2665',
  Spades   = '\u2660',
  Diamonds = '\u2666',
  Clubs    = '\u2663',
}

export type PlayingCards = PlayingCard[]

export default class Deck {
  /**
   * Stringify playing cards to a string array
   *
   * @param {PlayingCards} playingCards
   *
   * @return {string[]}
   */
  public static stringify(playingCards: PlayingCards): string[] {
    return playingCards.map((el: PlayingCard) => {
      const card = this.stringifyCard(el.card)
      const suit = this.stringifySuit(el.suit)
      return card + suit
    })
  }

  /**
   * Parse an array of 2-char string to return array of playing card
   *
   * @param {string[]} cards
   *
   * @return {PlayingCards}
   */
  public static parse(cards: string[]): PlayingCards {
    return cards.map((el: string): PlayingCard => {
      let cardChar: string = ''
      let suitChar: string = ''
      if (el.length > 2) {
        // Parse for '10'
        cardChar = (parseInt(el, 10)).toString()
        suitChar = el[2]
      } else {
        // else normal spliting
        [cardChar, suitChar] = [el[0], el[1]]
      }
      // return card type
      return {
        card: this.parseCard(cardChar),
        suit: this.parseSuit(suitChar),
      }
    })
  }

  /**
   * Stringify card type to string
   *
   * @param {DeckCard} card
   *
   * @return {string}
   */
  private static stringifyCard(card: DeckCard): string {
    switch (card.name) {
      case CardName.Two:
        return '2'
      case CardName.Three:
        return '3'
      case CardName.Four:
        return '4'
      case CardName.Five:
        return '5'
      case CardName.Six:
        return '6'
      case CardName.Seven:
        return '7'
      case CardName.Eight:
        return '8'
      case CardName.Nine:
        return '9'
      case CardName.Ten:
        return '10'
      case CardName.Jack:
        return 'J'
      case CardName.Queen:
        return 'Q'
      case CardName.King:
        return 'K'
      case CardName.Ace:
        return 'A'
      default:
        throw new Error('Stringify Card: Invalid card object')
    }
  }

  /**
   * Stringify suit type to string
   *
   * @param {DeckSuit} suit
   *
   * @return {string}
   */
  private static stringifySuit(suit: DeckSuit): string {
    switch (suit.name) {
      case CardSuit.Hearts:
        return 'H'
      case CardSuit.Diamonds:
        return 'D'
      case CardSuit.Clubs:
        return 'C'
      case CardSuit.Spades:
        return 'S'
      default:
        throw new Error('Stringify Suit: Invalid suit object')
    }
  }

  /**
   * Parse a char and return deck suit type
   *
   * @param {string} char
   *
   * @return {DeckSuit}
   */
  private static parseSuit(char: string): DeckSuit {
    const suitChar = char.toUpperCase()
    switch (suitChar) {
      case 'H':
        return {
          name: CardSuit.Hearts,
          icon: CardIcon.Hearts,
        }
      case 'D':
        return {
          name: CardSuit.Diamonds,
          icon: CardIcon.Diamonds,
        }
      case 'C':
        return {
          name: CardSuit.Clubs,
          icon: CardIcon.Clubs,
        }
      case 'S':
        return {
          name: CardSuit.Spades,
          icon: CardIcon.Spades,
        }
      default:
        throw new Error('Parse Suit: Invalid char')
    }
  }

  /**
   * Parse a char and return deck card type
   *
   * @param {string} char
   *
   * @return {DeckCard}
   */
  private static parseCard(char: string): DeckCard {
    const cardChar = char.toUpperCase()
    switch (cardChar) {
      case '2':
        return {
          name: CardName.Two,
          rank: CardRank.Two,
        }
      case '3':
        return {
          name: CardName.Three,
          rank: CardRank.Three,
        }
      case '4':
        return {
          name: CardName.Four,
          rank: CardRank.Four,
        }
      case '5':
        return {
          name: CardName.Five,
          rank: CardRank.Five,
        }
      case '6':
        return {
          name: CardName.Six,
          rank: CardRank.Six,
        }
      case '7':
        return {
          name: CardName.Seven,
          rank: CardRank.Seven,
        }
      case '8':
        return {
          name: CardName.Eight,
          rank: CardRank.Eight,
        }
      case '9':
        return {
          name: CardName.Nine,
          rank: CardRank.Nine,
        }
      case '10':
        return {
          name: CardName.Ten,
          rank: CardRank.Ten,
        }
      case 'J':
        return {
          name: CardName.Jack,
          rank: CardRank.Jack,
        }
      case 'Q':
        return {
          name: CardName.Queen,
          rank: CardRank.Queen,
        }
      case 'K':
        return {
          name: CardName.King,
          rank: CardRank.King,
        }
      case 'A':
        return {
          name: CardName.Ace,
          rank: CardRank.Ace,
        }
      default:
        throw new Error(`Parse Card: Invalid char`)
    }
  }

  protected deck: PlayingCards = []

  constructor() {

    Object.keys(CardName).forEach((cardKey: string) => {

      Object.keys(CardSuit).forEach((suitKey: string) => {

        this.deck.push({
          card: {
            // @ts-ignore
            name: CardName[cardKey as CardName],
            // @ts-ignore
            rank: CardRank[cardKey as CardRank],
          },
          suit: {
            // @ts-ignore
            name: CardSuit[suitKey as CardSuit],
            // @ts-ignore
            icon: CardIcon[suitKey as CardIcon],
          },
        })

      })

    })

  }

  /**
   * Shuffles the deck of cards. Use a Fisher-Yates shuffle algorithm
   *
   * @return {void}
   */
  public shuffle(): void {
    let index = -1
    const length = this.deck.length
    const lastIndex = length - 1

    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
      const value = this.deck[rand]
      this.deck[rand] = this.deck[index]
      this.deck[index] = value
    }

  }

  /**
   * Get cards from the top of the deck stack
   *
   * @param {number} length Number of cards to get
   *
   * @return {PlayingCards} Multiple or single playing card
   */
  public getCards(length: number): PlayingCards {
    if (length > 1 && length < (this.deck.length - length)) {
      // Get the cards and remove from deck
      return this.deck.splice(0, length)
    } else if (length === 1) {
      // Get just a single card
      const single = this.deck[0]
      this.deck.shift()
      return [single]
    } else {
      // Otherwise, return nothing
      throw new Error('Get Cards: Length must be defined')
    }
  }
}
