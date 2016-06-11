import Joints from './Joints'
import * as GAME_CONFIG from '../constants/game'
import * as DIRECTION from '../constants/direction'
/*
class Snake{

}*/


class Snake {
    /**
     * [constructor description]
     * @param  {[type]}  id     [description]
     * @param  {[type]}  name   用户名
     * @param  {[type]}  speed  移动速度
     * @param  {Number}  kill   杀敌数
     * @param  {Number}  eat    吃豆数
     * @param  {Number}  left   坐标x
     * @param  {Number}  top    坐标y
     * @param  {Number}  dead   死亡数
     * @param  {Boolean} isDead 是否已死
     */
    constructor(id, name, speed = GAME_CONFIG.SNAKE_SPEED, kill = 0, eat = 0, left = 100, top = 100, dead = 0, isDead = false, color = GAME_CONFIG.SNAKE_COLOR){
        this.id = id
        this.name = name
        this.speed = speed
        this.kill = kill
        this.eat = eat
        this.left = left
        this.top = top
        this.dead = dead
        this.isDead = isDead
        this.color = color

        var jointses = []
        for(var i=0; i<GAME_CONFIG.DEFAULT_JOINTS_COUNT; i++){
            var isHead = i == 0 ? true : false
            
            var joints = new Joints(left, top, GAME_CONFIG.JOINTS_WIDTH, GAME_CONFIG.JOINTS_HEIGHT, DIRECTION.LEFT, color, isHead)
            jointses.push(joints)
        }

        this.jointses = jointses
    }
}





// class Snake {
//     constructor(id, name, speed = GAME_CONFIG.SNAKE_SPEED, kill = 0, eat = 0, left = 100, top = 100){
//         this.id = id
//         this.name = name
//         this.speed = speed
//         this.kill = kill
//         this.eat = eat
//         this.left = left
//         this.top = top

//         var jointses = []
//         for(var i=0; i<GAME_CONFIG.DEFAULT_JOINTS_COUNT; i++){
//             var isHead = i == 0 ? true : false
//             var joints = new Joints(left, top, GAME_CONFIG.JOINTS_WIDTH, GAME_CONFIG.JOINTS_HEIGHT, DIRECTION.LEFT, GAME_CONFIG.SNAKE_COLOR, isHead)
//             jointses.push(joints)
//         }

//         this.jointses = jointses

//         /*this.jointses = (function(left, top){
            
//             var jointses = []
//             for(var i=0; i<GAME_CONFIG.DEFAULT_JOINTS_COUNT; i++){
//                 var isHead = i = 0 ? true : false
//                 var joints = new Joints(left, top, GAME_CONFIG.JOINTS_WIDTH, GAME_CONFIG.JOINTS_HEIGHT, DIRECTION.LEFT, GAME_CONFIG.SNAKE_COLOR, isHead)
//                 jointses.push(joints)
//             }

//             return jointses

//         })(left, top)*/

//     }
// }

export default Snake