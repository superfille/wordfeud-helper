import React from "react";

import BoardTile from './BoardTile';
import { AllowedChars, Tile } from "../Models/Tile";

type Props = {
  // tileSet: Array<any>,
  board: Array<Array<Tile>>,
  setTile: (tile: Tile |null, char: string) => void
}

type States = {
  selectedTile: Tile | null,
}

export default class Board extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      selectedTile: null,
    };
  };


  charIsAllowed(char: string) {
    return AllowedChars.indexOf(char.toLowerCase()) >= 0;
  }

  // hasTileSet(char: string) {
  //   if (this.props.tileSet.length === 0) {
  //     return true;
  //   }

  //   return !!this.props.tileSet.find(tile => tile.char === char)
  // }

  selectTile(tile: Tile) {
    this.setState({ selectedTile: tile });

    const keypress = (event: KeyboardEvent) => {
      if (this.charIsAllowed(event.key)) {
        this.props.setTile(this.state.selectedTile, event.key)
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
    return this.props.board.map((row, index) => {
      return <div key={`row-${index}`} className="my-row">{this.renderTiles(row)}</div>
    });
  };

  render() {
    return (
      <div>
        <div>
          <span className="tile_heading">0</span>
          <span className="tile_heading">1</span>
          <span className="tile_heading">2</span>
          <span className="tile_heading">3</span>
          <span className="tile_heading">4</span>
          <span className="tile_heading">5</span>
          <span className="tile_heading">6</span>
          <span className="tile_heading">7</span>
          <span className="tile_heading">8</span>
          <span className="tile_heading">9</span>
          <span className="tile_heading">10</span>
          <span className="tile_heading">11</span>
          <span className="tile_heading">12</span>
          <span className="tile_heading">13</span>
          <span className="tile_heading">14</span>
        </div>
        <div className="board">{this.renderBoard()}</div>
      </div>
    );
  };
}
