import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as GAME_CONFIG from '../constants/game'
import * as snakeActionCreator from '../actions/snake'

import gameClinetLogic from '../game/clinetLogic'

class RankingList extends Component {

  render() {
    const {snakes} = this.props
    const deadTdStyles = {
      backgroundColor: '#FFB5B5'
    }
    var trs = []
    snakes.forEach(function(snake){
      const tdStyle = snake.isDead ? deadTdStyles : {}
      trs.push(
        <tr key={'user-item-' + snake.id}>
          <td style={tdStyle}>{snake.name}</td>
          <td style={tdStyle}>{snake.jointses.length}</td>
          <td style={tdStyle}>{snake.kill}</td>
          <td style={tdStyle}>{snake.dead}</td>
        </tr>
      )
    })

    var styles = {
      left: GAME_CONFIG.MAP_WIDTH,
      top: 0,
      fontSize: GAME_CONFIG.BASE_UNIT + 'px'
    }

    return (
      <div className="rank-list" style={styles}>
        <table>
          <thead>
            <tr>
              <th>昵称</th>
              <th>长度</th>
              <th>杀敌</th>
              <th>死亡</th>
            </tr>  
          </thead>
          <tbody>
            {trs}  
          </tbody>          
        </table>
        <div>
          <button onClick={this.tryAgain.bind(this)}>再玩一次</button>
        </div>
      </div>
    )
  }

  tryAgain(){
    gameClinetLogic.birth()
  }
}


function mapStateToProps(state) {
  const props = {
    snakes: state.snakes
  }

  return props
}
/*function mapDispatchToProps(dispatch) {

  const actions = snakeActionCreator;
  const actionMap = { actions: bindActionCreators(actions, dispatch) }
  return actionMap
}*/
// export default connect(mapStateToProps, mapDispatchToProps)(RankingList)
export default connect(mapStateToProps)(RankingList)
