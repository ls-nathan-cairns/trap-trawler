import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Square from './Square';
import PropTypes from 'prop-types';
import colours from '../../config/ColourConfig';

export default class GameWindow extends React.Component {
    static propTypes = {
      gameOver: PropTypes.func,
      height: PropTypes.number,
      numMines: PropTypes.number,
      width: PropTypes.number,
    }

    state = {
      board: [],
    }

    getSurroundingSquares = (i, j, board) => {
      const { height, width } = this.props;
      let surroundingSquares = [];

      // Check top
      if (i > 0) surroundingSquares.push(board[i-1][j]);

      // Check top right
      if (i > 0 && j < width - 1) surroundingSquares.push(board[i-1][j+1]);

      // Check right
      if (j < width -1) surroundingSquares.push(board[i][j+1]);

      // Check bottom right
      if (j < width - 1 && i < height - 1) surroundingSquares.push(board[i+1][j+1]);

      // Check bottom
      if (i < height - 1) surroundingSquares.push(board[i+1][j]);

      // Check bottom left
      if (i < height - 1 && j > 0) surroundingSquares.push(board[i+1][j-1]);

      // Check left
      if (j > 0) surroundingSquares.push(board[i][j-1]);

      // Check top left
      if (j > 0 && i > 0) surroundingSquares.push(board[i-1][j-1]);

      return surroundingSquares;
    }

    checkWon = (board) => {
      return board.every(row => {
        return row.every(square => (!square.isMine && square.revealed) || square.isMine);
      });
    }

    clickSquare = (rowIndex, colIndex) => {
      const { board } = this.state;

      const square = board[rowIndex][colIndex];
      if (square.isRevealed) return;

      const updatedBoard = board;
      updatedBoard[rowIndex][colIndex].revealed = true;

      if (square.isMine) {
        this.gameOver();
        return;
      }

      if (square.neighbours == 0) {
        this.revealNeighbours(rowIndex, colIndex, updatedBoard);
      }

      if (this.checkWon(updatedBoard)) {
        this.gameWin();
      } else {
        this.setState({ board: updatedBoard });
      }
    }

    createBoardWithMines = (mineIndicies) => {
      const { height, width } = this.props;

      const board = new Array(height).fill(0).map((undefined, rowIndex) => 
        new Array(width).fill({}).map((undefined, colIndex) => { 
          return {
            colIndex: colIndex,
            isMine: false,
            neighbours: 0,
            revealed: false,
            rowIndex: rowIndex,
          }
        }));

      for (let i = 0; i < mineIndicies.length; i += 1) {
        const rowIndex = mineIndicies[i].rowIndex;
        const colIndex = mineIndicies[i].colIndex;
        board[rowIndex][colIndex] = {
          ...board[rowIndex][colIndex],
          isMine: true,
        };
      }

      return board;
    }

    gameOver = () => {
      this.revealBoard();
      Alert.alert('Game Over');
    }

    gameWin = () => {
      this.revealBoard();
      Alert.alert('Game Won');
    }

    generateMineIndicies = () => {
      const { numMines, height, width } = this.props
      const numSquares = height * width;
      let range = Array(numSquares).fill(0).map((x, y) => x + y);

      for ( let i = 0; i < numMines; i += 1) {
        const swapIndex = Math.floor((Math.random() * numSquares));
        const swapValue = range[i];
        range[i] = range[swapIndex];
        range[swapIndex] = swapValue;
      }
      range = range.splice(0, numMines);

      const mineIndicies = range.map(val => {
        const rowIndex = Math.floor(Math.abs(val -1) / width);
        const colIndex = Math.abs(val - 1) % width;
        return {
          rowIndex: rowIndex,
          colIndex: colIndex,
        };
      });

      return mineIndicies;
    }

    initBoard = () => {
      const mineIndicies = this.generateMineIndicies();
      const boardWithMines = this.createBoardWithMines(mineIndicies);
      const board = this.initNeighbours(boardWithMines);

      return board;
    }

    initNeighbours = (boardWithMines) => {
      const { height, width } = this.props;
      const board = boardWithMines;

      for (let i = 0; i < height; i += 1) {
        for (let j = 0; j < width; j += 1) {
          const surroundingSquares = this.getSurroundingSquares(i, j, board);
          let numMines = 0;

          surroundingSquares.map(square => {
            if (square.isMine) numMines += 1;
          });

          board[i][j] = {
            ...board[i][j], neighbours: numMines,
          };
        }
      }

      return board;
    }

    revealBoard = () => {
      const { board } = this.state;

      const revealedBoard = board.map(row => {
        return row.map(square => {
          return { ...square, revealed: true };
        });
      });

      this.setState({ board: revealedBoard });
    }

    revealNeighbours = (rowIndex, colIndex, board) => {
      const surroundingSquares = this.getSurroundingSquares(rowIndex, colIndex, board);

      surroundingSquares.map(square => {
        const neighbour = board[square.rowIndex][square.colIndex];
        if (!neighbour.revealed && !neighbour.isMine) {
          board[square.rowIndex][square.colIndex].revealed = true;

          if (neighbour.neighbours == 0) {
            this.revealNeighbours(neighbour.rowIndex, neighbour.colIndex, board);
          }
        }
      });
    }

    componentDidMount () {
      this.setState({
        board: this.initBoard(),
      });
    }

    render () {
      const { board } = this.state; 
      return (
        <View style={styles.gameWindowContainer}>
          {
            board.map((row, rowIndex) => {
              return (
                <View style={styles.row} key={rowIndex}>
                  {
                    row.map((square, colIndex) => {
                      return (
                        <Square
                          key={rowIndex *  board[0].length + colIndex}
                          data={square}
                          clickHandler={() => this.clickSquare(rowIndex, colIndex)}
                        />
                      )}
                    )
                  }
                </View>)
            })
          }
        </View>
      );
    }
}

const styles = StyleSheet.create({
  gameWindowContainer: {
    backgroundColor: colours.red,
    flex: 7,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colours.green,
  },
});