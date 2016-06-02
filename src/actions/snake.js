
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

export function eatFood(food, lastSnakeLastJointsPos){
	return {
		type: types.EAT_FOOD,
		data: {
			food,
			lastSnakeLastJointsPos
		}
	}
}
