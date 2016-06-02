import * as types from '../actions/const'
import * as GAME_CONFIG from '../constants/game'

var defaultState = (function() {

    var foods = [{
        left: 90,
        top: 100,
        width: GAME_CONFIG.TILE_WIDTH,
        height: GAME_CONFIG.TILE_HEIGHT,
        color: 'green'
    },{
        left: 400,
        top: 400,
        width: GAME_CONFIG.TILE_WIDTH,
        height: GAME_CONFIG.TILE_HEIGHT,
        color: 'green'
    }]

    return {
        foods: foods
    }
})()

export default function snakeReducer(state = defaultState, action) {

    switch (action.type) {
    	case types.ADD_FOOD:
    		var newState = Object.assign({}, state) // 新完整蛇数据    
            return newState
        case types.REMOVE_FOOD:
            var newState = Object.assign({}, state) // 新完整蛇数据    
            
            var needRemoveFood = action.data.food
            var newFoods = []
            newState.foods.forEach(function(food){
                if(!(needRemoveFood.left == food.left && needRemoveFood.top == food.top))
                    newFoods.push(food)
            })

            newState.foods = newFoods;

            return newState
        default:
            return state
    }
}
