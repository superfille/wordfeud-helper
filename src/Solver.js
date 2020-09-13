import { englishWords } from './Words.js';
// Max 7 length word?

const maxWordLength = (tileRow, column) => {
  let count = 1;
  for (let index = column + 1; index < tileRow.length; index++) {
    if (tileRow[index].letter !== '') {
      if (index - 1 === column) {
        // If it is just to the right break
        break
      }
      count += (index - column) - 2;
      break
    }
    if (index + 1 === tileRow.length) {
      count += (tileRow.length - column) - 1
    }
  }
  for (let index = column - 1; index >= 0; index--) {
    if (tileRow[index].letter !== '') {
      if (index + 1 === column) {
        break;
      }
      count += (column - index) - 2;
      break
    }
    if (index - 1 < 0) {
      count += column
    }
  }
  return count;
}

const solveRow = (tileRow, letters) => {
  const list = [];
  let letterPosition = 0;
  for (let column = 0; column < tileRow.length; column++) {
    if (tileRow[column].letter !== '') {
      console.log(maxWordLength(tileRow, column))
    } else {
    }
  }
  return list

}

export {
  solveRow
}