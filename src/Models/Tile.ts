export enum SpecialTile {
  DL = 'dl',
  TL = 'tl',
  DW = 'dw',
  TW = 'tw',
}

export interface Position {
  row: number,
  column: number,
}

export interface Tile {
  final: boolean;
  special: SpecialTile | null,
  char: string,
}

export const finalTile = (char: string = ''): Tile => {
  return { char, special: null, final: char !== '' }
}

export const notFinalTile = (char: string = ''): Tile => {
  return { char, special: null, final: false }
}

export interface SolveTile extends Position {
  start: number;
  length: number,
  char: string,
}

/**
 * hasNotFinalCharacter: a character in the word is final: false
 */
export interface MatchedWord extends Position {
  word: string,
  points: number,
  direction: 'row' | 'column',
  hasNotFinalCharacter?: boolean,
}

export const AllowedChars: Array<string> = ['backspace', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

export const CharacterPoints: Array<Array<string>> = [
  [],
  ['a', 'e', 'i', 'l', 'n', 'o', 'r', 's', 't'],
  ['d', 'u'],
  ['g', 'm'],
  ['b', 'c', 'f', 'h', 'p', 'v', 'w', 'y'],
  ['k'],
  [],
  [],
  ['x'],
  [],
  ['j', 'q', 'z']
];

export const StartBoard: Array<Array<Tile>> = [
  [{final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}],
  [{final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}],
  [{final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}],
  [{final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}],
  [{final: false, special: SpecialTile.TW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TW, char: ''}],
  [{final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}],
  [{final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}],
  [{final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}],
  [{final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}],
  [{final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}],
  [{final: false, special: SpecialTile.TW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TW, char: ''}],
  [{final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}],
  [{final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}],
  [{final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}],
  [{final: false, special: SpecialTile.TL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.DL, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TW, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: null, char: ''}, {final: false, special: SpecialTile.TL, char: ''}]
];