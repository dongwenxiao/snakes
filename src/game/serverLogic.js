/**
 * 服务端端业务
 */

// import socket from './socket'
import * as actions from '../constants/socket'
import * as GAME_CONFIG from '../constants/game'
import * as DIRECTION from '../constants/direction'
import Snake from '../models/snake'
import Food from '../models/food'
import * as _ from 'underscore'
// var Snake = require('../models/Snake')

// console.log('Snake111')
// var sss = new Snake()
// console.log(sss)

var gameLoopSt = null;

var __cacheGameDataLast = {}
var __cacheGameData = {
    snakes: [],
    foods: []
}
function setCacheData(key, val){
    __cacheGameDataLast = Object.assign({}, __cacheGameData)
    __cacheGameData[key] = val
}
function getCacheData(key){
    return __cacheGameData[key]
}
function getLastCacheData(key){
    return __cacheGameDataLast[key]
}

// 随机生成  2/4 到 3/4 区间的值
function getRandom(max, unit){
    var part4 = Math.ceil((max / unit) / 4)
    return (Math.ceil(part4 * 2 * Math.random()) + part4) * unit
}

module.exports = function(io) {

    /*var cacheGameData = {
            foods: [{
            left: 90,
            top: 100,
            width: GAME_CONFIG.TILE_WIDTH,
            height: GAME_CONFIG.TILE_HEIGHT,
            color: 'green'
        }],
        snakes: [
        {
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
        }
        ]
    }*/


    
    // socket.on(actions.ACTION_LEAVE, function(data) {})
    // socket.on(actions.ACTION_START, function(data) {})
    // socket.on(actions.ACTION_RESTART, function(data) {})
    // socket.on(actions.ACTION_MOVE, function(data) {})
    // socket.on(actions.ACTION_TURN_LEFT, function(data) {})
    // socket.on(actions.ACTION_TURN_RIGHT, function(data) {})

    const gameLogic = {

        init(socket) {

            // 初始化豆子数据
            this.addFoods()

            // 所有蛇自动移动
            this.autoLoopSnakeMove();

            // 初始化事件
            this.onJoin(socket)
            this.onLeave(socket)
            this.onMove(socket)
            this.onTurnLeft(socket)
            this.onTurnRight(socket)
            this.onTurnTop(socket)
            this.onTurnBottom(socket)
            this.onSnakeBirth(socket)

            // init map data

            // const colCount = GAME_CONFIG.MAP_WIDTH / GAME_CONFIG.TILE_WIDTH
            // const rowCount = GAME_CONFIG.MAP_HEIGHT / GAME_CONFIG.TILE_HEIGHT
        },

        onJoin(socket){
            const me = this
            socket.on(actions.ACTION_JOIN, function(data) {

                var snake = _.find(getCacheData('snakes'), function(snake){
                    return snake.id == socket.id
                })
                if(snake) return

                // 新蛇实例
                var newUsername = data.name
                console.log(`${newUsername}(${socket.id}) join `)

                me.snakeJoin(socket.id, newUsername)

                /*var newSnake = new Snake(
                    socket.id,
                    newUsername,
                    GAME_CONFIG.SNAKE_SPEED,
                    0,
                    0,
                    getRandom(GAME_CONFIG.MAP_WIDTH, GAME_CONFIG.TILE_WIDTH),
                    getRandom(GAME_CONFIG.MAP_HEIGHT, GAME_CONFIG.TILE_HEIGHT)
                )

                // 插入蛇群
                var snakes = getCacheData('snakes')
                snakes.push(newSnake)
                setCacheData('snakes', snakes)*/

                // 发送豆子状态
                me.sendToOne(socket.id, actions.MSG_FOODS_STATUS, getCacheData('foods'))

                // 常规检查
                me.gameDataCheck()

            })
        },
        onLeave(socket){
            const me = this
            socket.on('disconnect', function(msg){

                var snake = _.find(getCacheData('snakes'), function(snake){
                    return snake.id == socket.id
                })

                if(snake){

                    setCacheData('snakes', _.without(getCacheData('snakes'), snake))

                    console.log(`${snake.name}(${socket.id}) leave `)

                    me.gameDataCheck()
                }
            });
        },
        onMove(socket, cb){
            const me = this
            socket.on(actions.ACTION_MOVE, function(data) {

                // 先判断能否快速前进
                if(me.snakeExpendJoints(socket.id)){
                    // console.log(`${socket.id} ACTION_MOVE`)

                    // 控制当前操作的蛇move
                    var snakes = getCacheData('snakes').map(function(snake){
                        if(snake.id == socket.id){
                            return me.snakeMove(snake, 3)
                        }
                        return snake
                    })
                    setCacheData('snakes', snakes)

                    me.gameDataCheck()
                    cb && cb()
                }                
            })
        },
        onTurnLeft(socket, cb){
            const me = this
            socket.on(actions.ACTION_TURN_LEFT, function(data) {

                me.snakeTurn(socket.id, DIRECTION.LEFT)

                me.gameDataCheck()

                cb && cb()
            })
        },
        onTurnRight(socket, cb){
            const me = this
            socket.on(actions.ACTION_TURN_RIGHT, function(data) {

                me.snakeTurn(socket.id, DIRECTION.RIGHT)

                cb && cb()

                me.gameDataCheck()
            })
        },
        onTurnTop(socket, cb){
            const me = this
            socket.on(actions.ACTION_TURN_TOP, function(data) {

                me.snakeTurn(socket.id, DIRECTION.TOP)

                cb && cb()
                
                me.gameDataCheck()
            })
        },

        onTurnBottom(socket, cb){
            const me = this
            socket.on(actions.ACTION_TURN_BOTTOM, function(data) {

                me.snakeTurn(socket.id, DIRECTION.BOTTOM)

                cb && cb()
                
                me.gameDataCheck()
            })
        },
        onSnakeBirth(socket, cb){
            const me = this
            socket.on(actions.MSG_BIRTH, function(data){

                me.snakeBirth(socket.id)

                cb && cb()
                
                me.gameDataCheck()
            })
        },

        snakeBirth(id){
            const snakes = getCacheData('snakes')
            const snake = _.find(snakes, function(snake){
                return snake.id == id
            })
            if(snake.isDead)
                // 需要保持的数据
                var lastData = {
                    dead: snake.dead,
                    kill: snake.kill
                }
                Object.assign(snake, this.snakeCreate(snake.id, snake.name), lastData)
        },

        snakeCreate(id, name){
            var newSnake = new Snake(
                id,
                name,
                GAME_CONFIG.SNAKE_SPEED,
                0,
                0,
                getRandom(GAME_CONFIG.MAP_WIDTH, GAME_CONFIG.TILE_WIDTH),
                getRandom(GAME_CONFIG.MAP_HEIGHT, GAME_CONFIG.TILE_HEIGHT),
                0,
                false,
                _.sample(GAME_CONFIG.SNAKE_COLORS)
            )

            return newSnake
        },

        snakeJoin(id, name){
            
            const newSnake = this.snakeCreate(id, name)
            
            // 插入蛇群
            var snakes = getCacheData('snakes')
            snakes.push(newSnake)
            setCacheData('snakes', snakes)
        },

        // return
        // true: 自身减少一个关键，并加速
        // false: 关键是小于3个，不能减少，不能加速
        snakeExpendJoints(snakeId){
            var canMoveFast = false
            var snakes = getCacheData('snakes').map(function(snake){
                if(snake.id == snakeId){
                    var jointsCount = snake.jointses.length
                    if(jointsCount > 3){
                        canMoveFast = true
                        snake.jointses = snake.jointses.splice(0, jointsCount - 1)
                    }
                    return snake
                }
                return snake
            })
            setCacheData('snakes', snakes)

            return canMoveFast
        },

        snakeMove(snake, step = 1){
            
            for(var i=0; i<step; i++){

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

                /*console.log('step:'+step)
                var tmp = []
                snake.jointses.forEach(function(j){
                    tmp.push(j.left)
                })
                console.log(tmp.join(','))*/
            }

            return snake
        },

        snakeTurnLeft(snake){

            var head = snake.jointses[0]

            if(head.direction == DIRECTION.TOP)
                head.direction = DIRECTION.LEFT
            else if(head.direction == DIRECTION.LEFT)
                head.direction = DIRECTION.BOTTOM
            else if(head.direction == DIRECTION.BOTTOM)
                head.direction = DIRECTION.RIGHT
            else if(head.direction == DIRECTION.RIGHT)
                head.direction = DIRECTION.TOP   

            snake.jointses[0] = head

            return snake
        },

        snakeTurnRight(snake){
            var head = snake.jointses[0]

            if(head.direction == DIRECTION.TOP)
                head.direction = DIRECTION.RIGHT
            else if(head.direction == DIRECTION.RIGHT)
                head.direction = DIRECTION.BOTTOM
            else if(head.direction == DIRECTION.BOTTOM)
                head.direction = DIRECTION.LEFT
            else if(head.direction == DIRECTION.LEFT)
                head.direction = DIRECTION.TOP

            snake.jointses[0] = head
            
            return snake
        },
        snakeTurn(id, direction){
            var snakes = getCacheData('snakes').map(function(snake){
                if(snake.id == id){
                    var head = snake.jointses[0]
                        head.direction = direction
                    return snake
                }
                return snake
            })
            setCacheData('snakes', snakes)
        },

        snakeEatFood(snake, food){
            const lastSnakes = getLastCacheData('snakes')
            const lastSnake = _.find(lastSnakes, function(_snake){
                return snake.id == _snake.id
            })

            const lastestJoints = lastSnake.jointses[lastSnake.jointses.length - 1]
            const newJoints = Object.assign({}, lastestJoints, { color: food.color})
            snake.jointses.push(newJoints)

            return snake
        },

        snakeDeadHandle(deadSankesMapping){
            /*const me = this
            var snakes = getCacheData('snakes')
            var deadSankes = []
            
            deadSankesMapping.forEach(function(mapping){

                // 暂存所有已死亡蛇
                deadSankes.push(mapping.deadSnake)

                // 给胜利者kill + 1
                snakes.forEach(function(snake){
                    if(mapping.killerSnake.id == snake.id){
                        snake.kill += 1
                    }
                })
                
            })

            // 通知已死亡的蛇们
            deadSankesMapping.forEach(function(mapping){
                var snake = mapping.deadSnake
                var killer = mapping.killerSnake
                me.sendToOne(snake.id, actions.MSG_DEAD, { killer: killer.name })
            })

            // 移除已死亡的蛇
            snakes = _.difference(snakes, deadSankes)
            setCacheData('snakes', snakes)*/

            const me = this
            const snakes = getCacheData('snakes')
            const snakeCount = snakes.length
            const mappingCount = deadSankesMapping.length

            // console.log(deadSankesMapping)

            for (var j = 0; j < mappingCount; j++) {
                const mapping = deadSankesMapping[j]
                const deadSnake = mapping.deadSnake
                const killerSnake = mapping.killerSnake
                var isSetDeadSnake = false,
                    isSetKillerSnake = false

                for (var i = 0; i < snakeCount; i++) {
                    const snake = snakes[i]

                    // 设置死亡
                    if (snake.id == deadSnake.id){
                        snake.dead += 1
                        snake.isDead = true
                        isSetDeadSnake = true
                        // console.log('dead snake:')
                        // console.log(snake.name)
                        continue
                    }

                    // 给胜利者kill + 1
                    if (snake.id == killerSnake.id){
                        snake.kill += 1
                        isSetKillerSnake = true
                        // console.log('killer snake:')
                        // console.log(snake.name)
                        continue
                    }

                    // 两个蛇都设置后可以跳出本次循环
                    if(isSetDeadSnake && isSetKillerSnake)
                        break
                }

                // 通知已死亡的蛇们
                me.sendToOne(deadSnake.id, actions.MSG_DEAD, { killer: killerSnake.name })
            }

        },

        removeFoods(foods){
            const newFoods = _.difference(getCacheData('foods'), foods)
            setCacheData('foods', newFoods)
        },

        addFoods(){
            const foods = getCacheData('foods')
            if(foods.length < GAME_CONFIG.MAX_FOOD_COUNT - 1){
                
                for(var i=0; i<GAME_CONFIG.RANDOM_ADD_COUNT; i++){
                    const color = _.sample(GAME_CONFIG.FOOD_COLORS)
                    const left = getRandom(GAME_CONFIG.MAP_WIDTH, GAME_CONFIG.TILE_WIDTH)
                    const top = getRandom(GAME_CONFIG.MAP_HEIGHT, GAME_CONFIG.TILE_HEIGHT)

                    var newFood = new Food(left, top, GAME_CONFIG.TILE_WIDTH, GAME_CONFIG.TILE_HEIGHT, color)                    
                    foods.push(newFood)
                }

                setCacheData('foods', foods)
            }
        },

        autoLoopSnakeMove() {
            const me = gameLogic

            // all snake 每秒移动1次
            const snakes = getCacheData('snakes')
            snakes.map(function(snake) {
                return snake.isDead ? snake : me.snakeMove(snake)
            })
            setCacheData('snakes', snakes)
            
            me.gameDataCheck()

            // next loop
            gameLoopSt && clearTimeout(gameLoopSt)
            gameLoopSt = setTimeout(me.autoLoopSnakeMove, 1000 / GAME_CONFIG.SNAKE_SPEED)
        },

        // 每次更新游戏数据后做一次检查并将最新状态发送给客户端
        gameDataCheck() {

            // 检查吃豆
            this.checkEatFood()

            // 检查死亡
            this.checkKill()

            // 发送最新的状态给客户端
            this.sendToAll()
        },

        checkEatFood(){
            const me = this

            // 被吃的豆子s
            var eatedFoods = []

            getCacheData('snakes').forEach(function(snake){
                const head = snake.jointses[0]
                getCacheData('foods').forEach(function(food){
                    if(head.left == food.left && head.top == food.top){

                        // food be eat 
                        eatedFoods.push(food)
                        snake = me.snakeEatFood(snake, food)
                    }
                })
            })
            
            if(eatedFoods.length > 0){
                this.removeFoods(eatedFoods)
                this.addFoods()
                this.sendToAll(actions.MSG_FOODS_STATUS, getCacheData('foods'))
            }
        },

        checkKill(){
            const deadSankes = []

            const snakes = this.filterLiveSnakes(getCacheData('snakes'))
            const count = snakes.length

            if(count < 2) return

            for(var i=0; i<count - 1; i++){
                const snake1 = snakes[i]
                const head1 = snake1.jointses[0]

                for(var j=i+1; j<count; j++){
                    const snake2 = snakes[j]
                    const head2 = snake2.jointses[0]

                    // 1 头与头
                    if(head1.left == head2.left && head1.top == head2.top){
                        // 俩蛇都死了
                        deadSankes.push({
                            deadSnake: snake1,
                            killerSnake: snake2
                        })
                        deadSankes.push({
                            deadSnake: snake2,
                            killerSnake: snake1
                        })
                        break
                    }else{
                        // 2 头与身
                        // 蛇2身 与 蛇1头
                        var jointsLength = snake2.jointses.length
                        for(var x=0; x<jointsLength; x++){
                            var joints = snake2.jointses[x]
                            if(head1.left == joints.left && head1.top == joints.top){
                                deadSankes.push({
                                    deadSnake: snake1,
                                    killerSnake: snake2
                                })
                                break
                            }
                        }
                        // 蛇2头 与 蛇1身
                        jointsLength = snake1.jointses.length
                        for(var x=0; x<jointsLength; x++){
                            var joints = snake1.jointses[x]
                            if(head2.left == joints.left && head2.top == joints.top){
                                 deadSankes.push({
                                    deadSnake: snake2,
                                    killerSnake: snake1
                                })
                                break
                            }
                        }
                    }
                }
            }

            this.snakeDeadHandle(deadSankes)
            // console.log(deadSankes)

        },

        filterLiveSnakes(snakes){
            if(!snakes)
                snakes = getCacheData('snakes')
            return _.filter(snakes, function(snake){
                return snake.isDead == false
            })
        },

        sendToCurrent() {

        },

        sendToAll(type = actions.MSG_ALL_STATUS, data = getCacheData('snakes')) {

            // 默认情况，过滤死亡的蛇
            // if(type == actions.MSG_ALL_STATUS){
            //     data = this.filterLiveSnakes(getCacheData('snakes'))
            // }
            // console.log(`sendToAll type:${type} data:`)
            // console.log(data)
            io.sockets.emit(type, data)
        },

        sendToOne(socketId, type, data) {
            // console.log(`sendToOne type:${type} data:`)
            // console.log(data)
            io.sockets.sockets[socketId] && io.sockets.sockets[socketId].emit && io.sockets.sockets[socketId].emit(type, data)
        }

    }

    return gameLogic
}
