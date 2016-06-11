import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Joints from '../components/Joints'
import * as snakeActionCreator from '../actions/snake'


class Snakes extends Component {

  render() {
    const allSnakeJiontses = []
    const {snakes} = this.props

    // 遍历蛇
    snakes.forEach(function(snake, snakeIndex){
      if(snake.isDead) return
      // 遍历关节
      snake.jointses.forEach(function(joints, jointsIndex){
        const key = `joints-${snakeIndex}-${jointsIndex}`
        allSnakeJiontses.push(
          <Joints name={snake.name} key={key} data={joints} zIndex={snake.jointses.length - jointsIndex} color={snake.color}/>
        )
      })
    })

    return (
      <div>
        {allSnakeJiontses}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const props = {
    snakes: state.snakes
  }

  return props
}
export default connect(mapStateToProps)(Snakes)
