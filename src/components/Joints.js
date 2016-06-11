/**
 * 场景
 * 地图表示游戏场景
 */

require('styles/Joints.css')

import React from 'react'
import * as GAME_CONFIG from '../constants/game'

class Joints extends React.Component {
  render() {

    const joints = this.props.data
    const zIndex = this.props.zIndex
    const name = this.props.name
    const color = this.props.color

    const jointsStyles = {
      width: joints.width + "px",
      height: joints.height + "px",
      left: joints.left + "px",
      top: joints.top + "px",
      background: joints.color,
      zIndex: zIndex
    }

    const nameStyle = {
      top: - (GAME_CONFIG.JOINTS_HEIGHT / 3 * 4),
      left: GAME_CONFIG.JOINTS_WIDTH,
      fontSize: GAME_CONFIG.JOINTS_HEIGHT - 2 + "px",
      lineHight: GAME_CONFIG.JOINTS_HEIGHT + "px"
    }    
    const headClass = joints.isHead ? 'head' : ''
    // const directonClass = joints.isHead ? joints.direction.toLowerCase() : ''
    const directonClass = joints.direction.toLowerCase()
    const colorClass = joints.isHead ? color.toLowerCase() : ''
    const classes = `joints ${headClass} ${colorClass} ${directonClass}`
    // const classes = `joints ${headClass} ${directonClass}`
    return (
      <div className={classes} style={jointsStyles} >
        {joints.isHead ? <span className="name" style={nameStyle} >{name}</span> : ''}
      </div>
    )
  }
}

Joints.defaultProps = {
};

export default Joints;