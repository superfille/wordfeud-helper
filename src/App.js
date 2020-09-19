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
      tileSet: tiles.map(char => { return { char, special: ''} })
    })
  }

  removeTile(char) {
    const tile = this.state.tileSet.find(tile => tile.char === char);
    if (tile) {
      this.setState({
        tileSet: this.state.tileSet.filter(t => t !== tile)
      })
    }
  }

  render() {
    return (
      <div>
        <Board removeTile={this.removeTile} tileSet={this.state.tileSet} />
        <TileSet tiles={this.state.tileSet} addTiles={this.addTiles} />
      </div>
    );
  }

}
