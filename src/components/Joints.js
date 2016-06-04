/**
 * 场景
 * 地图表示游戏场景
 */

require('styles/Joints.css')

import React from 'react'


class Joints extends React.Component {
  render() {

    var joints = this.props.data
    var zIndex = this.props.zIndex
    
    var jointsStyles = {
      width: joints.width + "px",
      height: joints.height + "px",
      left: joints.left + "px",
      top: joints.top + "px",
      zIndex: zIndex
    }
    
    // var directonClass = joints.isHead ? joints.direction.toLowerCase() : ''
    var headClass = joints.isHead ? ' head ' : ''
    var colorClass = joints.color.toLowerCase()
    return (
      <div className={colorClass + ' joints ' + headClass} style={jointsStyles} />
    );
  }
}

Joints.defaultProps = {
};

export default Joints;