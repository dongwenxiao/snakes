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
    const {snakes, actions} = this.props
    // const snakes = snakesData

    // console.log(snakes)

    // 遍历蛇
    snakes.forEach(function(snake, snakeIndex){
      // 遍历关节
      snake.jointses.forEach(function(joints, jointsIndex){
        const key = `joints-${snakeIndex}-${jointsIndex}`
        allSnakeJiontses.push(
          <Joints name={snake.name} key={key} data={joints} zIndex={snake.jointses.length - jointsIndex}/>
        )
      })
    })

    // console.log('render snake data')
    // console.log(snakesData)

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
function mapDispatchToProps(dispatch) {

  const actions = snakeActionCreator;
  const actionMap = { actions: bindActionCreators(actions, dispatch) }
  return actionMap
}
export default connect(mapStateToProps, mapDispatchToProps)(Snakes)
