import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colours from '../../config/ColourConfig';
import Timer from './Timer';
import PropTypes from 'prop-types';

export default class TopBar extends React.Component {
  static propTypes = {
    seconds: PropTypes.number,
    startTimer: PropTypes.func,
  }

  render () {
    const { seconds, startTimer } = this.props;

    return (
      <View style={styles.actionBarContaner}>
        <View style={styles.flagsCounterContainer}>
          <Text>hello</Text>
        </View>
        <View style={styles.timerContainer}>
        </View>
        <View style={styles.flagsCounterContainer}>
          <Text>hello</Text>
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
  timerContainer: {
    backgroundColor: colours.green,
    flex: 1,
  }
})
