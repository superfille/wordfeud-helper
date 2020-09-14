import { englishWords } from './Words.js';
// Max 7 length word?

const maxWordLength = (tileRow, column) => {
  let length = 1;
  let toLeft = 0;
  let toRight = 0;
  for (let index = column + 1; index < tileRow.length; index++) {
    if (tileRow[index].letter !== '') {
      if (index - 1 === column) {
        // If it is just to the right break
        break
      }
      length += (index - column) - 2
      toRight = (index - column) - 2
      break
    }
    if (index + 1 === tileRow.length) {
      length += (tileRow.length - column) - 1
      toRight = (tileRow.length - column) - 1
    }
  }

  for (let index = column - 1; index >= 0; index--) {
    if (tileRow[index].letter !== '') {
      if (index + 1 === column) {
        break;
      }
      length += (column - index) - 2
      toLeft = (column - index) - 2
      break
    }
    if (index - 1 < 0) {
      length += column
      toLeft = column
    }
  }
  return { length, toLeft, toRight };
}

const canMake = (maxLength, tileRow, column) => {
  return maxWordLength(tileRow, column).length <= maxLength;
}

const getWordsWithMaxLength = (maxLength, letters) => {
  return console.log(maxLength, letters)
}

const combineLettersWithTile = (letters, tileRow, columns) => {
  return letters.concat(columns.map(column => tileRow[column].letter))
}

const getAllWordsWithinWithMaxLength = (words, maxLength) => {
  return words.filter(word => word.length <= maxLength);
}

/**
 * boardLetter: { letter: string, position: number }
 */
const wordsThatMatchSequence = (words, boardLetters) => {
  return words.filter(word => boardLetters.every(boardLetter => word[boardLetter.position] === boardLetter.letter))
}

const solveRow = (tileRow, letters) => {
  const words = getAllWordsWithinWithMaxLength(englishWords, 2)
  for (let column = 0; column < tileRow.length; column++) {
    if (tileRow[column].letter !== '') {
      if (canMake(2, tileRow, letters)) {
        const result = maxWordLength(tileRow, column)
        console.log(result)
        const boardLetter = {
          position: column, // wrong
          letter: tileRow[column].letter
        }
        const wordsThatMatchTileRow = wordsThatMatchSequence(words, [boardLetter])
        
        // combineLettersWithTile(letters, tileRow, [column])
      }
    }
  }
}

export {
  solveRow
}