import * as types from '../actions/const'
import * as DIRECTION from '../constants/direction'
import * as GAME_CONFIG from '../constants/game'
import Joints from '../models/Joints'
import * as _ from 'underscore'
import ColorGrads from './__ColorGrads'


function getColors(startColor, endColor, step){
    return new ColorGrads({
        StartColor: startColor,
        EndColor: endColor,
        Step: step
    }).Create();
}

var defaultState = []

export default function snakeReducer(state = defaultState, action) {

    switch(action.type){
        case types.SNAKE_DEAD:
            alert('You dead! 被 ' + action.data.killer + ' 杀了~')
            return state

        case types.SYNC_SNAKES:
            var snakes = action.data;
            snakes = snakes.map(function(snake){
                var colors = getColors(snake.color, '#000', snake.jointses.length)
                snake.jointses.map(function(joints, index){
                    const color = `RGB(${colors[index].join(',')})`.colorHex()
                    joints.color = color
                })

                return snake
            })
            return snakes

        default:
            return state    
    }    
}


