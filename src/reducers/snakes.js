import * as types from '../actions/const'
import * as DIRECTION from '../constants/direction'
import * as GAME_CONFIG from '../constants/game'

class Joints {
    constructor(left, top, width, height, direction, color = 'red', isHead = false){
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.direction = direction
        this.color = color
        this.isHead = isHead
    }
}

var defaultState = (function() {   
    return {
        snakes: []
    }
})()

export default function snakeReducer(state = defaultState, action) {

    switch(action.type){
        case types.SYNC_SNAKES:

            console.log('reducer data')
            console.log(action.data)

            var snakes = action.data.snakes;

            snakes = snakes.map(function(snake){
                snake.jointses = snake.jointses.map(function(joints){
                    // 为了兼容旧数据格式
                    return new Joints(joints.left, joints.top, joints.width, joints.height, joints.direction, joints.color, joints.head)
                })

                return snake
            })

            var newState = action.data
            // var newState = Object.assign({}, state, {snakes})
            // console.log(newState)

            return newState
        default:
            console.log('default snakes')
            console.log(state)
            return state    
    }

    
}
