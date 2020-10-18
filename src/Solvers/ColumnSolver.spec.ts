/**
 *  
    [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
    [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
    [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
    [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
    [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
 */

import { finalTile, notFinalTile, Tile } from "../Models/Tile"
import {
    getConstructedWordFromBoard,
    ColumnMatch,
    wordMatchesPositions,
    combineCharsWithTile,
    positionAfterCurrentWordIsEmpty
  } from "./ColumnSolver"

// @ts-ignore
describe('ColumnSolver', () => {
  describe('getConstructedWordFromBoard', () => {
    it('should get correct positions when starting at the beginning of board', () => {
      const board: Array<Array<Tile>> = [
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile('a'), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile('p'), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
      ]
      const start = 0;
      const usersCharsLength = 2;
      const column = 1;

      const result: string = getConstructedWordFromBoard({ board, start, usersCharsLength, column })

      expect(result).toEqual('*ap*');
    })

    it('should get correct positions when starting inside the board', () => {
      const board: Array<Array<Tile>> = [
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile('p'), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile('a'), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
      ]
      const start = 2;
      const usersCharsLength = 2;
      const column = 1;

      const result: string = getConstructedWordFromBoard({ board, start, usersCharsLength, column })

      expect(result).toEqual('pa*');
    })

    it('should get empty', () => {
      const board: Array<Array<Tile>> = [
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
      ]
      const start = 0;
      const usersCharsLength = 2;
      const column = 1;

      const result: string = getConstructedWordFromBoard({ board, start, usersCharsLength, column })

      expect(result).toEqual('');
    })
  })

  describe('wordMatchesPositions', () => {
    it('should match because all characters of the word are in a sequence in the constructed word', () => {
      const word = 'bc';
      const constructedWord = 'a*bca';
      const result = wordMatchesPositions(word, constructedWord);
      
      expect(result).toBeTruthy();
    })

    it('should not match because not all the characters in the word are in a sequence in the constructed word', () => {
      const word = 'bc';
      const constructedWord = 'a*cb';
      const result = wordMatchesPositions(word, constructedWord);
      
      expect(result).toBeFalsy();
    })

  })

  describe('combineCharsWithTile', () => {
    it('should put the players chars together with constructedWord we get from board but without *', () => {
      const playerChars = 'abc';
      const constructedWord = '*de*f'
  
      const result = combineCharsWithTile(playerChars, constructedWord)
  
      expect(result).toBe('defabc')
    });
  });

  describe('positionAfterCurrentWordIsEmpty', () => {
    it('should return false because the word has another char after last char', () => {
      const columMatch = {
        board: [
          [finalTile(), finalTile('a'), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile('f'), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        ],
        row: 0,
        column: 1,
      } as ColumnMatch;
      const word = 'apa';

      const result = positionAfterCurrentWordIsEmpty(word, columMatch)

      expect(result).toBeFalsy();
    });

    it('should return true because the word does not have another char after last char', () => {
      const columMatch = {
        board: [
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile('a'), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        ],
        row: 1,
        column: 1,
      } as ColumnMatch;
      const word = 'apa';

      const result = positionAfterCurrentWordIsEmpty(word, columMatch)

      expect(result).toBeTruthy();
    });

    it('should return false because the word ends at board end', () => {
      const columMatch = {
        board: [
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile('a'), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
          [finalTile(), finalTile(), finalTile(), finalTile(), finalTile()],
        ],
        row: 2,
        column: 1,
      } as ColumnMatch;
      const word = 'apa';

      const result = positionAfterCurrentWordIsEmpty(word, columMatch)

      expect(result).toBeTruthy();
    });
  })

})