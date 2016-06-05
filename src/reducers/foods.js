import * as types from '../actions/const'
import * as GAME_CONFIG from '../constants/game'

/*class Food {
    constructor(left, top, width, height, color){
        this.left = left,
        this.top = top,
        this.width = width,
        this.height = height,
        this.color = color
    }
}*/

var defaultState = (function() {

    var foods = [
/*    {
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
    }*/
    ]

    return { foods }
})()

export default function foodsReducer(state = defaultState, action) {

    switch (action.type) {
        case types.SYNC_FOODS:
            var foods = action.data.foods;
            console.log('SYNC_FOODS')
            console.log(foods)
            return { foods }
    	/*case types.ADD_FOOD:
    		var newState = Object.assign({}, state) // 新完整蛇数据    
            return newState
        case types.REMOVE_FOOD:
            var newState = Object.assign({}, state) // 新完整蛇数据    
            
            // 移除被吃的豆子
            var needRemoveFood = action.data.food
            var newFoods = []
            newState.foods.forEach(function(food){
                if(!(needRemoveFood.left == food.left && needRemoveFood.top == food.top))
                    newFoods.push(food)
            })

            // 随机添加新豆子 
            if(newFoods.length < GAME_CONFIG.MAX_FOOD_COUNT - 1){
                for(var i=0; i<2;i++){

                    var left = 0, top = 0, color = 'red'

                    var colors = GAME_CONFIG.FOOD_COLORS;
                    color = colors[Math.floor(Math.random() * colors.length)]
                    var h_tile_count = GAME_CONFIG.MAP_WIDTH / GAME_CONFIG.TILE_WIDTH
                    var v_tile_count = GAME_CONFIG.MAP_HEIGHT / GAME_CONFIG.TILE_HEIGHT

                    left = Math.floor(h_tile_count * Math.random()) * GAME_CONFIG.TILE_WIDTH
                    top = Math.floor(v_tile_count * Math.random()) * GAME_CONFIG.TILE_HEIGHT

                    var newFood = new Food(left, top, GAME_CONFIG.TILE_WIDTH, GAME_CONFIG.TILE_HEIGHT, color)
                    newFoods.push(newFood)
                }    
            }
            
            newState.foods = newFoods;

            return newState*/
        default:
            return state
    }
}
