import { SOCKET_SERVER_URL } from '../constants/socket'

var io = require('socket.io-client')
// var socket = io('http://localhost:8080')


var socket = io(SOCKET_SERVER_URL)
/*socket.on('message', function (data) {
  console.log(data)
  socket.emit('my other event', { my: 'data' })
})*/



export default {
	send: function(type, data){
		socket.emit(type, data)
	},

	on: function(event, handler){  // 注册方法
		socket.on(event, function(data){
			handler(data)
		})
	}
}
