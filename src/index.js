import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import Scene from './components/Scene';
import gameManager from './gameManager';

const store = configureStore();

render(
  <Provider store={store}>
    <Scene />
  </Provider>,
  document.getElementById('app')
);

gameManager.gameStart();
// gameManager.addLoopListener(function(){
// 	console.log('listener 1')
// })

// gameManager.addLoopListener(function(){
// 	console.log('listener 2')
// })