import React, { Component } from 'react';
import './Results.scss'
import { connect } from 'react-redux';
import Trail from '../Trail/Trail'


class Results extends Component {

  displayTrails = () => {
    if(this.props.trails) {
      return this.props.trails.map(trail => <Trail {...trail} key={trail.id}/>)
    } else {
      return <p>Just one more switchback...</p>
    }
  }

  render() {
    return(
      <div className='results'>
        {this.displayTrails()}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  trails: state.trails
})

export default connect(mapStateToProps)(Results);