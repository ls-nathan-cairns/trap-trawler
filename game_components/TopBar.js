import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import colours from '../config/ColourConfig';

export default class TopBar extends React.Component {
  render () {
    return (
      <View style={styles.actionBarContainer}>
        <Text>Action Bar</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionBarContainer: {
    backgroundColor: colours.blue,
    flex: 1
  }
})
