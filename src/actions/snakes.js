
import * as types from './const'

export function syncSnakes(snakes){
	return {
		type: types.SYNC_SNAKES,
		data: snakes
	}
}