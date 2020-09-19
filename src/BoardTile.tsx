import React from "react";
import "./style.css";

import { Tile } from "./Models/Tile";

type Props = {
  tile: Tile,
  selected: boolean,
  onSelect: (tile: Tile) => void
}

export default class BoardTile extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  handleOnSelect() {
    this.props.onSelect(this.props.tile);
  }

  renderText() {
    if (this.props.selected) {
      return this.props.tile.char || ''
    }
    return this.props.tile.char || this.props.tile.special;
  }

  color() {
    return this.props.tile.special !== null ? this.props.tile.special : 'black';
  }

  className() {
    return `tile tile--color__${this.color()}`;
  }

  render() {
    return (
      <button onClick={this.handleOnSelect} className={this.className()}>
        { this.renderText() }
      </button>
    );
  };
}
