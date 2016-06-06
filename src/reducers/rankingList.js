import * as types from '../actions/const'
import * as GAME_CONFIG from '../constants/game'

var defaultState = []

export default function rankingListReducer(state = defaultState, action) {
    
    switch(action.type){
        case types.REFRESH_RANKING_LIST:
            
            return state
        default:
            return state    
    }

    
}
