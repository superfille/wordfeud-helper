import { CharacterPoints, MatchedWord, Tile } from "../Models/Tile"

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

const countWordPoint = (currentPoints: number, tile: Tile): number => {
  if (tile.special === 'dw') {
    return currentPoints *= 2;
  }

  if (tile.special === 'tw') {
    return currentPoints *= 3;
  }

  return currentPoints
}

const countAllWordSpecialsForRow = (currentPoints: number, rowWord: MatchedWord, board: Array<Array<Tile>>) => {
  let points = currentPoints;
  for (let i = 0; i < rowWord.word.length; i++) {
    points = countWordPoint(currentPoints, board[rowWord.row][rowWord.column + i])
  }

  return points
}

const countAllWordSpecialsForColumn = (currentPoints: number, columnWord: MatchedWord, board: Array<Array<Tile>>) => {
  let points = currentPoints;
  for (let i = 0; i < columnWord.word.length; i++) {
    points = countWordPoint(currentPoints, board[columnWord.row + i][columnWord.column])
  }

  return points
}

export {
  getCharPoint,
  countCharPoint,
  countAllWordSpecialsForRow,
  countAllWordSpecialsForColumn
}