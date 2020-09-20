import { boardIsValid } from '../Confirmers/Confirmer';
import { MatchedWord, SolveTile, Tile } from '../Models/Tile';
import englishWords from '../Words.json';
import { countAllWordSpecials, countCharPoint } from './CountPoints';
import { wordCanMatchedWithTile, getAllWordsThatMatchChars, sortByPoints } from './SolverUtil';

const testWords: Array<string> = [
  'cunt'
]
/**
 * 
 * @param {*} tileRow 
 * @param {*} column 
 * Returns: { start: number, length: number, end: 0 }
 */
const getWordRowRestrictions = (tileRow: Array<Tile>, column: number) => {
  let length = 1;
  let start = 0;
  let end = 0;
  for (let index = column + 1; index < tileRow.length; index++) {
    if (tileRow[index].char !== '') {
      if (index - 1 === column) {
        // If it is just to the right break
        break
      }
      length += (index - column) - 2
      end = (index - column) - 2
      break
    }
    if (index + 1 === tileRow.length) {
      length += (tileRow.length - column) - 1
      end = (tileRow.length - column) - 1
    }
  }

  for (let index = column - 1; index >= 0; index--) {
    if (tileRow[index].char !== '') {
      if (index + 1 === column) {
        break;
      }
      length += (column - index) - 2
      start = (column - index) - 2
      break
    }
    if (index - 1 < 0) {
      length += column
      start = column
    }
  }
  return { length, start, end };
}

const combineCharsWithTile = (chars: string, tileRow: Array<Tile>, columns: Array<number>): string => {
  return columns
    .map(column => tileRow[column].char)
    .join()
    .concat(chars)
}

/**
 * 
 * @param {Array<string>} words 
 * @param {char: string, start: number, length: number} tile 
 */
const wordsThatMatchTileRow = (words: Array<string>, tile: SolveTile): Array<MatchedWord> => {
  return words.reduce((accumulated, currentWord) => {
    const index = wordCanMatchedWithTile(currentWord, tile);
    if (index >= 0) {
      accumulated.push({
        word: currentWord,
        column: tile.column - index,
        row: tile.row,
        points: 0,
        direction: 'row'
      })
    }
    return accumulated
  }, [] as Array<MatchedWord>);
}

const countPoints = (rowWord: MatchedWord, board: Array<Array<Tile>>): MatchedWord => {
  let points = 0;
  for (let i = 0; i < rowWord.word.length; i++) {
    points += countCharPoint(board[rowWord.row][rowWord.column + i], rowWord.word[i])
  }
  points = countAllWordSpecials(points, rowWord, board)

  return { ...rowWord, points }
}

const wordIsValidInBoard = (rowWord: MatchedWord, board: Array<Array<Tile>>) => {
  for (let i = 0; i < rowWord.word.length; i++) {
    if (board[rowWord.row][rowWord.column + i].final === false) {
      board[rowWord.row][rowWord.column + i].char = rowWord.word[i]
    }
  }

  const isValid = boardIsValid(board)

  for (let i = 0; i < rowWord.word.length; i++) {
    if (board[rowWord.row][rowWord.column + i].final === false) {
      board[rowWord.row][rowWord.column + i].char = ''
    }
  }
  return isValid
}

/**
 * Ord kan börja från toLeft till column
 * [1][2][B3][4][][C][]
 * B:s ord kan börja från 1,2,3 och gå ända till 4
 * @param {*} tileRow 
 * @param {*} chars
 */
const solveRow = (board: Array<Array<Tile>>, chars: string, row: number): Array<MatchedWord> => {
  let solved: Array<MatchedWord> = []
  const tileRow = board[row];
  for (let column = 0; column < tileRow.length; column++) {
    if (tileRow[column].char !== '') {
      const sequence = getWordRowRestrictions(tileRow, column)
      const solveTile: SolveTile = {
        start: sequence.start,
        length: sequence.length,
        char: tileRow[column].char,
        column,
        row
      }

      const wordsThatMatchTile: Array<MatchedWord> = wordsThatMatchTileRow(englishWords as Array<string>, solveTile)
      //const wordsThatMatchTile = wordsThatMatchTileRow(testWords, tile)
      const combinedChars: string = combineCharsWithTile(chars, tileRow, [column])
      const rowWords: Array<MatchedWord> = getAllWordsThatMatchChars(combinedChars, wordsThatMatchTile) 

      solved.push(...rowWords
        .filter(rowWord => wordIsValidInBoard(rowWord, board))
        .map(rowWord => countPoints(rowWord, board)))
    }
  }
  return solved
}

const solveRows = (board: Array<Array<Tile>>, chars: string): Array<MatchedWord> => {
  const list: Array<MatchedWord> = []

  for (let row = 0; row < board.length; row++) {
    list.push(...solveRow(board, chars, row))
  }

  return sortByPoints(list);
}

export {
  solveRow,
  solveRows
}