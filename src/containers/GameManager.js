import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as foodsActionCreator from '../actions/foods'
import * as snakeActionCreator from '../actions/snake'
import * as snakesActionCreator from '../actions/snakes'

import gameClinetLogic from '../game/clinetLogic'
// import gameServerLogic from '../game/serverLogic'

class GameManager extends Component { 

  constructor(props) {
    super(props);

    const { actions } = this.props


    gameClinetLogic.init(actions)
    
    this.bindKeyControl(actions);

    // gameLogic.test()
  }

  render() {
    return (
      <div className="gameManager" />
    )
  }

  // 绑定键盘控制事件
  bindKeyControl(actions){

    const MaxInOneSecond = 5 // 每秒不超过3次
    var st = null
    var canHanler = true
    // window.addEventListener('keypress', function(e){
    window.addEventListener('keypress', function(e){



      if(e.keyCode == 97){
        gameClinetLogic.turnLeft();
      }

      if(e.keyCode == 100){
        gameClinetLogic.turnRight();
      }
      
      if(canHanler){
        
        // up  119
        // down 115
        // left 97
        // right 100
        

        if(e.keyCode == 119){
          gameClinetLogic.move();
        }

        // 连按控制
        canHanler = false
        st = setTimeout(function(){
          canHanler = true
          clearTimeout(st)
        }, 1000 / MaxInOneSecond)
      }
    })
  }
}


function mapStateToProps(state) {  
  const props = {
    allState: state
  };
  return props;
}
function mapDispatchToProps(dispatch) {  
  const actions = Object.assign({}, foodsActionCreator, snakesActionCreator)
  const actionMap = { actions: bindActionCreators(actions, dispatch) }
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(GameManager);
