import React, { Component } from 'react';
import './Results.scss'
import { connect } from 'react-redux';
import Trail from '../../Components/Trail/Trail'
import PropTypes from 'prop-types';


export class Results extends Component {


  displayTrails = () => {
    if(!this.props.isLoading) {
      return this.props.trails.map(trail => <Trail {...trail} key={trail.id} expandTrail={this.expandTrail}/>)
    } else {
      return (
        <div className="load-container">
          <div className="load">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1>Loading Hikes</h1>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        <div className='results'>
          {this.displayTrails()}
        </div>
      </div>
    )
  }
}

Results.propTypes = {
  trails: PropTypes.array,
  isLoading: PropTypes.bool
}

export const mapStateToProps = state => ({
  trails: state.trails,
  isLoading: state.isLoading
})

export default connect(mapStateToProps)(Results);