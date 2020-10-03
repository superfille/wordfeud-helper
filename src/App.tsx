import React from "react";
import "./style.css";

import Board from './Components/Board';
import PlayerTiles from './Components/PlayerTiles';
import WordTable from './Components/WordTable';
import { MatchedWord, StartBoard, Tile } from "./Models/Tile";
import { solveColumns } from "./Solvers/ColumnSolver";
import { solveRows } from "./Solvers/RowSolver";
import { sortByPoints } from './Solvers/SolverUtil';
import { boardIsValid } from './Confirmers/Confirmer';

type Props = {}

type State = {
  board: Array<Array<Tile>>,
  matchedWords: Array<MatchedWord>,
  playerChars: string,
  boardIsValid: boolean,
  loading: boolean,
}

export default class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      board: StartBoard,
      playerChars: 'geoc',
      matchedWords: [],
      boardIsValid: true,
      loading: false,
    }

    setTimeout(() => {
      this.testBoard()
    }, 100)
  }

  addTiles(tiles: string) {
    this.setState({
      playerChars: tiles
    }, this.solve)
  }

  testBoard() {
    this.setMultipleTiles([
      { tile: this.state.board[5][5], char: 'm' },
      { tile: this.state.board[5][6], char: 'a' },
      { tile: this.state.board[5][7], char: 'n' },

      { tile: this.state.board[6][7], char: 'o' },
      { tile: this.state.board[7][7], char: 't' },

      { tile: this.state.board[7][4], char: 'o' },
      { tile: this.state.board[7][5], char: 'u' },
      { tile: this.state.board[7][6], char: 't' },
      { tile: this.state.board[7][8], char: 'o' },
      { tile: this.state.board[7][9], char: 'r' },
      { tile: this.state.board[7][10], char: 'n' },

      { tile: this.state.board[5][9], char: 'e' },
      { tile: this.state.board[6][9], char: 'a' },
    ], true)
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
              final: tileWithChar.char === 'Backspace' ? false : setFinal,
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
              final: char !== 'Backspace',
            }
          }
          return rowTile;
        })
      })
    })
  }

  cleanBoard(func = () => {}) {
    this.setState({
      board: this.state.board.map(row => {
        return row.map(tile => {
            return { ...tile, char: tile.final ? tile.char : '' }
        })
      }),
    }, func)
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
    this.cleanBoard(() => {
      if (matchedWord.direction === 'row') {
       this.displayRow(matchedWord, true)
      } else {
        this.displayColumn(matchedWord, true)
      }
    })
  }

  hideWord(matchedWord: MatchedWord) {
    if (matchedWord.direction === 'row') {
      this.displayRow(matchedWord, false)
    } else {
      this.displayColumn(matchedWord, false)
    }
  }

  solve() {
    this.setState({
      loading: true,
    }, () => {
      setTimeout(() => {
        const result = [
          ...solveColumns(this.state.board, this.state.playerChars),
          ...solveRows(this.state.board, this.state.playerChars)
        ]
    
        this.setState({
          matchedWords: sortByPoints(result).slice(0,15),
          loading: false
        });
      }, 0)
    });
  }

  saveBoard() {
    this.setState({
      board: this.state.board.map(row => {
        return row.map(rowTile => {
            return { ...rowTile, final: rowTile.char !== '' }
        })
      }),
      boardIsValid: boardIsValid(this.state.board),
      matchedWords: [],
      playerChars: '',
    })
  }

  boardIs() {
    if (this.state.boardIsValid) {
      return (
       <span className="text-success">Valid</span>
      )
    }
    return (
      <span className="text-danger">InValid</span>
    )
  }

  render() {
    return (
      <div className="container mt-3">
        <h5>Board is: { this.boardIs() }</h5>
        <div className="row">
          <section className="col">
            <div className="mb-3">
              <Board board={ this.state.board } setTile={ (tile: Tile | null, char: string) => this.setTile(tile, char) } />
            </div>

            <div>
              <PlayerTiles
                tiles={ this.state.playerChars }
                isLoading={ this.state.loading }
                addTiles={ (tiles: string) => this.addTiles(tiles) }
                save={ () => this.saveBoard() }
              />
            </div>
          </section>

          <section className="col">
            <WordTable
              matchedWords={ this.state.matchedWords }
              displayWord={ (matchedWord: MatchedWord) => this.displayWord(matchedWord) }
              hideWord={ (matchedWord: MatchedWord) => this.hideWord(matchedWord) }
            />
          </section>
        </div>

      </div>
    );
  }

}
