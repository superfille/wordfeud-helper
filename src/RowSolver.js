import { wordIsValidInBoard } from './Confirmer';
import englishWords from './Words.json';
const testWords = [
  'cunt'
]
/**
 * 
 * @param {*} tileRow 
 * @param {*} column 
 * Returns: { start: number, length: number, end: 0 }
 */
const getWordRowRestrictions = (tileRow, column) => {
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

const combineCharsWithTile = (chars, tileRow, columns) => {
  return chars.concat(columns.map(column => tileRow[column].char))
}

const createArray = (total) => {
  return [...Array(total).keys()]
}

const wordMatchesStartAndLength = (currentWord, char, start, length) => {
  return currentWord[start] === char && currentWord.length <= length;
}

const wordCanBePutInRow = (currentWord, tile) => {
  const index = createArray(tile.start + 1)
    .findIndex((_, index) => wordMatchesStartAndLength(currentWord, tile.char, tile.start - index, tile.length - index))
  return index >= 0 ? (tile.start) - index : -1;
}

/**
 * 
 * @param {Array<string>} words 
 * @param {char: string, start: number, length: number} tile 
 */
const wordsThatMatchTileRow = (words, tile) => {
  return words.reduce((accumulated, currentWord) => {
    const index = wordCanBePutInRow(currentWord, tile);
    if (index >= 0) {
      accumulated.push({
        word: currentWord,
        column: tile.column - index,
        row: tile.row
      })
    }
    return accumulated
  }, []);
}

const hasJokerAndRemoveJoker = (chars) => {
  const index = chars.indexOf('*')
  if (index >= 0) {
    chars.splice(index, 1)
    return true
  }
  return false
}

const getAllWordsThatMatchChars = (chars, wordsModel) => {
  return wordsModel.filter((word) => {
    let copiedChars = [...chars]
    return [...word.word].every((charInWord) => {
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


const testRowWordsInBoard = (rowWords, board) => {
  rowWords.filter(rowWord => {
    return wordIsValidInBoard(rowWord, board)
  })
}

const characterPoints = [
  [],
  ['a', 'e', 'i', 'l', 'n', 'o', 'r', 's', 't'],
  ['d', 'u'],
  ['g', 'm'],
  ['b', 'c', 'f', 'h', 'p', 'v', 'w', 'y'],
  ['k'],
  [],
  [],
  ['x'],
  [],
  ['j', 'q', 'z']
];

const getCharPoint = (char) => {
  return characterPoints.findIndex(cList => cList.includes(char))
}

const countCharPoint = (tile, char) => {
  if ('dl' === tile.special) {
    return getCharPoint(char) * 2
  }
  if ('tl' === tile.special) {
    return getCharPoint(char) * 3
  }

  return getCharPoint(char)
}

const countAllWordSpecials = (currentPoints, rowWord, board) => {
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

const countPoints = (rowWord, board) => {
  let points = 0;
  for (let i = 0; i < rowWord.word.length; i++) {
    points += countCharPoint(board[rowWord.row][rowWord.column + i], rowWord.word[i])
  }
  points = countAllWordSpecials(points, rowWord, board)

  return { ...rowWord, points }
}

const sortByPoints = (wordsWithPoints) => {
  return wordsWithPoints.sort((a, b) => b.points - a.points)
}

/**
 * Ord kan börja från toLeft till column
 * [1][2][B3][4][][C][]
 * B:s ord kan börja från 1,2,3 och gå ända till 4
 * @param {*} tileRow 
 * @param {*} chars 
 */
const solveRow = (tileRow, chars, board, row) => {
  let solved = []
  for (let column = 0; column < tileRow.length; column++) {
    if (tileRow[column].char !== '') {
      const sequence = getWordRowRestrictions(tileRow, column)
      const tile = {
        start: sequence.start,
        length: sequence.length,
        char: tileRow[column].char,
        column,
        row
      }

      const wordsThatMatchTile = wordsThatMatchTileRow(englishWords, tile)
      //const wordsThatMatchTile = wordsThatMatchTileRow(testWords, tile)
      const combinedChars = combineCharsWithTile(chars, tileRow, [column])
      const rowWords = getAllWordsThatMatchChars(combinedChars, wordsThatMatchTile) 

      solved.push(...rowWords
        .filter(rowWord => wordIsValidInBoard(rowWord, board))
        .map(rowWord => countPoints(rowWord, board)))
    }
  }
  solved = sortByPoints(solved)
  console.log(solved)
}

export {
  solveRow
}