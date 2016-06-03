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

