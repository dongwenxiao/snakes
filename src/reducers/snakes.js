import * as types from '../actions/const'
import * as DIRECTION from '../constants/direction'
import * as GAME_CONFIG from '../constants/game'
import Joints from '../models/Joints'

var defaultState = []

export default function snakeReducer(state = defaultState, action) {
    // console.log('action.type' + action.type)
    switch(action.type){
        case types.SYNC_SNAKES:

            // var snakes = action.data.snakes;
            var snakes = action.data;

            // console.log('SYNC_SNAKES')
            // console.log(snakes)

            snakes = snakes.map(function(snake){
                snake.jointses = snake.jointses.map(function(joints){
                    // 为了兼容旧数据格式
                    return new Joints(joints.left, joints.top, joints.width, joints.height, joints.direction, joints.color, joints.isHead)
                })

                return snake
            })

            var newState = action.data
            return newState
        default:
            // console.log('default snakes')
            // console.log(state)
            return state    
    }

    
}
