import React from "react";
import Tile from './Tile.js';
import "./style.css";

export default class TileSet extends React.Component {
  constructor(props) {
    super(props)
  }

  renderTiles() {
    return this.props.tiles.map((tile, index) => {
      return (
        <Tile key={`tileset-${index}`} tile={tile} />
      )
    })
  }

  addTiles() {
    this.props.addTiles(document.getElementById('tiles_input').value.split(''))
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
