import React from "react";
import "./style.css";

import Board from './Board.js';
import TileSet from './TileSet.js';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tileSet: []
    }

    this.addTiles = this.addTiles.bind(this)
    this.removeTile = this.removeTile.bind(this)
  }

  addTiles(tiles) {
    this.setState({
      tileSet: tiles.map(letter => { return { l: letter, s: ''} })
    })
  }

  removeTile(letter) {
    const tile = this.state.tileSet.find(tile => tile.l == letter);
    if (tile) {
      this.setState({
        tileSet: this.state.tileSet.filter(t => t !== tile)
      })
    }
  }

  render() {
    return (
      <div>
        <Board removeTile={this.removeTile} />
        <TileSet tiles={this.state.tileSet} addTiles={this.addTiles} />
      </div>
    );
  }
}
