import { MatchedWord, SolveTile } from "../Models/Tile";

const createArray = (total: number): Array<number> => {
  return Array.from(Array(total).keys())
}

const wordMatchesStartAndLength = (currentWord: string, char: string, start: number, length: number) => {
  return currentWord[start] === char && currentWord.length <= length;
}

const wordCanMatchedWithTile = (currentWord: string, tile: SolveTile) => {
  const index = createArray(tile.start + 1)
    .findIndex((_, index) => wordMatchesStartAndLength(currentWord, tile.char, tile.start - index, tile.length - index))
  return index >= 0 ? (tile.start) - index : -1;
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

const sortByPoints = (matchedWords: Array<MatchedWord>): Array<MatchedWord> => {
  return matchedWords.sort((a, b) => b.points - a.points)
}

export {
  createArray,
  wordMatchesStartAndLength,
  wordCanMatchedWithTile,
  hasJokerAndRemoveJoker,
  getAllWordsThatMatchChars,
  sortByPoints
}