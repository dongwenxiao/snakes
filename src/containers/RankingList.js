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

    var trs = []
    snakes.forEach(function(snake){
      trs.push(
        <tr>
          <td>{snake.name}</td>
          <td>{snake.jointses.length}</td>
          <td>{snake.kill}</td>
          <td>{snake.dead}</td>
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
          <tr>
            <th>昵称</th>
            <th>长度</th>
            <th>杀敌</th>
            <th>死亡</th>
          </tr>
          {trs}
        </table>
        <div>
          <button onClick={this.tryAgain.bind(this)}>再玩一次</button>
        </div>
      </div>
    )
  }

  tryAgain(){
    gameClinetLogic.rebirth()
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
