/**
 * 场景
 * 地图表示游戏场景
 */

require('normalize.css/normalize.css');
require('styles/Map.css');

import React from 'react';
import * as GAME_CONFIG from '../constants/game'
import Joints from './Joints'

class Tile extends React.Component {
	render() {
		var tileStyles = {
			width: GAME_CONFIG.TILE_WIDTH,
			height: GAME_CONFIG.TILE_HEIGHT
		}

		return (
			<div className="tile" style={tileStyles}></div>
		)
	}
}

class MapComponent extends React.Component {
  render() {

  	var tiles = [];
  	var mapStyles = {
  		width: GAME_CONFIG.MAP_WIDTH,
  		height: GAME_CONFIG.MAP_HEIGHT
  	}
  	for(let i=0;i<(60*60); i++){
  		tiles.push(<Tile />);
  	}  	

    return (
      <div className="map" style={mapStyles}>
        <div className="bg-layer">
        	{tiles}
        </div>
        <div className="play-layer">
        	<Joints left="100" top="100"/>
        </div>
      </div>
    );
  }
}




MapComponent.defaultProps = {
};

export default MapComponent;
