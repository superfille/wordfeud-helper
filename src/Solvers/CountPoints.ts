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

export {
  getCharPoint,
  countCharPoint,
  countAllWordSpecials
}