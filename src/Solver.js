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
/**
 * Ord kan börja från toLeft till column
 * [1][2][B3][4][][C][]
 * B:s ord kan börja från 1,2,3 och gå ända till 4
 * @param {*} tileRow 
 * @param {*} chars 
 */
const solveRow = (tileRow, chars, board, row) => {
  // console.time('hej')
  for (let column = 0; column < tileRow.length; column++) {
    if (tileRow[column].char === 'c') {
      const sequence = getWordRowRestrictions(tileRow, column)
      const tile = {
        start: sequence.start,
        length: sequence.length,
        char: tileRow[column].char,
        column,
        row
      }
      console.log('tile',tile)

      // const wordsThatMatchTile = wordsThatMatchTileRow(englishWords, tile)
      const wordsThatMatchTile = wordsThatMatchTileRow(testWords, tile)
      const combinedChars = combineCharsWithTile(chars, tileRow, [column])
      const rowWords = getAllWordsThatMatchChars(combinedChars, wordsThatMatchTile) 
      console.log('matched', rowWords)

      return testRowWordsInBoard(rowWords, board)
    }
  }
  // console.timeEnd('hej')
}

export {
  solveRow
}