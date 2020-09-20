import React from "react";
import BoardTile from "./BoardTile";
import { Tile } from "../Models/Tile";


type Props = {
  tiles: Array<Tile>,
  addTiles: (s: Array<string>) => void
}

export default class TileSet extends React.Component<Props> {
  renderTiles() {
    return this.props.tiles.map((tile, index) => {
      return (
        <BoardTile onSelect={() => {}} selected={false} key={`tileset-${index}`} tile={tile} />
      )
    })
  }

  addTiles() {
    this.props.addTiles((document.getElementById('tiles_input') as HTMLInputElement).value.split(''))
  }

  render() {
    return (
      <section>
        <div>
          { this.renderTiles() }
        </div>
        <div>
          <input id="tiles_input" type="text" />
          <button id="tiles_input_submit" onClick={() => this.addTiles()}>Submit</button>
        </div>
      </section>
    );
  };
}
