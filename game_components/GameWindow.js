import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class GameWindow extends React.Component {
    render () {
        return (
            <View style={styles.gameWindowContainer}>
                <Text>Game Window</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gameWindowContainer: {
        backgroundColor: 'red',
        flex: 7
    }
});