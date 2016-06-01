import * as types from '../actions/const'
import * as DIRECTION from '../constants/direction'
import * as GAME_CONFIG from '../constants/game'


var defaultState = (function() {

	var head = {
		left: 100,
		top: 100,
		width: GAME_CONFIG.JOINTS_WIDTH,
		height: GAME_CONFIG.JOINTS_HEIGHT,
		direction: DIRECTION.LEFT
	}

	var speed = 2; // 每秒走几个格子

	var jointses = []

	for(var i=0; i<3; i++){

		var joints = Object.assign({}, head, {
			left: head.left + (GAME_CONFIG.TILE_WIDTH * i),
			top: head.top,
			direction: DIRECTION.LEFT
		});
		
		jointses.push(joints)
	}

    return {
        jointses: jointses, // 每个关节的数据
        speed: speed
        // direction: DIRECTION.LEFT // 当前移动的方向 - 即，头关节的方向
    }
})()

export default function snakeReducer(state = defaultState, action) {

    switch (action.type) {
    	case types.TURN_LEFT:
    		var newState = Object.assign({}, state) // 新完整蛇数据    		
    		var head = newState.jointses[0];

    		if(head.direction == DIRECTION.TOP)
    			head.direction = DIRECTION.LEFT
    		else if(head.direction == DIRECTION.LEFT)
    			head.direction = DIRECTION.BOTTOM
    		else if(head.direction == DIRECTION.BOTTOM)
    			head.direction = DIRECTION.RIGHT
    		else if(head.direction == DIRECTION.RIGHT)
    			head.direction = DIRECTION.TOP   		

            return newState

        case types.TURN_RIGHT:

        	var newState = Object.assign({}, state) // 新完整蛇数据
        	var head = newState.jointses[0];

        	if(head.direction == DIRECTION.TOP)
        		head.direction = DIRECTION.RIGHT
        	else if(head.direction == DIRECTION.RIGHT)
        		head.direction = DIRECTION.BOTTOM
        	else if(head.direction == DIRECTION.BOTTOM)
        		head.direction = DIRECTION.LEFT
        	else if(head.direction == DIRECTION.LEFT)
        		head.direction = DIRECTION.TOP

            return newState
        
    	case types.MOVE:

        	var newState = Object.assign({}, state) // 新完整蛇数据
        	var head = Object.assign({}, newState.jointses[0]); // 新蛇头数据

        	// 向左移动
        	if(head.direction == DIRECTION.LEFT){
        		head.left -= GAME_CONFIG.TILE_WIDTH
        	}

        	// 向右移动
        	if(head.direction == DIRECTION.RIGHT){
        		head.left += GAME_CONFIG.TILE_WIDTH
        	}

        	// 向上移动
        	if(head.direction == DIRECTION.TOP){
        		head.top -= GAME_CONFIG.TILE_HEIGHT
        	}

        	// 向下移动
        	if(head.direction == DIRECTION.BOTTOM){
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
        			joints.direction = lastJoints.direction
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
