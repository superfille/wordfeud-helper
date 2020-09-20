import React from "react";
import "./style.css";

import Board from './Components/Board';
import PlayerTiles from './Components/PlayerTiles';
import WordTable from './Components/WordTable';
import { MatchedWord, StartBoard, Tile } from "./Models/Tile";
import { solveColumn } from "./Solvers/ColumnSolver";

type Props = {

}

type State = {
  tileSet: Array<Tile>
  board: Array<Array<Tile>>,
  matchedWords: Array<MatchedWord>,
  playerChars: string,
}

export default class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      tileSet: [],
      board: StartBoard,
      playerChars: '',
      matchedWords: [
        { word: 'cunt', points: 10, row: 5, column: 7, direction: 'row' }
      ],
    }

    this.addTiles = this.addTiles.bind(this)
    this.removeTile = this.removeTile.bind(this)
    this.setTile = this.setTile.bind(this)
  }

  componentDidMount() {
    this.testBoard();
  }


  testBoard() {
    this.setMultipleTiles([
      { tile: this.state.board[5][7], char: 'c'},
      { tile: this.state.board[5][8], char: 'a'},
      { tile: this.state.board[5][9], char: 'n'},
    ],
    true,
    () => {
      const newTiles = solveColumn(this.state.board, 'ight', 9)
      console.log(newTiles)
      }
    )

    
    // this.setState({ board });
  }

  addTiles(tiles: Array<string>) {
    this.setState({
      tileSet: tiles.map(char => { return { char, special: null, final: false } })
    })
  }

  removeTile(char: string) {
    const tile = this.state.tileSet.find(tile => tile.char === char);
    if (tile) {
      this.setState({
        tileSet: this.state.tileSet.filter(t => t !== tile)
      })
    }
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

  displayWord(matchedWord: MatchedWord) {
    if (matchedWord.direction === 'row') {
     this.displayRow(matchedWord, true)
    }
  }

  hideWord(matchedWord: MatchedWord) {
    if (matchedWord.direction === 'row') {
      this.displayRow(matchedWord, false)
    }
  }

  render() {
    return (
      <div>
        <Board board={ this.state.board } setTile={ this.setTile } />
        <PlayerTiles
          tiles={ this.state.tileSet }
          addTiles={ this.addTiles }
        />
        <WordTable
          matchedWords={ this.state.matchedWords }
          displayWord={ (matchedWord: MatchedWord) => this.displayWord(matchedWord) }
          hideWord={ (matchedWord: MatchedWord) => this.hideWord(matchedWord) }
        />
      </div>
    );
  }

}
