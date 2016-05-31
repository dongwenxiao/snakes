import React from 'react';

import Map from './Map'

class BgLayer extends React.Component {
  render() {
    return (
      <div className="bg-layer">
      	<Map></Map>
      </div>
    );
  }
}

BgLayer.defaultProps = {
};

export default BgLayer;
