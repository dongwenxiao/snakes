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
