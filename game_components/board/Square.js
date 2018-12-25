import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import colours from '../../config/ColourConfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../config/GlobalStyles';

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
          data.isMine ?
            <Icon name='bomb' size={30} color={colours.white}/>
            :
            <Text style={globalStyles.squareText}>{data.neighbours > 0 ? data.neighbours : ''}</Text>
        ) 
          :
          (data.flagged ?
            <Icon name='flag' size={30} color={colours.white}/> : undefined
          )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  square: {
    alignItems: 'center',
    backgroundColor: colours.square,
    elevation: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 5,
  },
  squareRevealed: {
    backgroundColor: colours.squareRevealed,
  },
  squareFlagged: {
    backgroundColor: colours.squareFlagged,
  },
});
