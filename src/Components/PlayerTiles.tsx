import React from "react";

type Props = {
  tiles: string,
  isLoading: boolean,
  addTiles: (s: string) => void,
  save: () => void,
}

export default class PlayerTiles extends React.Component<Props> {
  renderTiles() {
    const element = (document.getElementById('tiles_input') as HTMLInputElement)
    if (element) {
      element.value = this.props.tiles
    }
  
    return this.props.tiles.split('').map((tile, index) => {
      return (
        <div key={index}>{tile}</div>
      )
    })
  }

  addTiles() {
    this.props.addTiles((document.getElementById('tiles_input') as HTMLInputElement).value)
  }

  solveButton() {
    if (this.props.isLoading) {
      return (
        <button className="btn btn-primary w-100" disabled>
          <span className="spinner-border spinner-border-sm mr-1"></span> Solve
        </button>
      )
    }
    return (
      <button className="btn btn-primary w-100" onClick={() => this.addTiles()}>Solve</button>
    )
  }

  saveButton() {
    if (this.props.isLoading) {
      return (
        <button className="btn btn-success w-100" disabled>
          <span className="spinner-border spinner-border-sm mr-1"></span>Save
        </button>
      )
    }

    return (
      <button className="btn btn-success w-100" onClick={() => this.props.save()}>Save</button>
    )
  }

  render() {
    return (
      <section>
        <div style={{display: 'flex'}}>
          { this.renderTiles() }
        </div>
        <div className="form-row align-items-center">
          <div className="col-9">
            <input id="tiles_input" className="form-control" type="text" placeholder="Your letters" />
          </div>
          <div className="col-3">
            { this.solveButton() }
          </div>
          <div className="col-12 mt-3">
            { this.saveButton() }
          </div>
        </div>
      </section>
    );
  };
}
