import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colours from '../../config/ColourConfig';

export default class TopBar extends React.Component {
  render () {
    return (
      <View style={styles.actionBarContaner}>
        <View style={styles.flagsCounterContainer}>
          <Text>hello</Text>
        </View>
        <View style={styles.timerContainer}>
          <Text>Goodbye</Text>
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
    backgroundColor: colours.black,
    flex: 1,
  }
})
