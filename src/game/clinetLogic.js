/**
 * 客户端业务
 */

import  socket from './socket'
import * as actions from '../constants/socket'



/*
socket.on(actions.MSG_BIRTH, function(data){
	// 实例当前蛇的初始化状态，如果已存在，则覆盖

})

socket.on(actions.MSG_DEAD, function(data){
	// 通知当前蛇死亡
})
*/
const gameLogic = {
	test(){
		socket.send('my other event', 'test hello 1')
	},

	init(actions){		
		this.syncSankesState(actions.syncSnakes)
	},

	// 全部snake的状态，用于绘制所有的蛇
	syncSankesState(syncSnakesAction) {
		socket.on(actions.MAS_ALL_STATUS, function(data){
			
			console.log('server data')
			console.log(data)

			syncSnakesAction(data)
		})
	}

}

export default gameLogic