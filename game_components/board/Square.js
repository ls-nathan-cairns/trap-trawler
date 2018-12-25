import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import colours from '../../config/ColourConfig';

export default class Square extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
    data: PropTypes.object,
  }

  render () {
    const { clickHandler, data } = this.props;

    return (
      <TouchableOpacity
        style={ data.revealed ? [styles.square, styles.squareRevealed] : (
          data.flagged ? [styles.square, styles.squareFlagged]: styles.square)
        }
        onPress={clickHandler}
      >
        { data.revealed ? (
          <Text>{data.isMine ? '*' : data.neighbours}</Text>
        ) : undefined}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  square: {
    backgroundColor: colours.square,
    elevation: 1,
    flex: 1,
    flexDirection: 'column',
    margin: 5,
  },
  squareRevealed: {
    backgroundColor: colours.squareRevealed,
  },
  squareFlagged: {
    backgroundColor: colours.squareFlagged,
  },
});
