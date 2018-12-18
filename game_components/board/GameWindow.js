import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class GameWindow extends React.Component {
    static propTypes = {
        numMines: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
    }

    state = {
        mineArray: [],
    }

    generateMineIndexes = () => {
        const { numMines, height, width } = this.props
        const numSquares = height * width;
        const range = Array(numSquares).fill(0).map((x, y) => x + y);

        for ( let i = 0; i < numMines; i += 1) {
            const swapIndex = Math.floor((Math.random() * numSquares));
            const swapValue = range[i];
            range[i] = range[swapIndex];
            range[swapIndex] = swapValue;
        }

        return range.slice(0, numMines);
    }

    componentDidMount () {
        this.generateMineIndexes();
    }


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