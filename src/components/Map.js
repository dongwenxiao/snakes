/**
 * 场景
 * 地图表示游戏场景
 */

require('styles/Map.css');

import React from 'react';
import * as GAME_CONFIG from '../constants/game'


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
  		// width: GAME_CONFIG.MAP_WIDTH,
  		// height: GAME_CONFIG.MAP_HEIGHT
  	}
  	for(let i=0;i<(GAME_CONFIG.TILE_COUNT_H * GAME_CONFIG.TILE_COUNT_V); i++){
  		tiles.push(<Tile key={"tile-"+i}/>);
  	}  	

    return (
      <div className="map" style={mapStyles}>
        <div className="bg-layer">
        	{tiles}
        </div>
      </div>
    );
  }
}




MapComponent.defaultProps = {
};

export default MapComponent;
