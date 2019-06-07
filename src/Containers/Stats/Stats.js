import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Stats.scss'


class Stats extends Component {
  constructor() {
    super()
    this.state = {
      milesHiked: 0,
      elelvationGained: 0,
      trailsHiked: 0

    }
  }

  getStats = (option) => {

    let stat = this.props.trails.reduce((accum, trail) => {
      accum += trail[option]
      return accum
    }, 0)

    return stat
  }

  handleClick = (e) => {
    window.history.back()
  }



  render() {

    return(
      <div className='overlay'>
        <div className='popup'>
            <p>You have hiked <strong>{this.props.trails.length}</strong> trails, covering <strong>{this.getStats('length')}</strong> miles and climbing <strong>{this.getStats('ascent')}</strong> feet. You rock!</p>
            <button onClick={this.handleClick}>Close</button>

        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  trails: state.trails
})

export default connect(mapStateToProps)(Stats)