import React from 'react';

import Joints from './Joints'
import Snake from '../containers/Snake'
import Foods from '../containers/Foods'

class PlayLayer extends React.Component {
  render() {
    return (
      <div className="play-layer">
      	<Snake />
      	<Foods />
      </div>
    );
  }
}

PlayLayer.defaultProps = {
};

export default PlayLayer;
