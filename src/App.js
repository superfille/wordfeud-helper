import React from "react";
import "./style.css";

import Board from './Board.js';
import TileSet from './TileSet.js';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tileSet: [
        { l: 's', s: ''},
        { l: 'b', s: ''},
        { l: 'e', s: ''},
        { l: 'r', s: ''},
        { l: 's', s: ''},
        { l: 'a', s: ''},
      ]
    }

    this.addTiles = this.addTiles.bind(this)
  }

  addTiles(tiles) {
    this.setState({
      tileSet: tiles.map(letter => { return { l: letter, s: ''} })
    })
  }

  render() {
    return (
      <div>
        <Board />
        <TileSet tiles={this.state.tileSet} addTiles={this.addTiles} />
      </div>
    );
  }
}
