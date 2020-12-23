import React from "react";
import "./style.css";

import Board from './Components/Board';
import PlayerTiles from './Components/PlayerTiles';
import WordTable from './Components/WordTable';
import BoardReadSave from './Components/BoardReadSave';
import { MatchedWord, NewTile, StartBoard, Tile } from "./Models/Tile";
import { solveColumns } from "./Solvers/ColumnSolver";
import { solveRows } from "./Solvers/RowSolver";
import { sortByPoints } from './Solvers/SolverUtil';
import { countRowPoints } from "./Solvers/RowPoints";
import * as BoardActions from "./Utils/BoardActions";

type Props = {}

type State = {
  board: Array<Array<Tile>>,
  matchedWords: Array<MatchedWord>,
  playerChars: string,
  boardIsValid: boolean,
  loading: boolean,
  selectedWord: MatchedWord | null,
  localStorageBoards: Array<{ name: string, board: string }>,
}

export default class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    const localStorageBoards = BoardActions.readLocalStorageBoards();
    let board = localStorageBoards.length === 0
      ? StartBoard
      : BoardActions.read(localStorageBoards[0].name)

    if (localStorageBoards.length === 0) {
      BoardActions.save('board1', board);
    }

    this.state = {
      board: board,
      playerChars: '',
      matchedWords: [],
      boardIsValid: true,
      loading: false,
      selectedWord: null,
      localStorageBoards: localStorageBoards,
    }
  }

  setPlayerChars(tiles: string) {
    this.setState({
      playerChars: tiles
    }, this.solve)
  }

  setMultipleTiles(newTiles: Array<NewTile>, func = () => {}) {
    this.setState({
      board: BoardActions.setNewTilesToBoard(newTiles, this.state.board)
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
      board: BoardActions.cleanBoard(this.state.board)
    }, func)
  }

  displayRow(matchedWord: MatchedWord, display: boolean, func: () => void) {
    const list: Array<{ row: number; column: number; char: string }> = []
    let index = 0;
    const wordLengthInBoard = (matchedWord.word.length + matchedWord.column)
    for (let column = matchedWord.column; column < wordLengthInBoard; column++, index++) {
      if (!this.state.board[matchedWord.row][column].final) {
        list.push({
          row: matchedWord.row,
          column: column,
          char: display ? matchedWord.word[index] : ''
        });
      }
    }
    this.setMultipleTiles(list, func)
  }

  displayColumn(matchedWord: MatchedWord, display: boolean, func: () => void) {
    const list: Array<{ row: number; column: number; char: string }> = []
    let index = 0;
    const wordLengthInBoard = (matchedWord.word.length + matchedWord.row)
    for (let row = matchedWord.row; row < wordLengthInBoard; row++, index++) {
      if (!this.state.board[row][matchedWord.column].final) {
        list.push({
          row: row,
          column: matchedWord.column,
          char: display ? matchedWord.word[index] : ''
        });
      }
    }
    this.setMultipleTiles(list, func)
  }

  displayWord(matchedWord: MatchedWord | null) {
    this.cleanBoard(() => {
      this.setState({
        selectedWord: matchedWord
      })

      if (matchedWord === null) {
        return;
      } else if (matchedWord.direction === 'row') {
       this.displayRow(matchedWord, true, () => countRowPoints(this.state.board))
      } else {
        this.displayColumn(matchedWord, true, () => countRowPoints(this.state.board))
      }
    })
  }

  hideWord(matchedWord: MatchedWord) {
    if (matchedWord.direction === 'row') {
      this.displayRow(matchedWord, false, () => {})
    } else {
      this.displayColumn(matchedWord, false, () => {})
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
          matchedWords: sortByPoints(result).slice(0,100),
          loading: false
        });
      }, 0)
    });
  }

  createNewBoard(name: string) {
    this.setState({
      localStorageBoards: (this.state.localStorageBoards || [])
        .filter(localStorageBoard => localStorageBoard.name !== name)
        .concat({ name, board: '' }),
    })
  }

  useWord() {
    this.setState({
      board: BoardActions.setAllToFinal(this.state.board),
      matchedWords: [],
      selectedWord: null,
      playerChars: '',
    });
  }

  render() {
    return (
      <div className="container m-3">
        <div className="mb-2">
          <BoardReadSave
            board={ this.state.board }
            localStorageBoards={ this.state.localStorageBoards }
            createNewBoard={ (name: string) => this.createNewBoard(name) }
          />
        </div>
        <hr />
        <div className="columns">
          <section className="column">
            <div className="mb-3">
              <Board
                board={ this.state.board }
                setTile={ (tile: Tile | null, char: string) => this.setTile(tile, char) }
              />
            </div>

            <div>
              <PlayerTiles
                tiles={ this.state.playerChars }
                isLoading={ this.state.loading }
                setPlayerChars={ (chars: string) => this.setPlayerChars(chars) }
              />
            </div>
          </section>

          <section className="column">
            <WordTable
              matchedWords={ this.state.matchedWords }
              displayWord={ (matchedWord: MatchedWord | null) => this.displayWord(matchedWord) }
              hideWord={ (matchedWord: MatchedWord) => this.hideWord(matchedWord) }
              useWord={ () => this.useWord() }
            />
          </section>
        </div>
      </div>
    );
  }
}
