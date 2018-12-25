import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colours from '../../config/ColourConfig';
import Timer from './Timer';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../config/GlobalStyles';

export default class TopBar extends React.Component {
  static propTypes = {
    flags: PropTypes.bool,
    numFlags: PropTypes.number,
    restartGame: PropTypes.func,
    seconds: PropTypes.number,
    startTimer: PropTypes.func,
    toggleFlags: PropTypes.func,
  }

  handleRestartPress = () => {
    const { restartGame } = this.props;

    Alert.alert(
      'Restart?',
      'Are you sure you want to restart?',
      [{
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Restart',
        onPress: () => restartGame(),
      },]
    );
  }

  toggleFlags = () => {
    const { toggleFlags } = this.props;
    toggleFlags();
  }

  render () {
    const { flags, numFlags, seconds, startTimer } = this.props;

    return (
      <View style={styles.actionBarContainer}>
        <View style={styles.optionContainer}>
          <Text style={globalStyles.topBarText}>{numFlags}</Text>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={this.handleRestartPress}>
            <Icon name='refresh' size={30} color={colours.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={this.toggleFlags}>
            <Icon name={ flags ? 'flag' : 'bomb'} size={30} color={colours.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <Timer
            seconds={seconds}
            startTimer={startTimer}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionBarContainer: {
    backgroundColor: colours.topBar,
    flex: 1,
    flexDirection: 'row',
    elevation: 1,
  },
  optionContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
