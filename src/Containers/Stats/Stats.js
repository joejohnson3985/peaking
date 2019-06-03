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

  componentDidMount() {
    this.getAllStats()
  }

  getAllStats = () => {
    this.getMilesHiked()
  }

  getMilesHiked = () => {
    let miles = this.props.trails.reduce((accum, trail) => {
      console.log(trail)
      accum += trail.length
      return accum
    }, 0)

    return miles
  }



  render() {

    return(
      <div>
      these will be de stats
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  trails: state.trails
})

export default connect(mapStateToProps)(Stats)