import { Tile } from "../Models/Tile";

export const save = (boardName: string, board: Array<Array<Tile>>) => {
  let newSave = '';
  for(let row = 0; row < board.length; row++) {
    for(let column = 0; column < board.length; column++) {
      if (board[row][column].final) {
        newSave += `${row},${column},${board[row][column].char};`
      }
    }
  }
  // Todo: Are you sure message before trying to save
  window.localStorage.setItem(boardName, newSave);
}

export const read = (boardName: string, board: Array<Array<Tile>>): Array<{ tile: Tile, char: string }> => {
  const localBoard = window.localStorage.getItem(boardName);
  if (!localBoard) {
    return [];
  }

  return localBoard
    .split(';')
    .map(item => {
      const foo: Array<string> = item.split(',');
      return {
        tile: board[Number(foo[0])][Number(foo[1])],
        char: foo[2]
      };
    });
}
