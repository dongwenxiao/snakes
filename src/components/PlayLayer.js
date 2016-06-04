import React from 'react';

import Joints from './Joints'
// import Snake from '../containers/Snake'
import Snakes from '../containers/Snakes'
import Foods from '../containers/Foods'

class PlayLayer extends React.Component {
  render() {
    return (
      <div className="play-layer">
      	<Snakes />
      	<Foods />
      </div>
    );
  }
}

PlayLayer.defaultProps = {
};

export default PlayLayer;
