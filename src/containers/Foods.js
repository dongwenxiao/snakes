import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as foodActionCreator from '../actions/foods'

require('styles/food.css');

class Foods extends Component { 

  render() {

    var foods = [];
    this.props.foods.foods.forEach(function(food, i){
      var foodStyles = {
        left: food.left,
        top: food.top,
        width: food.width,
        height: food.height,
        background: food.color
      }
      foods.push(<div key={'food-' + i} className="food" style={foodStyles}></div>)
    })


    return (
      <div>
        {foods}
      </div>
    )
  }
}

function mapStateToProps(state) {  
  const props = {
    foods: state.foods
  }
  return props
}
function mapDispatchToProps(dispatch) {  
  const actions = foodActionCreator;
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Foods);
