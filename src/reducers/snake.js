import * as types from '../actions/const'
import * as DIRECTION from '../constants/direction'
import * as GAME_CONFIG from '../constants/game'


var defaultState = (function() {

	var head = {
		left: 100,
		top: 100
	}

	var jointses = []

	for(var i=0; i<3; i++){
		var joints = {
			left: head.left + (GAME_CONFIG.TILE_WIDTH * i),
			top: head.top
		}

		jointses.push(joints)
	}

    return {
        jointses: jointses, // 每个关节的数据
        direction: DIRECTION.LEFT // 当前移动的方向 - 即，头关节的方向
    }
})()

export default function snakeReducer(state = defaultState, action) {

    switch (action.type) {
    	case types.TURN_LEFT:
    		var newState = Object.assign({}, state) // 新完整蛇数据
    		
    		/*// 每次移动前只允许设置1次方向值（如果上次方向未作用，则不可改变）
    		if(!newState.direction)*/
    		
    		if(newState.direction == DIRECTION.TOP)
    			newState.direction = DIRECTION.LEFT
    		else if(newState.direction == DIRECTION.LEFT)
    			newState.direction = DIRECTION.BOTTOM
    		else if(newState.direction == DIRECTION.BOTTOM)
    			newState.direction = DIRECTION.RIGHT
    		else if(newState.direction == DIRECTION.RIGHT)
    			newState.direction = DIRECTION.TOP
    		
            return newState
        case types.TURN_RIGHT:

        	var newState = Object.assign({}, state) // 新完整蛇数据

        	if(newState.direction == DIRECTION.TOP)
        		newState.direction = DIRECTION.RIGHT
        	else if(newState.direction == DIRECTION.RIGHT)
        		newState.direction = DIRECTION.BOTTOM
        	else if(newState.direction == DIRECTION.BOTTOM)
        		newState.direction = DIRECTION.LEFT
        	else if(newState.direction == DIRECTION.LEFT)
        		newState.direction = DIRECTION.TOP

            return newState
        
    	case types.MOVE:

        	var newState = Object.assign({}, state) // 新完整蛇数据
        	var head = Object.assign({}, newState.jointses[0]); // 新蛇头数据

        	// 向左移动
        	if(newState.direction == DIRECTION.LEFT){
        		head.left -= GAME_CONFIG.TILE_WIDTH
        	}

        	// 向右移动
        	if(newState.direction == DIRECTION.RIGHT){
        		head.left += GAME_CONFIG.TILE_WIDTH
        	}

        	// 向上移动
        	if(newState.direction == DIRECTION.TOP){
        		head.top -= GAME_CONFIG.TILE_HEIGHT
        	}

        	// 向下移动
        	if(newState.direction == DIRECTION.BOTTOM){
        		head.top += GAME_CONFIG.TILE_HEIGHT
        	}



        	var lastJoints = null
        	newState.jointses = newState.jointses.map(function(joints){
        		if(!lastJoints){
        			// 头    				
        			lastJoints = Object.assign({}, joints)
        			joints = head;
        		}else{
        			// 其余节
        			var tpmJoints = Object.assign({}, joints)
        			joints.left = lastJoints.left
        			joints.top = lastJoints.top        				
        			lastJoints = tpmJoints
        		}        			
        		return joints
        	})

            return newState

        case types.ADD_JOINTS:
            return state
        default:
            return state
    }
}
