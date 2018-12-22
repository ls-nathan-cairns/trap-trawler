import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import colours from '../../config/ColourConfig';

export default class Square extends React.Component {
  static propTypes = {
    isMine: PropTypes.bool,
    neighbours: PropTypes.number,
  }

  render () {
    const { isMine, neighbours } = this.props;

    return (
      <View style={styles.square}>
        <Text>{isMine ? '*' : neighbours}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  square: {
    backgroundColor: colours.red,
    flex: 1,
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 2,
  },
});
