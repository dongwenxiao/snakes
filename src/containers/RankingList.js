import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as GAME_CONFIG from '../constants/game'
import * as snakeActionCreator from '../actions/snake'


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
          </tr>
          {trs}
        </table>
      </div>
    )
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
