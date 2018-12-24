import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colours from '../../config/ColourConfig';
import Timer from './Timer';
import PropTypes from 'prop-types';

export default class TopBar extends React.Component {
  static propTypes = {
    restartGame: PropTypes.func,
    seconds: PropTypes.number,
    startTimer: PropTypes.func,
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

  render () {
    const { seconds, startTimer } = this.props;

    return (
      <View style={styles.actionBarContaner}>
        <View style={styles.flagsCounterContainer}>
        </View>
        <View style={styles.settingsContainer}>
        </View>
        <View style={styles.restartContainer}>
          <TouchableOpacity
            onPress={this.handleRestartPress}>
            <Text>Restart!</Text>
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
  actionBarContaner: {
    flex: 1,
    flexDirection: 'row',
  },
  flagsCounterContainer: {
    backgroundColor: colours.red,
    flex: 1,
  },
  restartContainer: {
    backgroundColor: colours.blue,
    flex: 1,
  },
  settingsContainer: {
    backgroundColor: colours.background,
    flex: 1,
  },
  timerContainer: {
    backgroundColor: colours.green,
    flex: 1,
  }
})
