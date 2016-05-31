/**
 * 场景
 * 地图表示游戏场景
 */


require('styles/Joints.css');

import React from 'react';
import * as GAME_CONFIG from '../constants/game'


class Joints extends React.Component {
  render() {

    var jointsStyles = {
      width: GAME_CONFIG.JOINTS_WIDTH,
      height: GAME_CONFIG.JOINTS_HEIGHT,
      left: this.props.left + "px",
      top: this.props.top + "px"
    }
    return (
      <div className="joints" style={jointsStyles}>
      </div>
    );
  }
}

/*Joints.propTypes = {
  left: PropTypes.int,
  top: PropTypes.int
};*/


Joints.defaultProps = {
};

export default Joints;
