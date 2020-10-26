import { boardIsValid } from '../Confirmers/Confirmer';
import { MatchedWord, Tile } from '../Models/Tile';
import { countPoints } from './CountPoints';
import englishWords from '../Words.json';
import { isWordFine } from './SolverUtil';

// const englishWords = ['tap']

interface RowMatch {
  words: Array<string>;
  constructedWord: string;
  playerChars: string;
  tileRow: Array<Tile>;
  row: number;
  column: number;
}

const getConstructedWordFromBoard = (payload: {
  tileRow: Array<Tile>, start: number, usersCharsLength: number
}): string => {
  let charsUsed = 0;
  let column = payload.start;
  let index = 0;
  let constructedWord = '';

  for (; column < payload.tileRow.length; column++, index++) {
    if (payload.tileRow[column].char !== '') {
      constructedWord += payload.tileRow[column].char;
      continue
    }

    if (charsUsed < payload.usersCharsLength) {
      constructedWord += '*';
    }

    charsUsed += 1;
  
    if (column + 1 < payload.tileRow.length && payload.tileRow[column + 1].char !== '') {
      continue;
    }

    if (charsUsed >= payload.usersCharsLength) {
      break;
    }
  }

  const splitted = constructedWord.split('');
  if (splitted.some(c => c !== '*') && splitted.some(c => c === '*')) {
    return constructedWord;
  }

  return '';
}

const solve = (playerChars: string, board: Array<Array<Tile>>, row: number) => {
  const result: Array<MatchedWord> = [];
  
  for (let column = 0; column < board.length; column++) {
    if (column > 0 && board[row][column - 1].char !== '') {
      // We start words when there is nothing to the left
      continue
    }

    const constructedWord: string = getConstructedWordFromBoard({
      tileRow: board[row], start: column, usersCharsLength: playerChars.length
    });

    if (constructedWord.length > 0) {
      const matches = wordsThatMatchPositions({
        words: englishWords as Array<string>,
        constructedWord: constructedWord,
        playerChars,
        tileRow: board[row],
        row,
        column
      })

      result.push(...matches
        .filter(rowWord => wordIsValidInBoard(rowWord, board))
        .map(matchedWord => {
          return {
            ...matchedWord,
            points: countPointsHelper(matchedWord, board)
          }
        }))
    }
  }

  return result
}

const positionAfterCurrentWordIsNotEmpty = (word: string, rowMatch: RowMatch): boolean => {
  if (rowMatch.column + word.length + 1 < rowMatch.tileRow.length) {
    if (rowMatch.tileRow[rowMatch.column + word.length + 1].char === '') {
      return true;
    }
  }
  return false;
}

const wordsThatMatchPositions = (payload: RowMatch): Array<MatchedWord> => {
  return payload.words.reduce((accumulated, libraryWord) => {
    if (libraryWord.length > payload.constructedWord.length) {
      return accumulated
    }

    if (positionAfterCurrentWordIsNotEmpty(libraryWord, payload)) {
      return accumulated
    }

    if (isWordFine(libraryWord, payload.constructedWord, payload.playerChars)) {
      accumulated.push({
        word: libraryWord,
        direction: 'row',
        row: payload.row,
        column: payload.column,
        points: 0,
      });
    }

    return accumulated
  }, [] as Array<MatchedWord>)
}

const countPointsHelper = (rowWord: MatchedWord, board: Array<Array<Tile>>) => {
  for (let i = 0; i < rowWord.word.length; i++) {
    if (board[rowWord.row][rowWord.column + i].final === false) {
      board[rowWord.row][rowWord.column + i].char = rowWord.word[i]
    }
  }

  let points = countPoints(board)

  for (let i = 0; i < rowWord.word.length; i++) {
    if (board[rowWord.row][rowWord.column + i].final === false) {
      board[rowWord.row][rowWord.column + i].char = ''
    }
  }

  return points
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