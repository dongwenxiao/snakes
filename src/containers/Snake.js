
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import Joints from '../components/Joints'
import * as GAME_CONFIG from '../constants/game'

/* Populated by react-webpack-redux:reducer */
class Snake extends Component {
  render() {
    const {snakeData, actions} = this.props;

    console.log(this.props)

    var Jointses = [];

    var jointsCount = snakeData.jointsCount;

    for(var i=0;i<jointsCount;i++){
      Jointses.push(<Joints key={'joints-' + i} left={100+GAME_CONFIG.TILE_WIDTH * i} top={100} />)
    }

    return (
      <div>{Jointses}</div>
    );

    // return <Map actions={actions}/>;
  }
}


Snake.propTypes = {
  actions: PropTypes.object.isRequired
};

// Snake.defaultProps = {
//   jointsCount: 3 // 默认蛇有3节
// };


function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    snakeData: state.snake
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Snake);
