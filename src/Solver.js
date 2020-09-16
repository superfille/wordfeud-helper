import englishWords from './Words.json';


const boardLetterSequence = (tileRow, column) => {
  let length = 1;
  let start = 0;
  let end = 0;
  for (let index = column + 1; index < tileRow.length; index++) {
    if (tileRow[index].letter !== '') {
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
    if (tileRow[index].letter !== '') {
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

const combineLettersWithTile = (letters, tileRow, columns) => {
  return letters.concat(columns.map(column => tileRow[column].letter))
}

const createArray = (total) => {
  return [...Array(total).keys()]
}

const wordsMatchesStartAndLength = (word, letter, start, length) => {
  return word[start] === letter && word.length <= length;
}

/**
 * 
 * @param {Array<string>} words 
 * @param {letter: string, start: number, length: number} boardLetter 
 */
const matchFoo = (words, boardLetter) => {
  return words.reduce((accumulated, currentWord) => {
    if (createArray(boardLetter.start + 1).some((start, index) => wordsMatchesStartAndLength(currentWord, boardLetter.letter, start, boardLetter.length - index))) {
      return [...accumulated, currentWord];
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

const getAllWordsThatMatchLetters = (letters, words) => {
  return words.filter((word) => {
    let copiedChars = [...letters]
    return [...word].every((charInWord) => {
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

/**
 * Ord kan börja från toLeft till column
 * [1][2][B3][4][][C][]
 * B:s ord kan börja från 1,2,3 och gå ända till 4
 * @param {*} tileRow 
 * @param {*} letters 
 */
const solveRow = (tileRow, letters) => {
  //const words = getAllWordsWithinWithMaxLength(englishWords, maxLength)
  for (let column = 0; column < tileRow.length; column++) {
    if (tileRow[column].letter !== '') {
      const sequence = boardLetterSequence(tileRow, column)
      const boardLetter = {
        start: sequence.start,
        length: sequence.length,
        letter: tileRow[column].letter
      }

      const wordsThatMatchTileRow = matchFoo(englishWords, boardLetter)
      const combinedLetters = combineLettersWithTile(letters, tileRow, [column])
      const wordsThatMatch = getAllWordsThatMatchLetters(combinedLetters, wordsThatMatchTileRow) 
      console.log(sequence, wordsThatMatch)
    }
  }
}

export {
  solveRow
}