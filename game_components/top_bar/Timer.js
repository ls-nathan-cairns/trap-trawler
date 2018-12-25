import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types';
import gloabalStyles from '../../config/GlobalStyles';

export default class TopBar extends React.Component {
  static propTypes = {
    seconds: PropTypes.number,
  }

  secondsToHHMMSS = (rawSeconds) => {
    const seconds = parseInt((rawSeconds / 1000) % 60);
    const minutes = parseInt((rawSeconds / (1000 * 60)) % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  render () {
    const { seconds } = this.props;

    return (
      <Text style={gloabalStyles.topBarText}>{this.secondsToHHMMSS(seconds)}</Text>
    )
  }
}