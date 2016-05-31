/**
 * 场景
 * 地图表示游戏场景
 */


require('styles/Joints.css');

import React from 'react';
import * as GAME_CONFIG from '../constants/game'


class JointsComponent extends React.Component {
  render() {

    var jointsStyles = {
      width: GAME_CONFIG.JOINTS_WIDTH,
      height: GAME_CONFIG.JOINTS_HEIGHT,
      left: this.props.left,
      top: this.props.top
    }
    return (
      <div className="joints" style={jointsStyles}>
      </div>

    );
  }
}




JointsComponent.defaultProps = {
};

export default JointsComponent;
