import * as types from './const'


export function syncFoods(foods){
	return {
		type: types.SYNC_FOODS,
		data: {foods}
	}
}

