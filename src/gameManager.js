
import {CPS} from './constants/game'

var gameLoopSt = null;
function gameLoop(){
	// console.log('gameLoop')
	
	var listeners = gameManager.loopListeners;
	if(listeners && listeners.length > 0){
		listeners.forEach(function(fun){
			// console.log(fun)
			fun();
		})
	}

	gameLoopSt && clearTimeout(gameLoopSt);
	gameLoopSt = setTimeout(gameLoop, 1000 / CPS);

}


var gameManager = {
	loopListeners: [],
	addLoopListener: function(listener){
		this.loopListeners.push(listener)
	},
	gameStart: function(){
		gameLoop();
	}
}

module.exports = gameManager