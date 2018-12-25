import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colours from '../../config/ColourConfig';
import Timer from './Timer';
import PropTypes from 'prop-types';

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
        <View style={styles.flagsCounterContainer}>
          <Text>{numFlags}</Text>
        </View>
        <View style={styles.restartContainer}>
          <TouchableOpacity
            onPress={this.handleRestartPress}>
            <Text>Restart!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flagButtonContainer}>
          <TouchableOpacity
            onPress={this.toggleFlags}>
            <Text>{ flags ? 'FLAGS' : 'MINES'} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timerContainer}>
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
  flagsCounterContainer: {
    flex: 1,
  },
  restartContainer: {
    flex: 1,
    padding: 10,
  },
  flagButtonContainer: {
    flex: 1,
    padding: 10,
  },
  timerContainer: {
    flex: 1,
  }
})
