import React from "react";

import { AllowedChars, Tile } from "../Models/Tile";

type Props = {
  tile: Tile,
  onChange: (key: string) => void
}

type State = {
  value: string,
}

export default class BoardTile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.tile.char || props.tile.special || '',
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tile.char !== this.props.tile.char) {
      this.setState({
        value: this.props.tile.char || this.props.tile.special || '',
      });
    }
  }

  onKeyUp(event: any) {
    if (AllowedChars.includes(event.key.toLowerCase())) {
      if (event.key === 'Backspace') {
        this.props.onChange(this.props.tile.special || '');
        this.setState({ value: this.props.tile.special || '' });
      } else {
        this.props.onChange(event.key);
        this.setState({ value: event.key });
      }
    }
  }

  render() {
    const color = this.props.tile.special !== null ? this.props.tile.special : 'black';
    const final = this.props.tile.playerChar && (this.props.tile.char !== '') ? 'board-tile--notFinal' : '';
    const className = `board-tile board-tile--color__${ color } ${final}`;

    return (
      <input
        type="text"
        onKeyUp={(event) => this.onKeyUp(event)}
        onChange={() => { return }}
        className={ className }
        value={ this.state.value }
        maxLength={1}
      />
    );
  };
}
