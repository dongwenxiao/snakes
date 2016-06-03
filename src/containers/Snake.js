import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Joints from '../components/Joints'

import * as snakeActionCreator from '../actions/snake'
import * as foodActionCreator from '../actions/food'
import gameManager from '../gameManager';

var lastSnakeLastJointsLeft = 0 
var lastSnakeLastJointsTop = 0

class Snake extends Component {

  componentWillUpdate(nextProps, nextState) {

    // 每次更新组件，检查是否有碰撞
    const {snakeData, foodsData, actions} = nextProps;
    gameManager.snakeEatFoodCheck(snakeData.jointses[0], foodsData.foods, function(food){

      // 吃豆子
      actions.eatFood(food, {
        left: lastSnakeLastJointsLeft,
        top: lastSnakeLastJointsTop
      });

      // 删除豆子
      actions.remove(food);
    })
  }

  render() {
    const {snakeData, actions} = this.props;

    // 每次都记录一下，用于下次知道最后一个位置，去添加新吃的豆
    var lastSnakeLastJoints = snakeData.jointses[snakeData.jointses.length -1];
    lastSnakeLastJointsLeft = lastSnakeLastJoints.left
    lastSnakeLastJointsTop = lastSnakeLastJoints.top

    /*var Jointses = [];

    snakeData.jointses.forEach(function(joints, index){
      Jointses.push(<Joints key={"joints-" + index} data={joints}></Joints>)
    });    

    return (
      <div>{Jointses}</div>
    )*/

    return (
        <div>
          {
            snakeData.jointses.map(function(joints, index){
              return (<Joints key={"joints-" + index} data={joints}></Joints>)
            })
          }
        </div>
    )
  }

  componentDidMount(){
    const {snakeData, actions} = this.props;
    
    // this.bindKeyControl(actions)
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

      if(e.keyCode == 119){
        actions.move();
      }
    });
  }
}


Snake.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {

  const props = {
    snakeData: state.snake,
    foodsData: state.foods
  };
  return props;
}
function mapDispatchToProps(dispatch) {

  // const actions = snakeActionCreator;
  const actions = Object.assign({},foodActionCreator, snakeActionCreator);
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Snake);
