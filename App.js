import React from 'react'
import { StyleSheet, View } from 'react-native'
import TopBar from './game_components/TopBar'
import GameWindow from './game_components/board/GameWindow'
import colours from './config/ColourConfig';

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <TopBar/>
        <GameWindow
          numMines={10}
          height={20}
          width={10}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.background,
  }
})
