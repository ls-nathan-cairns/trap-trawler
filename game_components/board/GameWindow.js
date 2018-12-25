import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Square from './Square';
import PropTypes from 'prop-types';

export default class GameWindow extends React.Component {
    static propTypes = {
      board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
      decrementFlags: PropTypes.func,
      flags: PropTypes.bool,
      getSurroundingSquares: PropTypes.func,
      incrementFlags: PropTypes.func,
      initBoard: PropTypes.func,
      pauseTimer: PropTypes.func,
      updateBoard: PropTypes.func,
    }

    checkWon = (board) => {
      return board.every(row => {
        return row.every(square => (!square.isMine && square.revealed) || square.isMine);
      });
    }

    clickSquare = (rowIndex, colIndex) => {
      const { board, decrementFlags, flags, incrementFlags, updateBoard } = this.props;
      const square = board[rowIndex][colIndex];
      const updatedBoard = board;

      if (square.revealed) return;

      if (flags) {
        const flagged = square.flagged;
        let toggle = false;
        if (flagged) {
          toggle = incrementFlags();
        } else {
          toggle = decrementFlags();
        }
        if (toggle) updatedBoard[rowIndex][colIndex].flagged = !flagged;
        updateBoard(updatedBoard);
      } else if (!square.flagged) {
        updatedBoard[rowIndex][colIndex].revealed = true;

        if (square.isMine) {
          this.gameOver("You Lost!");
          return;
        }

        if (square.neighbours == 0) {
          this.revealNeighbours(rowIndex, colIndex, updatedBoard);
        }

        if (this.checkWon(updatedBoard)) {
          this.gameOver("You won!");
        } else {
          updateBoard(updatedBoard);
        }
      }
    }

    gameOver = (status) => {
      const { initBoard, pauseTimer } = this.props;
      this.revealBoard();
      pauseTimer();

      Alert.alert(
        'Game Over!',
        status,
        [{
          text: 'Play Again',
          onPress: () => initBoard(),
        }]
      );
    }

    revealBoard = () => {
      const { board, updateBoard } = this.props;

      const revealedBoard = board.map(row => {
        return row.map(square => {
          if (square.flagged) {
            return square
          } else {
            return { ...square, revealed: true };
          }
        });
      });

      updateBoard(revealedBoard)
    }

    revealNeighbours = (rowIndex, colIndex, board) => {
      const { getSurroundingSquares } = this.props;
      const surroundingSquares = getSurroundingSquares(rowIndex, colIndex, board);

      surroundingSquares.map(square => {
        const neighbour = board[square.rowIndex][square.colIndex];
        if (!neighbour.revealed && !neighbour.isMine && !neighbour.flagged) {
          board[square.rowIndex][square.colIndex].revealed = true;

          if (neighbour.neighbours == 0) {
            this.revealNeighbours(neighbour.rowIndex, neighbour.colIndex, board);
          }
        }
      });
    }

    render () {
      const { board } = this.props;

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
    flex: 10,
    padding: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});