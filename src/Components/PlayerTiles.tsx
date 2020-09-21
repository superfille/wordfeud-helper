import React from "react";

type Props = {
  tiles: string,
  addTiles: (s: string) => void
}

export default class PlayerTiles extends React.Component<Props> {
  renderTiles() {
    return this.props.tiles.split('').map((tile, index) => {
      return (
        <div key={index}>{tile}</div>
      )
    })
  }

  addTiles() {
    this.props.addTiles((document.getElementById('tiles_input') as HTMLInputElement).value)
  }

  render() {
    return (
      <section>
        <div style={{display: 'flex'}}>
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
