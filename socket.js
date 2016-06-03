var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);

var serverCache = {
	name: 'victor'
}

function handler (req, res) {
    res.writeHead(200);
    res.end('There \' nothing. ');
}





// id
// socket.id

// 连接数量
// io.sockets.server.engine.clientsCount

// 特定某个用户
// io.sockets.sockets[socket.id].emit('message', 'find you send')

// 当前请求用户
// socket.emit('message', "this is a emit");

// 除了当前用户的所有用户
// socket.broadcast.emit('message', "this is a broadcast");

// 全部用户
// io.sockets.emit('message', "this is a emit all");

io.on('connection', function (socket) {


  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('disconnect', function(msg){
    console.log(msg + socket.id)
  });


})