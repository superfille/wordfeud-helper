import { MatchedWord, SolveTile, Tile } from "../Models/Tile";
import { countAllWordSpecials, countCharPoint } from "./CountPoints";
import { getAllWordsThatMatchChars, wordCanMatchedWithTile } from "./SolverUtil";
import englishWords from '../Words.json';
import { boardIsValid } from "../Confirmers/Confirmer";

const getWordColumnRestrictions = (board: Array<Array<Tile>>, row: number, column: number) => {
  let length = 1;
  let start = 0;
  let end = 0;

  for (let index = row + 1; index < board.length; index++) {
    if (board[index][column].char !== '') {
      if (index - 1 === row) {
        // If the next tile from the start tile is not empty
        // we break
        return { length: 0, start, end };
      }

      length += (index - row) - 2
      end = (index - row) - 2
    }

    // End of board
    if (index + 1 === board.length) {
      length += (board.length - row) - 1
      end = (board.length - row) - 1
    }
  }


  for (let index = row - 1; index >= 0; index--) {
    if (board[index][column].char !== '') {
      if (index + 1 === row) {
        return { length: 0, start, end };
      }

      length += (row - index) - 2
      start = (row - index) - 2
    }

    if (index - 1 < 0) {
      length += row
      start = row
    }
  }

  return { length, start, end };
}

const combineCharsWithTile = (chars: string, board: Array<Array<Tile>>, rows: Array<number>, column: number): string => {
  return rows
    .map(row => board[row][column].char)
    .join()
    .concat(chars)
}

const wordsThatMatchTileColumn = (words: Array<string>, tile: SolveTile): Array<MatchedWord> => {
  return words.reduce((accumulated, currentWord) => {
    const index = wordCanMatchedWithTile(currentWord, tile);
    if (index >= 0) {
      accumulated.push({
        word: currentWord,
        column: tile.column,
        row: tile.row - index,
        points: 0,
        direction: 'column'
      })
    }
    return accumulated
  }, [] as Array<MatchedWord>);
}

const countPoints = (matchedWord: MatchedWord, board: Array<Array<Tile>>): MatchedWord => {
  let points = 0;
  for (let i = 0; i < matchedWord.word.length; i++) {
    points += countCharPoint(board[matchedWord.row + 1][matchedWord.column], matchedWord.word[i])
  }
  points = countAllWordSpecials(points, matchedWord, board)

  return { ...matchedWord, points }
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


const solveColumn = (board: Array<Array<Tile>>, chars: string, column: number): Array<MatchedWord> => {
  let solved: Array<MatchedWord> = []
  for (let row = 0; row < board.length; row++) {
    if (board[row][column].char !== '') {
      const sequence = getWordColumnRestrictions(board, row, column)
      if (sequence.length === 0) {
        continue;
      }

      const solveTile: SolveTile = {
        start: sequence.start,
        length: sequence.length,
        char: board[row][column].char,
        column,
        row
      }

      const wordsThatMatchTile = wordsThatMatchTileColumn(englishWords as Array<string> , solveTile)
      const combinedChars: string = combineCharsWithTile(chars, board, [row], column)
      const columnWords: Array<MatchedWord> = getAllWordsThatMatchChars(combinedChars, wordsThatMatchTile) 
      
      solved.push(...columnWords
        .filter(columnWord => wordIsValidInBoard(columnWord, board))
        .map(columnWord => countPoints(columnWord, board)))
    }
  }
  return solved
}

const solveColumns = (board: Array<Array<Tile>>, chars: string): Array<MatchedWord> => {
  const list: Array<MatchedWord> = []

  for (let column = 0; column < board.length; column++) {
    list.push(...solveColumn(board, chars, column))
  }

  return list;
}


export {
  solveColumn,
  solveColumns
}