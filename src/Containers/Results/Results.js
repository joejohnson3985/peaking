import React, { Component } from 'react';
import './Results.scss'
import { getLocalTrails } from '../../APICalls';
import { setTrails } from '../../Actions';
import { connect } from 'react-redux';
import Trail from '../Trail/Trail'


class Results extends Component {
  constructor() {
    super()
    this.state = {
      lat: 0,
      long: 0
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation = () => {
    const success = this.located
    const error = this.errorLocating
    const options = {timeout: 5000}
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error ,options )
    } else {
      console.log('not working');
    }
  }

  located = (pos) => {
    this.setState({lat: pos.coords.latitude, long: pos.coords.longitude}, () => {
      getLocalTrails(this.state)
      .then(results => this.props.setTrails(results.trails))
    })
  }

  errorLocating = () => {
    console.log('FUCK')
  }

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

export const mapDispatchToProps = dispatch => ({
  setTrails: trails => dispatch(setTrails(trails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);