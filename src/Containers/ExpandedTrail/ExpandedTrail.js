import React, { Component } from 'react';
// import Ratings from 'react-ratings-declarative';
// import noPhoto from '../../Media/no-photo.png';
import './ExpandedTrail.scss'

class ExpandedTrail extends Component {

  handleClick = (e) => {
    window.history.back()
  }  

  render() {
    // const { name, difficulty, stars, starVotes, length, imgMedium, expandTrail, hiked, hikeLater } = this.props
    return (
      <div className='trail-overlay'>
        <div className='expanded-trail'>
          <p>This is a trail</p>
          <button onClick={() => this.handleClick()}>x</button>
        </div>
      </div>
    )
  }
}

export default ExpandedTrail;