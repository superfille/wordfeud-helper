import React from "react";
import "./style.css";

import Board from './Components/Board';
import PlayerTiles from './Components/PlayerTiles';
import WordTable from './Components/WordTable';
import { MatchedWord, StartBoard, Tile } from "./Models/Tile";
import { solveColumns } from "./Solvers/ColumnSolver";
import { solveRows } from "./Solvers/RowSolver";

type Props = {

}

type State = {
  board: Array<Array<Tile>>,
  matchedWords: Array<MatchedWord>,
  playerChars: string,
}

export default class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      board: StartBoard,
      playerChars: '',
      matchedWords: [],
    }

    this.addTiles = this.addTiles.bind(this)
    this.setTile = this.setTile.bind(this)
  }

  addTiles(tiles: string) {
    this.setState({
      playerChars: tiles
    })
  }

  setMultipleTiles(tilesWithChar: Array<{ tile: Tile, char: string }>, setFinal: boolean = false, func = () => {}) {
    this.setState({
      board: this.state.board.map(row => {
        return row.map(rowTile => {
          const tileWithChar = tilesWithChar.find(tile => rowTile === tile.tile)
          if (tileWithChar) {
            return {
              char: tileWithChar.char === 'Backspace' ? '' : tileWithChar.char,
              special: rowTile.special,
              final: setFinal,
            }
          }
          return rowTile;
        })
      })
    }, func)
  }

  setTile(tile: Tile | null, char: string) {
    this.setState({
      board: this.state.board.map(row => {
        return row.map(rowTile => {
          if (rowTile === tile) {
            return {
              char: char === 'Backspace' ? '' : char,
              special: tile.special,
              final: true,
            }
          }
          return rowTile;
        })
      })
    })
  }

  displayRow(matchedWord: MatchedWord, display: boolean) {
    const list: Array<{ tile: Tile, char: string }> = []
    let index = 0;
    const wordLengthInBoard = (matchedWord.word.length + matchedWord.column)
    for (let column = matchedWord.column; column < wordLengthInBoard; column++, index++) {
      if (!this.state.board[matchedWord.row][column].final) {
        list.push({
          tile: this.state.board[matchedWord.row][column],
          char: display ? matchedWord.word[index] : ''
        })
      }
    }
    this.setMultipleTiles(list)
  }

  displayColumn(matchedWord: MatchedWord, display: boolean) {
    const list: Array<{ tile: Tile, char: string }> = []
    let index = 0;
    const wordLengthInBoard = (matchedWord.word.length + matchedWord.row)
    for (let row = matchedWord.row; row < wordLengthInBoard; row++, index++) {
      if (!this.state.board[row][matchedWord.column].final) {
        list.push({
          tile: this.state.board[row][matchedWord.column],
          char: display ? matchedWord.word[index] : ''
        })
      }
    }
    this.setMultipleTiles(list)
  }

  displayWord(matchedWord: MatchedWord) {
    if (matchedWord.direction === 'row') {
     this.displayRow(matchedWord, true)
    } else {
      this.displayColumn(matchedWord, true)
    }
  }

  hideWord(matchedWord: MatchedWord) {
    if (matchedWord.direction === 'row') {
      this.displayRow(matchedWord, false)
    } else {
      this.displayColumn(matchedWord, false)
    }
  }

  copiedBoard() {

  }

  solve() {
    this.setState({
      matchedWords: [
        ...solveColumns(this.state.board, this.state.playerChars),
        ...solveRows(this.state.board, this.state.playerChars)
      ]
    })
  }

  render() {
    return (
      <div>
        <Board board={ this.state.board } setTile={ this.setTile } />
        <PlayerTiles
          tiles={ this.state.playerChars }
          addTiles={ this.addTiles }
        />
        <button onClick={() => this.solve()}>Solve</button>
        <WordTable
          matchedWords={ this.state.matchedWords }
          displayWord={ (matchedWord: MatchedWord) => this.displayWord(matchedWord) }
          hideWord={ (matchedWord: MatchedWord) => this.hideWord(matchedWord) }
        />
      </div>
    );
  }

}
