/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';

import BgLayer from './BgLayer'
import PlayLayer from './PlayLayer'

import * as GAME_CONFIG from '../constants/game'

require('normalize.css/normalize.css');
require('styles/Scene.css');

class Scene extends Component {
  render() {

  	var sceneStyles ={
  		width: GAME_CONFIG.MAP_WIDTH,
  		height: GAME_CONFIG.MAP_HEIGHT
  	}

    return (
      <div className="scene" style={sceneStyles}>
		  <BgLayer />
		  <PlayLayer />
      </div>
    );
  }
}

Scene.defaultProps = {};
export default Scene;
