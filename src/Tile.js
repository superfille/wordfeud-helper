import React from "react";
import "./style.css";

export default class Tile extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.onSelect) {
      this.handleOnSelect = this.handleOnSelect.bind(this);
    } else {
      this.handleOnSelect = () => {}
    }
  }

  handleOnSelect() {
    this.props.onSelect(this.props.tile);
  }

  renderText() {
    if (this.props.selected) {
      return this.props.tile.letter || ''
    }
    return this.props.tile.letter || this.props.tile.special;
  }

  color() {
    return this.props.tile.special !== '' ? this.props.tile.special : 'black';
  }

  className() {
    return `tile tile--color__${this.color()}`;
  }

  render() {
    let className = `tile tile--color__${this.color()}`;
    return (
      <button onClick={this.handleOnSelect} className={this.className()}>
        { this.renderText() }
      </button>
    );
  };
}
