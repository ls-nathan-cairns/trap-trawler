import React from 'react'
import { StyleSheet, View } from 'react-native'
import TopBar from './game_components/TopBar'
import GameWindow from './game_components/board/GameWindow'
import colours from './config/ColourConfig';

export default class App extends React.Component {
  state = {
    board: [],
    height: 10,
    width:  5,
    numMines: 10,
  }

  createBoardWithMines = (mineIndicies) => {
    const { height, width } = this.state;

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

  generateMineIndicies = () => {
    const { numMines, height, width } = this.state;
    const numSquares = height * width;

    let range = Array(numSquares).fill(0).map((x, y) => x + y);

    for ( let i = 0; i < numMines; i += 1) {
      const swapIndex = Math.floor((Math.random() * numSquares));
      const swapValue = range[i];

      range[i] = range[swapIndex];
      range[swapIndex] = swapValue;
    }

    const rangeSplice = range.splice(0, numMines);

    const mineIndicies = rangeSplice.map(val => {
      const rowIndex = Math.floor(Math.abs(val -1) / width);
      const colIndex = Math.abs(val - 1) % width;

      return {
        rowIndex: rowIndex,
        colIndex: colIndex,
      };
    });

    return mineIndicies;
  }

  getSurroundingSquares = (i, j, board) => {
    const { height, width } = this.state;
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

  initBoard = () => {
    const mineIndicies = this.generateMineIndicies();
    const boardWithMines = this.createBoardWithMines(mineIndicies);
    const board = this.initNeighbours(boardWithMines);

    this.setState({ board: board })
  }

  initNeighbours = (boardWithMines) => {
    const { height, width } = this.state;
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

  updateBoard = (board) => {
    this.setState({
      board: board,
    });
  }

  componentDidMount() {
    this.initBoard();
  }

  render () {
    const { board } = this.state;

    return (
      <View style={styles.container}>
        <TopBar/>
        <GameWindow
          board={board}
          initBoard={this.initBoard}
          getSurroundingSquares={this.getSurroundingSquares}
          updateBoard={this.updateBoard}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.background,
  }
})
