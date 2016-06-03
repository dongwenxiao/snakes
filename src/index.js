import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores'
import Scene from './containers/Scene'
import GameManager from './containers/GameManager'

const store = configureStore();

render(
  <Provider store={store}>
    <div>
    	<Scene />
    	<GameManager />
    </div>
  </Provider>,
  document.getElementById('app')
);


// test socket.io
var io = require('socket.io-client')
var socket = io('http://localhost:8080')
socket.on('message', function (data) {
  console.log(data)
  socket.emit('my other event', { my: 'data' })
})