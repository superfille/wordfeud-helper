import React from "react";

import { Tile } from "../Models/Tile";

type Props = {
  board: Array<Array<Tile>>,
  setMultipleTiles: (savedBoard: Array<{ tile: Tile, char: string }>, setFinal: boolean, func: () => void) => void
}

type States = {
  selectedBoard: string
}

export default class Board extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedBoard: '',
    }
  }

  readSavedLocal(name: string) {
    const save = window.localStorage.getItem(name);
    if (!save) {
      return;
    }

    const savedBoard = save
      .split(';')
      .map(item => {
        const foo: Array<string> = item.split(',');
        return {
          tile: this.props.board[Number(foo[0])][Number(foo[1])],
          char: foo[2]
        };
      });
    this.props.setMultipleTiles(savedBoard, true, () => {});
  }

  saveToLocal(boardName: string) {
    let save = '';
    for(let row = 0; row < this.props.board.length; row++) {
      for(let column = 0; column < this.props.board.length; column++) {
        if (this.props.board[row][column].final) {
          save += `${row},${column},${this.props.board[row][column].char};`
        }
      }
    }
    // Todo: Are you sure message?
    window.localStorage.setItem(boardName, save);
  }

  myBoardNames(): Array<string> {
    const names: Array<string> = [];
    for(let i = 0; i < window.localStorage.length; i++) {
      names.push(window.localStorage.key(i) ? window.localStorage.key(i)! : '');
    }

    return names.filter(p => !!p);
  }

  renderMyBoardNames() {
    return this.myBoardNames().map(name => {
      return (<option key={name}>{ name }</option>)
    })
  }

  render() {
    return (
      <div className="select is-info">
        <select name="myboards" id="myboards">
          { this.renderMyBoardNames() }
        </select>
      </div>
    );
  }
}
