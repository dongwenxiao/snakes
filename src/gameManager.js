
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
	start: function(){
		gameLoop();
	},
	pause: function(){

	},

	// 检测蛇吃豆
	snakeEatFoodCheck: function(snakeHead, foods, handle){
		// debugger;
		foods.forEach(function(food){
			if(snakeHead.left == food.left && snakeHead.top == food.top)
				handle(food, snakeHead, foods)
		})
	}
}

module.exports = gameManager