import * as types from '../actions/const'
import * as DIRECTION from '../constants/direction'


var defaultState = (function() {
    return {
        jointses: [{}], // 每个关节的数据
        direction: DIRECTION.RIGHT // 当前移动的方向 - 即，头关节的方向
    }
})();

export default function counter(state = defaultState, action) {
    switch (action.type) {
        case types.ADD_JOINTS:
            return state
        case types.MOVE_FRONT:
            return state
        case types.MOVE_LEFT:
            return state
        case types.MOVE_RIGHT:
            return state
        default:
            return state;
    }
}
