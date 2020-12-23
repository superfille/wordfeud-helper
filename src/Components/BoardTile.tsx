import React from "react";

import { Tile } from "../Models/Tile";

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

  render() {
    const color = this.props.tile.special !== null ? this.props.tile.special : 'black';
    const final = this.props.tile.playerChar && (this.props.tile.char !== '') ? 'board-tile--notFinal' : '';
    const className = `board-tile board-tile--color__${ color } ${final}`;

    return (
      <button onClick={this.handleOnSelect} className={ className }>
        { this.renderText() }
      </button>
    );
  };
}
