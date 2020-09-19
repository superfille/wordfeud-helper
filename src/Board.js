import React from "react";
import "./style.css";

import Tile from './Tile.js';
import { solveRow } from './Solver.js'

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const tiles = [
      [{final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}],
      [{final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}],
      [{final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}],
      [{final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}],
      [{final: false, special: 'tw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tw', char: ''}],
      [{final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}],
      [{final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}],
      [{final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}],
      [{final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}],
      [{final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}],
      [{final: false, special: 'tw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tw', char: ''}],
      [{final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}],
      [{final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}],
      [{final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}],
      [{final: false, special: 'tl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'dl', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tw', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: '', char: ''}, {final: false, special: 'tl', char: ''}]
    ];

    this.state = {
      tiles: tiles,
      selectedTile: null,
    };
  };

  componentDidMount() {
    this.testBoard();
  }

  testBoard() {
    let tiles = this.setTile(this.state.tiles, this.state.tiles[5][7], 'c')
 
    tiles = this.setTile(tiles, tiles[3][7], 'b')
    tiles = this.setTile(tiles, tiles[4][7], 'a')
    tiles = this.setTile(tiles, tiles[6][7], 'k')

    tiles = this.setTile(tiles, tiles[4][8], 'n')
    tiles = this.setTile(tiles, tiles[4][9], 't')

    tiles = this.setTile(tiles, tiles[5][7], 'c')

    const newTiles = solveRow(tiles[5], 'unt', tiles, 5)
    
    this.setState({ tiles });
  }

  charIsAllowed(char) {
    const allowed = ['backspace', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    return allowed.indexOf(char.toLowerCase()) >= 0;
  }

  hasTileSet(char) {
    if (this.props.tileSet.length === 0) {
      return true;
    }

    return !!this.props.tileSet.find(tile => tile.char === char)
  }

  updateTile(tiles, tile, char) {
    return tiles.map(row => {
      return row.map(rowTile => {
        if (rowTile === tile) {
          return {
            char: char === 'Backspace' ? '' : char,
            special: tile.special,
            final: tile.final,
          }
        }
        return rowTile;
      })
    })
  }

  setTile(tiles, tile, char) {
    return tiles.map(row => {
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

  selectTile(tile) {
    this.setState({ selectedTile: tile });

    const keypress = (event) => {
      if (this.charIsAllowed(event.key)) {
        this.setState({
          tiles: this.updateTile(this.state.tiles, this.state.selectedTile, event.key)
        });
      }
      document.removeEventListener('keyup', keypress, false)
    }
    document.addEventListener('keyup', keypress)
  }

  isSelected(tile) {
    return this.state.selectedTile === tile;
  }

  renderTiles(row) {
    return row.map((tile, index) => {
      return <Tile
        key={`tile-${index}`}
        tile={tile}
        onSelect={(tile) => this.selectTile(tile)}
        selected={this.isSelected(tile)}
        />
    });
  }

  renderBoard() {
    return this.state.tiles.map((row, index) => {
      return <div key={`row-${index}`} className="row">{this.renderTiles(row)}</div>
    });
  };

  render() {
    return (
      <div className="board">{this.renderBoard()}</div>
    );
  };
}
