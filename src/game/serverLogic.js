/**
 * 服务端端业务
 */

// import socket from './socket'
import * as actions from '../constants/socket'
import * as GAME_CONFIG from '../constants/game'
import * as DIRECTION from '../constants/direction'
import Snake from '../models/Snake'
// var Snake = require('../models/Snake')

// console.log('Snake111')
// var sss = new Snake()
// console.log(sss)

var gameLoopSt = null;


module.exports = function(io) {

    var cacheGameData = {
        snakes: [
        /*{
            id: '',
            name: '',
            speed: 0,
            kill: 0,
            eat: 0,
            jointses: [{
                left: 330,
                top: 460,
                width: 10,
                height: 10,
                direction: 'LEFT',
                color: 'red',
                head: true
            },{
                left: 340,
                top: 460,
                width: 10,
                height: 10,
                direction: 'LEFT',
                color: 'red',
                head: false
            },{
                left: 350,
                top: 460,
                width: 10,
                height: 10,
                direction: 'LEFT',
                color: 'red',
                head: false
            }]
        }*/
        ]
    }


    
    // socket.on(actions.ACTION_LEAVE, function(data) {})
    // socket.on(actions.ACTION_START, function(data) {})
    // socket.on(actions.ACTION_RESTART, function(data) {})
    // socket.on(actions.ACTION_MOVE, function(data) {})
    // socket.on(actions.ACTION_TURN_LEFT, function(data) {})
    // socket.on(actions.ACTION_TURN_RIGHT, function(data) {})

    const gameLogic = {

        init(socket) {
            // socket.on(actions.ACTION_JOIN, function(data) {})
            // socket.on(actions.ACTION_LEAVE, function(data) {})
            // socket.on(actions.ACTION_START, function(data) {})
            // socket.on(actions.ACTION_RESTART, function(data) {})
            // socket.on(actions.ACTION_MOVE, function(data) {})
            // socket.on(actions.ACTION_TURN_LEFT, function(data) {})
            // socket.on(actions.ACTION_TURN_RIGHT, function(data) {})


            this.initJoin(socket)

            // init map data

            const colCount = GAME_CONFIG.MAP_WIDTH / GAME_CONFIG.TILE_WIDTH
            const rowCount = GAME_CONFIG.MAP_HEIGHT / GAME_CONFIG.TILE_HEIGHT


            this.loopSnakeMove();
        },

        initJoin(socket){
            socket.on(actions.ACTION_JOIN, function(data) {
                var newUsername = data.name

                // 随机生成  2/4 到 3/4 区间的值
                function getRandom(max, unit){
                    var part4 = Math.ceil((max / unit) / 4)
                    return (Math.ceil(part4 * 2 * Math.random()) + part4) * unit
                }

                // 创建一个新蛇 并加入蛇群
                // console.log(Snake)
                // var test = new Snake()


                // console.log('test')
                // console.log(test)

                var newSnake = new Snake(
                    socket.id,
                    newUsername,
                    GAME_CONFIG.SNAKE_SPEED,
                    0,
                    0,
                    getRandom(GAME_CONFIG.MAP_WIDTH, GAME_CONFIG.TILE_WIDTH),
                    getRandom(GAME_CONFIG.MAP_HEIGHT, GAME_CONFIG.TILE_HEIGHT)
                )

                // var newSnake = new Snake(socket.id, newUsername)

                // console.log(socket.id)
                // console.log(newUsername)
                // console.log('newSnake')
                // console.log(newSnake)

                console.log(newUsername + ' join')
                cacheGameData.snakes.push(newSnake)

            })
        },

        loopSnakeMove() {
            var me = gameLogic

            // all snake 每秒移动1次

            cacheGameData.snakes = cacheGameData.snakes.map(function(snake) {

                

                // 下一关关节 移动到 上一个关节位置
                var lastJoints = null
                snake.jointses = snake.jointses.map(function(joints) {
                    if (!lastJoints) {
                        // 头                    
                        lastJoints = Object.assign({}, joints)

                        // var head = snake.jointses[0]
                        var head = joints

                        // 向左移动
                        if (head.direction == DIRECTION.LEFT) {
                            head.left -= GAME_CONFIG.TILE_WIDTH
                        }

                        // 向右移动
                        if (head.direction == DIRECTION.RIGHT) {
                            head.left += GAME_CONFIG.TILE_WIDTH
                        }

                        // 向上移动
                        if (head.direction == DIRECTION.TOP) {
                            head.top -= GAME_CONFIG.TILE_HEIGHT
                        }

                        // 向下移动
                        if (head.direction == DIRECTION.BOTTOM) {
                            head.top += GAME_CONFIG.TILE_HEIGHT
                        }

                        // 保证永远不会移出地图            
                        if (head.top < 0) {
                            head.top += GAME_CONFIG.MAP_HEIGHT
                        }
                        if (head.top >= GAME_CONFIG.MAP_HEIGHT) {
                            head.top -= GAME_CONFIG.MAP_HEIGHT
                        }
                        if (head.left < 0) {
                            head.left += GAME_CONFIG.MAP_WIDTH
                        }
                        if (head.left >= GAME_CONFIG.MAP_WIDTH) {
                            head.left -= GAME_CONFIG.MAP_WIDTH
                        }

                    } else {
                        // 其余节
                        var tpmJoints = Object.assign({}, joints)
                        joints.left = lastJoints.left
                        joints.top = lastJoints.top
                        joints.direction = lastJoints.direction
                        lastJoints = tpmJoints
                    }
                    return joints
                })

                return snake
            })

            // 发新的状态
            me.sendToAll(cacheGameData);

            // for loop
            gameLoopSt && clearTimeout(gameLoopSt)
            gameLoopSt = setTimeout(me.loopSnakeMove, 1000)
        },

        sendToCurrent() {

        },

        sendToAll(gameData) {
            // console.log('MAS_ALL_STATUS:')
            // console.log(cacheGameData)
            
            gameData = gameData ? gameData : cacheGameData
            io.sockets.emit(actions.MAS_ALL_STATUS, gameData)

            // var a = gameData.snakes[0].jointses[0].left
            // var b = gameData.snakes[0].jointses[1].left
            // var c = gameData.snakes[0].jointses[2].left
            // console.log(` ${a}  ${b}  ${c}`)
        },

        sendToOne() {

        },






    }

    return gameLogic
}
