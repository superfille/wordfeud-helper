import { MatchedWord, Tile } from "../Models/Tile";
import englishWords from '../Words.json';
import { boardIsValid } from "../Confirmers/Confirmer";
import { matchedWordMatchesWord } from './SolverUtil';
import { countPoints } from "./CountPoints";

export interface ColumnMatch {
  allWords: Array<string>;
  constructedWordFromBoard: string // Could be be*apa  [][b][e][][a][p][a];
  combinedChars: string;
  board: Array<Array<Tile>>;
  row: number;
  column: number;
}

/**
 * Find the word position in the board.
 * And get position of the characters in the bord
 * If we have start: 1
 * and board:
 * [][a][][b][c][]
 * and usersCharsLength: 2 // user has 2 characters
 * we will get
 * constructedWord: a*bc*
 * maxLength: 5 // we start at a and can only go to after b because the board ends
 * @param payload
 */
const getConstructedWordFromBoard = (payload: {
  board: Array<Array<Tile>>, start: number, usersCharsLength: number, column: number
}): string => {
  let charsUsed = 0;
  let row = payload.start;
  let constructedWord: string = '';
  let index = 0;
  for (; row < payload.board.length; row++, index++) {
    if (payload.board[row][payload.column].char !== '') {
      constructedWord += payload.board[row][payload.column].char;
      continue;
    }
    charsUsed += 1;
    constructedWord += '*';

    if (charsUsed >= payload.usersCharsLength) {
      if (charsUsed > payload.usersCharsLength) {
        break
      }
      if (row + 1 < payload.board.length && payload.board[row + 1][payload.column].char !== '') {
        continue
      }
      break
    }
  }

  if (constructedWord.split('').every(c => c === '*')) {
    return '';
  }

  return  constructedWord
}

const wordMatchesPositions = (word: string, constructedWord: string): boolean => {
  return constructedWord.indexOf(word) >= 0;
}

/**
 * Make sure that the word we create doesn't have a char after it. Which makes it not a word then
 * possibly. If it is a word, it will probably be checked at a later point from the allWord array.
 * @param word The word we get from lexikon
 * @param columnMatch the board, which column we are in and from where the word starts
 */
const positionAfterCurrentWordIsEmpty = (word: string, columnMatch: ColumnMatch): boolean => {
  if (columnMatch.row + word.length < columnMatch.board.length) {
    if (columnMatch.board[columnMatch.row + word.length][columnMatch.column].char !== '') {
      return false;
    }
  }
  return true;
}

const wordsThatMatchPositions = (payload: ColumnMatch): Array<MatchedWord> => {
  return payload.allWords.reduce((accumulated, currentWord) => {
    if (currentWord.length > payload.constructedWordFromBoard.length) {
      return accumulated
    }

    if (!positionAfterCurrentWordIsEmpty(currentWord, payload)) {
      return accumulated
    }

    const wordMatchesPos = wordMatchesPositions(currentWord,  payload.constructedWordFromBoard);
    const matchedWordMatches = matchedWordMatchesWord(payload.combinedChars, currentWord)
    if (wordMatchesPos && matchedWordMatches) {
       accumulated.push({
        word: currentWord,
        direction: 'column',
        row: payload.row,
        column: payload.column,
        points: 0,
      })
    }

    return accumulated
  }, [] as Array<MatchedWord>);
}


/**
 * @param playerChars 
 * @param board 
 * @param column 
 */
const solve = (playerChars: string, board: Array<Array<Tile>>, column: number) => {
  const result: Array<MatchedWord> = [];
  
  for (let row = 0; row < board.length; row++) {
    if (row > 0 && board[row - 1][column].char !== '') {
      // We start words when there is nothing above
      continue
    }

    const constructedWordFromBoard: string = getConstructedWordFromBoard({
      board, start: row, usersCharsLength: playerChars.length, column
    })

    if (constructedWordFromBoard.length > 0) {
      const combinedChars = combineCharsWithTile(playerChars, constructedWordFromBoard)
      const matches = wordsThatMatchPositions({
        allWords: englishWords as Array<string>,
        constructedWordFromBoard: constructedWordFromBoard,
        combinedChars,
        board: board,
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

const setWordInBoard = (columnWord: MatchedWord, board: Array<Array<Tile>>) => {
  for (let i = 0; i < columnWord.word.length; i++) {
    if (board[columnWord.row + i][columnWord.column].final === false) {
      board[columnWord.row + i][columnWord.column].char = columnWord.word[i]
    }
  }
}

const removeWordFromBoard = (columnWord: MatchedWord, board: Array<Array<Tile>>) => {
  for (let i = 0; i < columnWord.word.length; i++) {
    if (board[columnWord.row + i][columnWord.column].final === false) {
      board[columnWord.row + i][columnWord.column].char = ''
    }
  }
}

const countPointsHelper = (columnWord: MatchedWord, board: Array<Array<Tile>>): number => {
  setWordInBoard(columnWord, board);

  let points = countPoints(board);

  removeWordFromBoard(columnWord, board);

  return points;
}

const combineCharsWithTile = (playerChars: string, constructedWord: string): string => {
  return constructedWord
    .split('')
    .filter(c => c !== '*')
    .join('')
    .concat(playerChars);
}

const wordIsValidInBoard = (columnWord: MatchedWord, board: Array<Array<Tile>>) => {
  setWordInBoard(columnWord, board);

  const isValid = boardIsValid(board);

  removeWordFromBoard(columnWord, board);

  return isValid;
}

const solveColumns = (board: Array<Array<Tile>>, chars: string): Array<MatchedWord> => {
  const list: Array<MatchedWord> = []

  for (let column = 0; column < board.length; column++) {
    list.push(...solve(chars, board, column))
  }

  return list;
}


export {
  solveColumns,
  getConstructedWordFromBoard,
  wordMatchesPositions,
  combineCharsWithTile,
  positionAfterCurrentWordIsEmpty
}