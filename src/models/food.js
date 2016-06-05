import * as GAME_CONFIG from '../constants/game'
import * as _ from 'underscore'

class Food {
    constructor(left, top, width = GAME_CONFIG.TILE_WIDTH, height = GAME_CONFIG.TILE_HEIGHT, color = _.simple(GAME_CONFIG.FOOD_COLORS)){
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.color = color
    }
}

export default Food