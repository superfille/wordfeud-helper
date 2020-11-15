import React from "react";

import { Tile } from "../Models/Tile";

type Props = {
  board: Array<Array<Tile>>,
  localStorageBoards: Array<{ name: string, board: string } >,
  createNewBoard: (name: string) => void
}

type States = {
  currentBoardName: string,
}

export default class BoardReadSave extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentBoardName: props.localStorageBoards?.length > 0 ? props.localStorageBoards[0].name : ''
    }
  }

  myBoardNames(): Array<string> {
    return (this.props.localStorageBoards || []).map(localStorageBoard => localStorageBoard.name);
  }

  renderMyBoardNames() {
    return this.myBoardNames().map(name => {
      return (
        <option key={ name } value={ name }>{ name }</option>
      );
    });
  }

  handleBoardChange(event: any) { // HTMLSelectElement
    this.setState({
      currentBoardName: event.target.value
    });
  }

  renderMyBoardDropdown() {
    return (
      <div className="select is-info">
        <select name="myboards" id="myboards" onChange={(event) => this.handleBoardChange(event)}>
          {this.renderMyBoardNames()}
        </select>
      </div>
    )
  }

  createNewBoard() {
    const newBoardName = (document.getElementById('newboardname') as HTMLInputElement).value;
    // Kolla om namnet finns redan
    this.props.createNewBoard(newBoardName);
  }

  renderNewBoardInput() {
    return (
      <div className="columns">
        <div className="control column">
          <input id="newboardname" className="input" type="text" placeholder="Create board" />
        </div>
        <div className="control column">
          <button className="button" onClick={() => this.createNewBoard() }>New board</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-one-quarter">
          {this.renderMyBoardDropdown()}
        </div>
        <div className="column is-one-half">
          {this.renderNewBoardInput()}
        </div>
      </div>
    );
  }
}
