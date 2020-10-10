import { MatchedWord, Tile } from "../Models/Tile";
import { countCharPoint, countWordPoint } from "./CountPoints";

const specials = (currentPoints: number, columnWord: MatchedWord, board: Array<Array<Tile>>) => {
  let points = currentPoints;
  for (let i = 0; i < columnWord.word.length; i++) {
    points = countWordPoint(currentPoints, board[columnWord.row + i][columnWord.column])
  }

  return points
}

const columnPoints = (matchedWord: MatchedWord, board: Array<Array<Tile>>): number => {
  let points = 0;
  for (let i = 0; i < matchedWord.word.length; i++) {
    points += countCharPoint(board[matchedWord.row + i][matchedWord.column], matchedWord.word[i])
  }

  return specials(points, matchedWord, board);
}

/**
 * Will find words that are not yet final in columns
 * @param board The board
 */
const findColumnWords = (board: Array<Array<Tile>>): Array<MatchedWord> => {
  const wordsFound: Array<MatchedWord> = []

  for (let column = 0; column < board.length; column++) {
    const matchedWord: MatchedWord = {
      word: '', points: 0, direction: 'column', column, row: 0
    };

    let startOfWord = -1;
    for (let row = 0; row < board.length; row++) {
      if (board[row][column].char !== '' && startOfWord === -1) {
        startOfWord = row
      } else if (board[row][column].char === '') {
        startOfWord = -1
      }

      if (board[row][column].char !== '' && !board[row][column].final) {
        row = startOfWord
        matchedWord.row = startOfWord;
        while (row < board.length) {
          if (board[row][column].char === '') {
            break;
          }

          matchedWord.word += board[row][column].char;
          row++;
        }
        break;
      }
    }
    if (matchedWord.word !== '' && matchedWord.word.length > 1) {
      wordsFound.push(matchedWord)
    }
  }

  return wordsFound
}

const countColumnPoints = (board: Array<Array<Tile>>): number => {
  const wordsFound: Array<MatchedWord> = findColumnWords(board)

  return wordsFound.reduce((previous, current) => {
    return previous + columnPoints(current, board)
  }, 0);
}

export {
  countColumnPoints,
  findColumnWords
}