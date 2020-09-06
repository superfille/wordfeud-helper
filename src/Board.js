import React from "react";
import "./style.css";

import Tile from './Tile.js';

export default class Board extends React.Component {
  tiles = [
    [{final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, , {final: false, special: 'tw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}],
    [{final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}],
    [{final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}],
    [{final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}],
    [{final: false, special: 'tw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tw',letter: ''}],
    [{final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}],
    [{final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}],
    [{final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}],
    [{final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}],
    [{final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}],
    [{final: false, special: 'tw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tw',letter: ''}],
    [{final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}],
    [{final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}],
    [{final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}],
    [{final: false, special: 'tl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'dl',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, , {final: false, special: 'tw',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: '',letter: ''}, {final: false, special: 'tl',letter: ''}]
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

  hasTileSet(letter) {
    if (this.props.tileSet.length === 0) {
      return true;
    }

    return !!this.props.tileSet.find(tile => tile.letter === letter)
  }

  updateTile(tile, letter) {
    return this.state.tiles.map(row => {
      return row.map(rowTile => {
        if (rowTile === tile) {
          return {
            letter: letter === 'Backspace' ? '' : letter,
            special: tile.special,
            final: tile.final,
          }
        }
        return rowTile;
      })
    })
  }

  selectTile(tile) {
    this.setState({ selectedTile: tile });

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
