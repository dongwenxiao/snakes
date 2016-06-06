
import * as types from './const'

export function syncSnakes(snakes){
	return {
		type: types.SYNC_SNAKES,
		data: snakes
	}
}

export function onSnakeDead(){
	return {
		type: types.SNAKE_DEAD
	}
}