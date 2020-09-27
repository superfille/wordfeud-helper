import { boardIsValid } from '../Confirmers/Confirmer';
import { MatchedWord, Tile } from '../Models/Tile';
import englishWords from '../Words.json';
import { countAllWordSpecialsForRow, countCharPoint } from './CountPoints';
import { matchedWordMatchesWord } from './SolverUtil';

interface WordCharPositions {
  maxLength: number; // The max length of the word
  boardTilePositions: Array<number>; // Chars position in the board
  wordPositions: Array<number>; // Chars actual position in word
}

interface RowMatch {
  words: Array<string>;
  maxPos: WordCharPositions;
  combinedChars: string;
  tileRow: Array<Tile>;
  row: number;
  column: number;
}

const findWordCharPositions = (tileRow: Array<Tile>, start: number, charsLength: number): WordCharPositions => {
  let charsUsed = 0;
  let column = start;
  let boardTilePositions: Array<number> = []
  let wordPositions: Array<number> = []
  let index = 0;
  for (; column < tileRow.length; column++, index++) {
    if (tileRow[column].char !== '') {
      boardTilePositions.push(column)
      wordPositions.push(index)
      continue
    }
    charsUsed += 1

    if (charsUsed >= charsLength) {
      if (charsUsed > charsLength) {
        break
      }
      if (column + 1 < tileRow.length && tileRow[column + 1].char !== '') {
        continue
      }
      break
    }
  }

  return { maxLength: column - start, boardTilePositions, wordPositions };
}

const solve = (chars: string, board: Array<Array<Tile>>, row: number) => {
  const result: Array<MatchedWord> = [];
  
  for (let column = 0; column < board.length; column++) {
    if (column > 0 && board[row][column - 1].char !== '') {
      // We start words when there is nothing to the left
      continue
    }

    const wordCharPositions: WordCharPositions = findWordCharPositions(board[row], column,  chars.length)
    if (wordCharPositions.wordPositions.length > 0) {
      const combinedChars = combineCharsWithTile(chars, board[row], wordCharPositions.boardTilePositions)
      const matches = wordsThatMatchPositions({
        words: englishWords as Array<string>,
        maxPos: wordCharPositions,
        combinedChars,
        tileRow: board[row],
        row,
        column
      })
      result.push(...matches
        .filter(rowWord => wordIsValidInBoard(rowWord, board))
        .map(rowWord => countPoints(rowWord, board)))
    }
  }

  return result
}

const wordMatchesPositions = (word: string, maxPos: WordCharPositions, tileRow: Array<Tile>) => {
  let atLeastOneBoardTileChar = false;
  let atLeastOneWordChar = false;
  const result = word.split('').every((char, index) => {
    const i = maxPos.wordPositions.indexOf(index)
    if (i >= 0) {
      if (char === tileRow[maxPos.boardTilePositions[i]].char) {
        atLeastOneBoardTileChar = true;
        return true
      }
      return false
    }
    atLeastOneWordChar = true
    return true
  })

  return atLeastOneBoardTileChar && atLeastOneWordChar && result
}

const wordsThatMatchPositions = (payload: RowMatch): Array<MatchedWord> => {
  return payload.words.reduce((accumulated, currentWord) => {
    if (currentWord.length > payload.maxPos.maxLength) {
      return accumulated;
    }

    const wordMatchesPos = wordMatchesPositions(currentWord, payload.maxPos, payload.tileRow)
    const matchedWordMatches = matchedWordMatchesWord(payload.combinedChars, currentWord)
    if (wordMatchesPos && matchedWordMatches) {
       accumulated.push({
        word: currentWord,
        direction: 'row',
        row: payload.row,
        column: payload.column,
        points: 0,
      })
    }

    return accumulated
  }, [] as Array<MatchedWord>);
}


const combineCharsWithTile = (chars: string, tileRow: Array<Tile>, columns: Array<number>): string => {
  return columns
    .map(column => tileRow[column].char)
    .join('')
    .concat(chars)
}

const countPoints = (rowWord: MatchedWord, board: Array<Array<Tile>>): MatchedWord => {
  let points = 0;
  for (let i = 0; i < rowWord.word.length; i++) {
    points += countCharPoint(board[rowWord.row][rowWord.column + i], rowWord.word[i])
  }
  points = countAllWordSpecialsForRow(points, rowWord, board)

  return { ...rowWord, points }
}

const wordIsValidInBoard = (rowWord: MatchedWord, board: Array<Array<Tile>>) => {
  for (let i = 0; i < rowWord.word.length; i++) {
    if (board[rowWord.row][rowWord.column + i].final === false) {
      board[rowWord.row][rowWord.column + i].char = rowWord.word[i]
    }
  }

  const isValid = boardIsValid(board)

  for (let i = 0; i < rowWord.word.length; i++) {
    if (board[rowWord.row][rowWord.column + i].final === false) {
      board[rowWord.row][rowWord.column + i].char = ''
    }
  }

  return isValid
}

const solveRows = (board: Array<Array<Tile>>, chars: string): Array<MatchedWord> => {
  const list: Array<MatchedWord> = []

  for (let row = 0; row < board.length; row++) {
    list.push(...solve(chars, board, row))
  }

  return list;
}

export {
  solveRows
}