import React from "react";
import "./style.css";

import Tile from './Tile.js';

export default class Board extends React.Component {
  tiles = [
    [{s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, , {s: 'tw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}],
    [{s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}],
    [{s: '', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: '', l: ''}],
    [{s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}],
    [{s: 'tw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tw', l: ''}],
    [{s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}],
    [{s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}],
    [{s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}],
    [{s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}],
    [{s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}],
    [{s: 'tw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tw', l: ''}],
    [{s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}],
    [{s: '', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dw', l: ''}, {s: '', l: ''}, {s: '', l: ''}],
    [{s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}],
    [{s: 'tl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'dl', l: ''}, {s: '', l: ''}, {s: '', l: ''}, , {s: 'tw', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: '', l: ''}, {s: 'tl', l: ''}]
  ];

  constructor(props) {
    super(props);
    this.state = {
      tiles: this.tiles,
      selectedTile: null,
    };
  };

  letterIsAllowed(letter) {
    const allowed = ['backspace', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    return allowed.indexOf(letter.toLowerCase()) >= 0;
  }

  updateTile(tile, letter) {
    return this.state.tiles.map(row => {
      return row.map(rowTile => {
        if (rowTile === tile) {
          return {
            l: letter === 'Backspace' ? '' : letter,
            s: tile.s
          }
        }
        return rowTile;
      })
    })
    
  }

  selectTile(tile) {
    this.setState({
      selectedTile: tile,
    });

    const keypress = (event) => {
      if (this.letterIsAllowed(event.key)) {
        this.setState({
          tiles: this.updateTile(this.state.selectedTile, event.key)
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
