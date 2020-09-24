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
        <div className="form-row align-items-center">
          <div className="col-10">
            <input id="tiles_input" className="form-control" type="text" placeholder="Your letters" />
          </div>
          <div className="col-auto">
          <button className="btn btn-success" onClick={() => this.addTiles()}>Solve</button>

          </div>
        </div>
      </section>
    );
  };
}
