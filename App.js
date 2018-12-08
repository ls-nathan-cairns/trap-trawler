import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from './game_components/TopBar';
import GameWindow from './game_components/GameWindow';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TopBar/>
        <GameWindow/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
