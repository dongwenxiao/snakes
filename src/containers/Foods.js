import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Joints from '../components/Joints'

import * as foodActionCreator from '../actions/food'

require('styles/food.css');


class Foods extends Component { 

  render() {

    var foods = [];
    
    this.props.foodsData.foods.forEach(function(food, i){
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

  componentDidMount(){
  }

}

Foods.propTypes = {
  actions: PropTypes.object.isRequired
};

// Foods.defaultProps = {
// };


function mapStateToProps(state) {  
  const props = {
    foodsData: state.foods
  };
  return props;
}
function mapDispatchToProps(dispatch) {  
  const actions = foodActionCreator;
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Foods);
