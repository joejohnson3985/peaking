import React, { Component } from 'react';
import './Results.scss'
import { connect } from 'react-redux';
import Trail from '../Trail/Trail'
import Stats from '../Stats/Stats'


class Results extends Component {


  displayTrails = () => {
    if(this.props.trails.length) {
      return this.props.trails.map(trail => <Trail {...trail} key={trail.id} expandTrail={this.expandTrail}/>)
    } else {
      return (
        <div className="load-container">
          <div className="load">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1>Loading hikes...</h1>
        </div>
      )
    }
  }

  render() {
    console.log('hello')
    return(
      <div>
        <Stats />
        <div className='results'>
          {this.displayTrails()}
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  trails: state.trails
})

export default connect(mapStateToProps)(Results);