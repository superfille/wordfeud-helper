import { MatchedWord, Tile } from "../Models/Tile";
import { countWordPoint, countCharPoint } from './CountPoints';

const specials = (currentPoints: number, rowWord: MatchedWord, board: Array<Array<Tile>>) => {
  let points = currentPoints;
  for (let i = 0; i < rowWord.word.length; i++) {
    points = countWordPoint(currentPoints, board[rowWord.row][rowWord.column + i])
  }

  return points
}

const rowPoints = (rowWord: MatchedWord, board: Array<Array<Tile>>): number => {
  let points = 0;
  for (let i = 0; i < rowWord.word.length; i++) {
    points += countCharPoint(board[rowWord.row][rowWord.column + i], rowWord.word[i])
  }

  return specials(points, rowWord, board)
}

const countRowPoints = (board: Array<Array<Tile>>) => {
  const wordsFound: Array<MatchedWord> = []
  for (let row = 0; row < board.length; row++) {
    const matchedWord: MatchedWord = {
      word: '', points: 0, direction: 'row', row, column: 0
    };

    let startOfWord = -1;
    for (let column = 0; column < board.length; column++) {
      if (board[row][column].char !== '' && startOfWord === -1) {
        startOfWord = column
      } else if (board[row][column].char === '') {
        startOfWord = -1
      }

      if (board[row][column].char !== '' && !board[row][column].final) {
        column = startOfWord
        matchedWord.column = startOfWord;
        while (column < board.length) {
          if (board[row][column].char === '') {
            break;
          }

          matchedWord.word += board[row][column].char;
          column++;
        }
        break;
      }
    }
    if (matchedWord.word !== '' && matchedWord.word.length > 1) {
      wordsFound.push(matchedWord)
    }
  }

  return wordsFound.reduce((previous, current) => {
    return previous + rowPoints(current, board)
  }, 0)
}

export {
  countRowPoints
}