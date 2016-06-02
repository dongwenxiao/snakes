/**
 * 场景
 * 地图表示游戏场景
 */

require('styles/Joints.css')

import React from 'react'


class Joints extends React.Component {
  render() {

    var joints = this.props.data;

    var jointsStyles = {
      width: joints.width + "px",
      height: joints.height + "px",
      left: joints.left + "px",
      top: joints.top + "px"
    }
    
    var directonClass = joints.isHead ? joints.direction.toLowerCase() : '';

    return (
      <div className={'joints ' + directonClass} style={jointsStyles} />
    );
  }
}

Joints.defaultProps = {
};

export default Joints;