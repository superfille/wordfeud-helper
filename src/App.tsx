import React from "react";
import "./style.css";

import Board from './Components/Board';
import TileSet from './Components/TileSet';
import { Tile } from "./Models/Tile";

type Props = {

}

type State = {
  tileSet: Array<Tile>
}

export default class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      tileSet: []
    }

    this.addTiles = this.addTiles.bind(this)
    this.removeTile = this.removeTile.bind(this)
  }

  addTiles(tiles: Array<string>) {
    this.setState({
      tileSet: tiles.map(char => { return { char, special: null, final: false } })
    })
  }

  removeTile(char: string) {
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
        {/* <Board removeTile={this.removeTile} tileSet={this.state.tileSet} /> */}
        <Board />
        <TileSet tiles={this.state.tileSet} addTiles={this.addTiles} />
      </div>
    );
  }

}
