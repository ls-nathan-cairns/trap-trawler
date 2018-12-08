import React from 'react';
import { StyleSheet, View, Text } from  'react-native';

export default class TopBar extends React.Component {
    render () {
        return (
            <View style={styles.actionBarContainer}>
                <Text>Action Bar</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    actionBarContainer: {
        backgroundColor: 'blue',
        flex: 1
    }
});