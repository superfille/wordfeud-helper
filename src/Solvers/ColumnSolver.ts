import { MatchedWord, Tile } from "../Models/Tile";
// import englishWords from '../Words.json';
import { boardIsValid } from "../Confirmers/Confirmer";
import { matchedWordMatchesWord } from './SolverUtil';
import { countPoints } from "./CountPoints";

const englishWords = ['eo']
interface WordCharPositions {
  maxLength: number; // The max length of the word
  boardTilePositions: Array<number>; // Chars position in the board
  wordPositions: Array<number>; // Chars actual position in word
}

interface ColumnMatch {
  words: Array<string>;
  maxPos: WordCharPositions;
  combinedChars: string;
  board: Array<Array<Tile>>;
  row: number;
  column: number;
}

const findWordCharPositions = (board: Array<Array<Tile>>, start: number, charsLength: number, column: number): WordCharPositions => {
  let charsUsed = 0;
  let row = start;
  let boardTilePositions: Array<number> = []
  let wordPositions: Array<number> = []
  let index = 0;
  for (; row < board.length; row++, index++) {
    if (board[row][column].char !== '') {
      boardTilePositions.push(row)
      wordPositions.push(index)
      continue
    }
    charsUsed += 1

    if (charsUsed >= charsLength) {
      if (charsUsed > charsLength) {
        break
      }
      if (row + 1 < board.length && board[row + 1][column].char !== '') {
        continue
      }
      break
    }
  }

  return { maxLength: row - start, boardTilePositions, wordPositions };
}

const wordMatchesPositions = (word: string, maxPos: WordCharPositions, board: Array<Array<Tile>>, column: number) => {
  let atLeastOneBoardTileChar = false;
  let atLeastOneWordChar = false;
  const result = word.split('').every((char, index) => {
    const i = maxPos.wordPositions.indexOf(index)
    if (i >= 0) {
      if (char === board[maxPos.boardTilePositions[i]][column].char) {
        atLeastOneBoardTileChar = true;
        return true
      }
      return false
    }
    atLeastOneWordChar = true
    return true
  })

  return atLeastOneBoardTileChar && atLeastOneWordChar && result
}

const wordsThatMatchPositions = (payload: ColumnMatch): Array<MatchedWord> => {
  return payload.words.reduce((accumulated, currentWord) => {
    if (currentWord.length > payload.maxPos.maxLength) {
      return accumulated;
    }

    const wordMatchesPos = wordMatchesPositions(currentWord, payload.maxPos, payload.board, payload.column)
    const matchedWordMatches = matchedWordMatchesWord(payload.combinedChars, currentWord)
    if (wordMatchesPos && matchedWordMatches) {
       accumulated.push({
        word: currentWord,
        direction: 'column',
        row: payload.row,
        column: payload.column,
        points: 0,
      })
    }

    return accumulated
  }, [] as Array<MatchedWord>);
}

const solve = (chars: string, board: Array<Array<Tile>>, column: number) => {
  const result: Array<MatchedWord> = [];
  
  for (let row = 0; row < board.length; row++) {
    if (row > 0 && board[row - 1][column].char !== '') {
      // We start words when there is nothing to the left
      continue
    }

    const wordCharPositions: WordCharPositions = findWordCharPositions(board, row,  chars.length, column)
    if (wordCharPositions.wordPositions.length > 0) {
      const combinedChars = combineCharsWithTile(chars, board, wordCharPositions.boardTilePositions, column)
      const matches = wordsThatMatchPositions({
        words: englishWords as Array<string>,
        maxPos: wordCharPositions,
        combinedChars,
        board: board,
        row,
        column
      })
      result.push(...matches
        .filter(rowWord => wordIsValidInBoard(rowWord, board))
        .map(matchedWord => {
          return {
            ...matchedWord,
            points: countPointsHelper(matchedWord, board)
          }
        }))
    }
  }

  return result
}

const countPointsHelper = (columnWord: MatchedWord, board: Array<Array<Tile>>): number => {
  for (let i = 0; i < columnWord.word.length; i++) {
    if (board[columnWord.row + i][columnWord.column].final === false) {
      board[columnWord.row + i][columnWord.column].char = columnWord.word[i]
    }
  }

  let points = countPoints(board)

  for (let i = 0; i < columnWord.word.length; i++) {
    if (board[columnWord.row + i][columnWord.column].final === false) {
      board[columnWord.row + i][columnWord.column].char = ''
    }
  }
  return points
}

const combineCharsWithTile = (chars: string, board: Array<Array<Tile>>, rows: Array<number>, column: number): string => {
  return rows
    .map(row => board[row][column].char)
    .join('')
    .concat(chars)
}

const wordIsValidInBoard = (columnWord: MatchedWord, board: Array<Array<Tile>>) => {
  for (let i = 0; i < columnWord.word.length; i++) {
    if (board[columnWord.row + i][columnWord.column].final === false) {
      board[columnWord.row + i][columnWord.column].char = columnWord.word[i]
    }
  }

  const isValid = boardIsValid(board)

  for (let i = 0; i < columnWord.word.length; i++) {
    if (board[columnWord.row + i][columnWord.column].final === false) {
      board[columnWord.row + i][columnWord.column].char = ''
    }
  }
  return isValid
}

const solveColumns = (board: Array<Array<Tile>>, chars: string): Array<MatchedWord> => {
  const list: Array<MatchedWord> = []

  for (let column = 0; column < board.length; column++) {
    list.push(...solve(chars, board, column))
  }

  return list;
}


export {
  solveColumns
}