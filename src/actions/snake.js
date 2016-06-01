
import * as types from './const'

export function move(){
	return {
		type: types.MOVE
	}
}

export function turnLeft(){
	return {
		type: types.TURN_LEFT
	}
}

export function turnRight(){
	return {
		type: types.TURN_RIGHT
	}
}

