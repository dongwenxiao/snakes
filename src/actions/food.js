
import * as types from './const'

export function add(){
	return {
		type: types.ADD_FOOD
	}
}

export function remove(food){
	return {
		type: types.REMOVE_FOOD,
		data: {food}
	}
}

