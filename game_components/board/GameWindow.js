import React from 'react';
import { StyleSheet, View } from 'react-native';
import Square from './Square';
import PropTypes from 'prop-types';
import colours from '../../config/ColourConfig';

export default class GameWindow extends React.Component {
    static propTypes = {
      numMines: PropTypes.number,
      height: PropTypes.number,
      width: PropTypes.number,
    }

    state = {
      board: [],
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
        const x = val % 10;
        const y = (val - x) / 10;
        return {
          x: x,
          y: y,
        };
      });

      return mineIndicies;
    }

    createBoardWithMines = (mineIndicies) => {
      const { height, width } = this.props;

      const board = new Array(height).fill(0).map(() => new Array(width).fill({
        isMine: false,
        neighbours: 0,
      }));

      for (let i = 0; i < mineIndicies.length; i += 1) {
        const x = mineIndicies[i].x;
        const y = mineIndicies[i].y;
        board[x][y] = {
          ...board[x][y], isMine: true,
        };
      }

      return board;
    }

    initNeighbours = (boardWithMines) => {
      const { height, width } = this.props;
      const board = boardWithMines;

      for (let i = 0; i < height; i += 1) {
        for (let j = 0; j < width; j += 1) {
          const numMines = this.checkForNeighbouringMines(i, j, board);
          board[i][j] = {
            ...board[i][j], neighbours: numMines,
          };
        }
      }

      return board;
    }

    checkForNeighbouringMines = (i, j, board) => {
      const { height, width } = this.props;
      let numMines = 0;

      // Check top
      if (i > 0) {
        if (board[i-1][j].isMine) numMines+= 1;
      }

      // Check top right
      if (i > 0 && j < width - 1) {
        if (board[i-1][j+1].isMine) numMines += 1;
      }

      // Check right
      if (j < width -1) {
        if (board[i][j+1].isMine) numMines += 1;
      }

      // Check bottom right
      if (j < width - 1 && i < height - 1) {
        if (board[i+1][j+1].isMine) numMines += 1;
      }

      // Check bottom
      if (i < height - 1) {
        if (board[i+1][j].isMine) numMines += 1;
      }

      // Check bottom left
      if (i < height - 1 && j > 0) {
        if (board[i+1][j-1].isMine) numMines += 1;
      }

      // Check left
      if (j > 0) {
        if (board[i][j-1].isMine) numMines += 1;
      }

      // Check top left
      if (j > 0 && i > 0) {
        if (board[i-1][j-1].isMine) numMines += 1;
      }

      return numMines;
    }

    initBoard = () => {
      const mineIndicies = this.generateMineIndicies();
      const boardWithMines = this.createBoardWithMines(mineIndicies);
      const board = this.initNeighbours(boardWithMines);

      return board;
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
                  { row.map((square, colIndex) => {
                    return (
                      <Square
                        key={rowIndex *  board[0].length + colIndex}
                        isMine={square.isMine}
                        neighbours={square.neighbours}
                      />
                    )})}
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