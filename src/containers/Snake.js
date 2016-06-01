import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Joints from '../components/Joints'

import * as snakeActionCreator from '../actions/snake'


class Snake extends Component {
  render() {
    const {snakeData, actions} = this.props;
    
    var Jointses = [];

    snakeData.jointses.forEach(function(joints, index){
      // console.log(joints)
      var isHead = (index == 0) ? true : false;
      Jointses.push(<Joints key={"joints-" + index} data={joints} isHead={isHead}></Joints>)
    });    

    return (
      <div>{Jointses}</div>
    )
  }

  componentDidMount(){
    const {snakeData, actions} = this.props;
    
    this.bindKeyControl(actions)
    // this.foreveryMove(actions, snakeData)
  }

  // 设置蛇不停的移动
  foreveryMove(actions, snakeData){
    setInterval(function(){
      actions.move();
    }, 1000 / snakeData.speed)
  }

  // 绑定键盘控制事件
  bindKeyControl(actions){
    window.addEventListener('keypress', function(e){
      // up  119
      // down 115
      // left 97
      // right 100
      if(e.keyCode == 97){
        actions.turnLeft();
      }

      if(e.keyCode == 100){
        actions.turnRight();
      }
    });
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
