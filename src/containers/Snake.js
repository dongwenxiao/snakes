
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import Joints from '../components/Joints'
import * as GAME_CONFIG from '../constants/game'

import * as snakeActionCreator from '../actions/snake'

/* Populated by react-webpack-redux:reducer */
class Snake extends Component {
  render() {
    const {snakeData, actions} = this.props;

    // console.log(this.props)

    var Jointses = [];

    snakeData.jointses.forEach(function(joints, index){
      // console.log("joints-"+index + "   ："+ joints.left)
      Jointses.push(<Joints key={"joints-"+index} left={joints.left} top={joints.top}></Joints>)
    });    

    return (
      <div>{Jointses}</div>
    )
  }

  componentDidMount(){
    const {snakeData, actions} = this.props;
    setInterval(function(){
      actions.move();
    }, 1000)

    setTimeout(function(){
      actions.turnLeft();
    },2000)
    
    
    setTimeout(function(){
      actions.turnRight();
    },3000)
  }
}


Snake.propTypes = {
  actions: PropTypes.object.isRequired
};

// Snake.defaultProps = {
//   jointsCount: 3 // 默认蛇有3节
// };


function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    snakeData: state.snake
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = snakeActionCreator;
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Snake);
