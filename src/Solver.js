import { englishWords } from './Words.js';

const solveRow = (row, letters) => {
  const list = [];
  let letterPosition = 0;
  for (let column = 0; column < row.length && letterPosition < letters.length; column++) {
    if (row[column].letter !== '') {
      list.push(row[column].)
    } else {
      list.push({
        letter: letters[letterPosition],
        row,
        column,
        final: false,
        special: row[column].special
      })
      letterPosition += 1;
    }
  }
  return list

}

export {
  solveRow
}