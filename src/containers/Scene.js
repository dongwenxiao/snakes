import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import BgLayer from '../Components/BgLayer'
import PlayLayer from '../Components/PlayLayer'
import RankingList from './RankingList';

import * as foodActionCreator from '../actions/food'
import * as snakeActionCreator from '../actions/snake'

import * as GAME_CONFIG from '../constants/game'

// import gameManager from '../gameManager';


require('normalize.css/normalize.css');
require('styles/Scene.css');

class Scene extends Component {
  render() {

    var sceneStyles = {
  		width: GAME_CONFIG.MAP_WIDTH,
  		height: GAME_CONFIG.MAP_HEIGHT
  	}

    // 每次更新组件，检查是否有碰撞
    /*const {gameState, actions} = this.props;
    gameManager.snakeEatFoodCheck(gameState.snake.jointses[0], gameState.foods.foods, function(food){
      console.log('eat---------------------')
      console.log(food)
    })*/


    return (
      <div className="scene" style={sceneStyles}>
  		  <BgLayer />
  		  <PlayLayer />
        <RankingList />
      </div>
    );
  }


  componentDidMount(){
    const {gameState, actions} = this.props;
    // console.log(gameState)
    // gameManager.start();


    /*gameManager.addLoopListener(function(){
      gameManager.snakeEatFoodCheck(gameState.snake.jointses[0], gameState.foods.foods, function(food){
        console.log('eat---------------------')
        console.log(food)
      })  
    })*/
    

    // setTimeout(function(){
    //   actions.snake_move();
    //   // console.log(gameState.snake.jointses[0].left)
    // },1000)

    
  }
}

Scene.defaultProps = {};

function mapStateToProps(state) {  

  const props = {
    gameState: state
  };

  // console.log('state-----------------------')
  // console.log(props.gameState.snake.jointses[0].left)
  // console.log('state-----------------------')

  return props;
}
function mapDispatchToProps(dispatch) {
  // const actions  = Object.assign(foodActionCreator, snakeActionCreator)

  // Secne 做为场景组件，需要控制其下面的全部子子组件，所以合并了actionCreator
  // 合并多个actionCreator  ，其中添加了actionCreator的前缀‘snake_’  用于区分不同组件的actionCreator
  function actionsCompose(actionCreators){
    var actions = {};

    actionCreators.forEach(function(creatorObj){
      for(var funName in creatorObj.creator){
        actions[creatorObj.prefix + funName] = creatorObj.creator[funName]
      }
    })
    return actions
  }

  const actions = actionsCompose([
    {prefix: 'food_', creator: foodActionCreator},
    {prefix: 'snake_', creator: snakeActionCreator}
  ])
 
  return { actions: bindActionCreators(actions, dispatch) };
}
export default Scene;
// export default connect(mapStateToProps, mapDispatchToProps)(Scene);
