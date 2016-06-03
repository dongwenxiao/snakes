import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import Scene from './containers/Scene';

const store = configureStore();

render(
  <Provider store={store}>
    <Scene />
  </Provider>,
  document.getElementById('app')
);



var io = require('socket.io-client')


var socket = io('http://localhost:8080');
socket.on('message', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});