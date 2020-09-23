import React from "react";
import { MatchedWord } from "../Models/Tile";

type Props = {
  matchedWords: Array<MatchedWord>
  displayWord: (matchedWord: MatchedWord) => void,
  hideWord: (matchedWord: MatchedWord) => void,
}

type State = {
  selectedMatchedWord: MatchedWord | null,
}

export default class WordTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      selectedMatchedWord: null,
    }
  }

  onClick(matchedWord: MatchedWord) {
    if (this.state.selectedMatchedWord === matchedWord) {
      this.props.hideWord(matchedWord)
      this.setState({
        selectedMatchedWord: null,
      })  
    } else {
      if (this.state.selectedMatchedWord !== null) {
        this.props.hideWord(this.state.selectedMatchedWord)
        console.log('hiding');
        
      }

      this.props.displayWord(matchedWord)
      this.setState({
        selectedMatchedWord: matchedWord,
      })
    }
  }

  renderRows() {
    return this.props.matchedWords.map((matchedWord, index) => {
      const isSelected = matchedWord === this.state.selectedMatchedWord
      const className = isSelected ? 'word-table-row-selected' : ''
      return (
        <tr
          key={`${matchedWord.word}-${index}`}
          className={ className }
          onClick={() => this.onClick(matchedWord)}
          >
          <td>{ matchedWord.points }</td>
          <td>{ matchedWord.word }</td>
          <td><button>Use</button></td>
        </tr>
      )
    })
  }

  render() {
    return (
      <table className="word-table">
        <thead>
          <tr>
            <th>Points</th>
            <th>Word</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { this.renderRows() }
        </tbody>
      </table>
    );
  };
}
