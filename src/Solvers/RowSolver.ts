import { wordIsValidInBoard } from '../Confirmers/Confirmer';
import { CharacterPoints, MatchedWord, SolveTile, Tile } from '../Models/Tile';
import englishWords from '../Words.json';

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

const createArray = (total: number): Array<number> => {
  return Array.from(Array(total).keys())
}

const wordMatchesStartAndLength = (currentWord: string, char: string, start: number, length: number) => {
  return currentWord[start] === char && currentWord.length <= length;
}

const wordCanBePutInRow = (currentWord: string, tile: SolveTile) => {
  const index = createArray(tile.start + 1)
    .findIndex((_, index) => wordMatchesStartAndLength(currentWord, tile.char, tile.start - index, tile.length - index))
  return index >= 0 ? (tile.start) - index : -1;
}

/**
 * 
 * @param {Array<string>} words 
 * @param {char: string, start: number, length: number} tile 
 */
const wordsThatMatchTileRow = (words: Array<string>, tile: SolveTile): Array<MatchedWord> => {
  return words.reduce((accumulated, currentWord) => {
    const index = wordCanBePutInRow(currentWord, tile);
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

const hasJokerAndRemoveJoker = (chars: Array<string>) => {
  const index = chars.indexOf('*')
  if (index >= 0) {
    chars.splice(index, 1)
    return true
  }
  return false
}

const getAllWordsThatMatchChars = (chars: string, matchedWords: Array<MatchedWord>) => {
  return matchedWords.filter((matchedWord) => {
    let copiedChars = chars.split('')
    return matchedWord.word.split('').every((charInWord) => {
      const index = copiedChars.indexOf(charInWord)
      if (index >= 0) {
        copiedChars.splice(index, 1)
        return true
      } else {
        return hasJokerAndRemoveJoker(copiedChars)
      }
    });
  });
}

const getCharPoint = (char: string) => {
  return CharacterPoints.findIndex(cList => cList.includes(char))
}

const countCharPoint = (tile: Tile, char: string) => {
  if ('dl' === tile.special) {
    return getCharPoint(char) * 2
  }
  if ('tl' === tile.special) {
    return getCharPoint(char) * 3
  }

  return getCharPoint(char)
}

const countAllWordSpecials = (currentPoints: number, rowWord: MatchedWord, board: Array<Array<Tile>>) => {
  let points = currentPoints;
  for (let i = 0; i < rowWord.word.length; i++) {
    if (board[rowWord.row][rowWord.column + i].special === 'tw') {
      points *= 2;
    }
    if (board[rowWord.row][rowWord.column + i].special === 'tw') {
      points *= 3;
    }
  }

  return points
}

const countPoints = (rowWord: MatchedWord, board: Array<Array<Tile>>): MatchedWord => {
  let points = 0;
  for (let i = 0; i < rowWord.word.length; i++) {
    points += countCharPoint(board[rowWord.row][rowWord.column + i], rowWord.word[i])
  }
  points = countAllWordSpecials(points, rowWord, board)

  return { ...rowWord, points }
}

const sortByPoints = (matchedWords: Array<MatchedWord>): Array<MatchedWord> => {
  return matchedWords.sort((a, b) => b.points - a.points)
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