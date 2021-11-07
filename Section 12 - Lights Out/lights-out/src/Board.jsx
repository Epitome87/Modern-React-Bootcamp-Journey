import React from 'react';
import './Board.css';
import Cell from './Cell';

class Board extends React.Component {
  static defaultProps = {
    numRows: 5,
    numCols: 5,
    chanceLightStartsOn: 0.25,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
    this.toggleLights = this.toggleLights.bind(this);
  }

  // Create a board numRows high / numCols wide, each cell randomly lit or unlit
  createBoard() {
    let board = [];

    // Create array-of-arrays of true/false values
    for (let row = 0; row < this.props.numRows; row++) {
      let row = [];

      for (let col = 0; col < this.props.numCols; col++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }

      board.push(row);
    }

    return board;
  }

  toggleLights(coord) {
    let { numRows, numCols } = this.props;
    let board = this.state.board;
    let [row, col] = coord.split('-').map(Number);

    function flipCell(row, col) {
      // If this coord is actually on the board, flip it
      if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
        board[row][col] = !board[row][col];
      }
    }

    // Flip this cell and the cells around it
    flipCell(row, col); // This cell

    // Win when every cell is turned off
    let hasWon = board.every((row) => row.every((cell) => cell === false));

    // this.setState( { board, hasWon });
    this.setState({ board: [...board], hasWon: hasWon });
  }

  render() {
    if (this.state.hasWon) {
      return (
        <div className='Board__title--winner'>
          <span className='neon'>YOU</span>
          <span className='flux'>WIN!</span>
        </div>
      );
    }

    const tableBoard = [];
    for (let r = 0; r < this.props.numRows; r++) {
      let row = [];

      for (let c = 0; c < this.props.numCols; c++) {
        row.push(
          <Cell
            key={`${r}${c}`}
            isLit={this.state.board[r][c]}
            coord={`${r}-${c}`}
            toggleLights={this.toggleLights}
          />
        );
      }

      tableBoard.push(<tr key={r}>{row}</tr>);
    }

    return (
      <div>
        <div className='Board__title'>
          <div className='neon'>Lights</div>
          <div className='flux'>Out!</div>
        </div>

        <table className='Board'>
          <tbody>{tableBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
