import React from "react";

import BoardTile from './BoardTile';
import { solveRows } from '../Solvers/RowSolver'
import { AllowedChars, Tile, StartBoard } from "../Models/Tile";

type Props = {
  // tileSet: Array<any>,
}

type States = {
  board: Array<Array<Tile>>,
  selectedTile: Tile | null,
}

export default class Board extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      board: StartBoard,
      selectedTile: null,
    };
  };

  componentDidMount() {
    this.testBoard();
  }

  testBoard() {
    let board = this.setTile(this.state.board, this.state.board[5][7], 'c')
 
    board = this.setTile(board, board[6][7], 'a')
    board = this.setTile(board, board[7][7], 'n')
    // tiles = this.setTile(tiles, tiles[4][7], 'a')
    // tiles = this.setTile(tiles, tiles[6][7], 'k')

    // tiles = this.setTile(tiles, tiles[4][8], 'n')
    // tiles = this.setTile(tiles, tiles[4][9], 't')

    // tiles = this.setTile(tiles, tiles[5][7], 'c')

    const newTiles = solveRows(board, 'unt')
    console.log(newTiles)
    this.setState({ board });
  }

  charIsAllowed(char: string) {
    return AllowedChars.indexOf(char.toLowerCase()) >= 0;
  }

  // hasTileSet(char: string) {
  //   if (this.props.tileSet.length === 0) {
  //     return true;
  //   }

  //   return !!this.props.tileSet.find(tile => tile.char === char)
  // }

  setTile(board: Array<Array<Tile>>, tile: Tile |null, char: string): Array<Array<Tile>> {
    return board.map(row => {
      return row.map(rowTile => {
        if (rowTile === tile) {
          return {
            char: char === 'Backspace' ? '' : char,
            special: tile.special,
            final: true,
          }
        }
        return rowTile;
      })
    })
  }

  selectTile(tile: Tile) {
    this.setState({ selectedTile: tile });

    const keypress = (event: KeyboardEvent) => {
      if (this.charIsAllowed(event.key)) {
        this.setState({
          board: this.setTile(this.state.board, this.state.selectedTile, event.key)
        });
      }
      document.removeEventListener('keyup', keypress, false)
    }
    document.addEventListener('keyup', keypress)
  }

  isSelected(tile: Tile) {
    return this.state.selectedTile === tile;
  }

  renderTiles(row: Array<Tile>) {
    return row.map((tile, index: number) => {
      return <BoardTile
        key={`tile-${index}`}
        tile={tile}
        onSelect={(tile: Tile) => this.selectTile(tile)}
        selected={this.isSelected(tile)}
        />
    });
  }

  renderBoard() {
    return this.state.board.map((row, index) => {
      return <div key={`row-${index}`} className="row">{this.renderTiles(row)}</div>
    });
  };

  render() {
    return (
      <div className="board">{this.renderBoard()}</div>
    );
  };
}
