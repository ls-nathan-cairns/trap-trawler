import React from 'react'
import { Platform, SafeAreaView, StyleSheet } from 'react-native'
import TopBar from './game_components/top_bar/TopBar'
import GameWindow from './game_components/board/GameWindow'

export default class App extends React.Component {
  state = {
    board: [],
    height: 10,
    numMines: 10,
    offset: null,
    seconds: 0,
    timerInterval: null,
    width:  5,
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

  delta = () => {
    const { offset } = this.state;

    const now = Date.now();
    const delta = now - offset;

    this.setState({ offset: now });
    return delta;
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

    this.resetTimer();
    this.startTimer();
    this.setState({ board })
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

  resetTimer = () => {
    const { timerInterval } = this.state;
    clearInterval(timerInterval);

    this.setState({
      seconds: 0,
      timerInterval: null,
    });
  }

  startTimer = () => {
    const { timerInterval } = this.state;

    if (!timerInterval) {
      this.setState({
        offset: Date.now(),
        timerInterval: setInterval(() => this.updateTimer(), 1000)
      });
    }
  }

  updateTimer = () => {
    const { seconds } = this.state;

    const newSeconds = seconds + this.delta();
    this.setState({ seconds: newSeconds });
  }

  pauseTimer = () => {
    const { timerInterval } = this.state;

    if (timerInterval) {
      clearInterval(timerInterval);
      this.setState({
        timerInterval: null,
      });
    }
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
    const { board, seconds } = this.state;

    return (
      <SafeAreaView style={styles.droidSafeArea}>
        <TopBar
          restartGame={this.initBoard}
          seconds={seconds}
          startTimer={this.startTimer}
        />
        <GameWindow
          board={board}
          getSurroundingSquares={this.getSurroundingSquares}
          initBoard={this.initBoard}
          pauseTimer={this.pauseTimer}
          updateBoard={this.updateBoard}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
})
