import React from 'react';

import Joints from './Joints'
import Snake from '../containers/Snake'

class PlayLayer extends React.Component {
  render() {
    return (
      <div className="play-layer">
      	<Snake/>
      </div>
    );
  }
}

PlayLayer.defaultProps = {
};

export default PlayLayer;
