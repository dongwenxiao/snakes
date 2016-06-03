/**
 * 服务端端业务
 */

import socket from './socket'
import * as actions from '../constants/socket'




export default function(io, socket) {


	var cacheGameData = {
		snakes: [
			{
				id: '',
				name: '',
				jointses: []
			}
		]
	}


    socket.on(actions.ACTION_JOIN, function(data) {})
    socket.on(actions.ACTION_LEAVE, function(data) {})
    socket.on(actions.ACTION_START, function(data) {})
    socket.on(actions.ACTION_RESTART, function(data) {})
    socket.on(actions.ACTION_MOVE, function(data) {})
    socket.on(actions.ACTION_TURN_LEFT, function(data) {})
    socket.on(actions.ACTION_TURN_RIGHT, function(data) {})

    const gameLogic = {

        init() {
            // socket.on(actions.ACTION_JOIN, function(data) {})
            // socket.on(actions.ACTION_LEAVE, function(data) {})
            // socket.on(actions.ACTION_START, function(data) {})
            // socket.on(actions.ACTION_RESTART, function(data) {})
            // socket.on(actions.ACTION_MOVE, function(data) {})
            // socket.on(actions.ACTION_TURN_LEFT, function(data) {})
            // socket.on(actions.ACTION_TURN_RIGHT, function(data) {})
        },

        sendToCurrent() {

        },

        sendToAll() {

        },

        sendToOne() {

        },






    }

    return gameLogic
}
