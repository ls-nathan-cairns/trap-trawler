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
        style={ data.revealed ? [styles.square, styles.squareRevealed] : styles.square}
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
    backgroundColor: colours.red,
    flex: 1,
    flexDirection: 'column',
    borderColor: colours.black,
    borderWidth: 2,
  },
  squareRevealed: {
    backgroundColor: colours.green,
  }
});
