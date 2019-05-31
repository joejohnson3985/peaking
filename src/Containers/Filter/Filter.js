import React, { Component } from 'react';
import './Filter.scss'
import { getSearchedTrails } from '../../APICalls'
import { getTrails } from '../../APICalls';
import { setTrails } from '../../Actions';
import { connect } from 'react-redux';

class Filter extends Component {
  constructor() {
    super()
    this.state = {
      search:'',
      maxDistance: 20,
      lat: 0,
      lng: 0,
      sort: 'quality',
      minLength: 0,
      minStars: 0,
      maxResults: 20
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation = () => {
    const success = this.setCurrentLocation
    const error = this.errorLocating
    const options = {timeout: 5000}
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error ,options )
    } else {
      console.log('not working');
    }
  }

  setCurrentLocation = (pos) => {
    this.setState({lat: pos.coords.latitude, lng: pos.coords.longitude}, () => {
      getTrails(this.state)
      .then(results => this.props.setTrails(results.trails))
    })
  }

  errorLocating = () => {
    console.log('FUCK')
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSearch = (e) => {
    e.preventDefault();
    getSearchedTrails(this.state.search)
    .then(results => {
      const { lat, lng } = results.results[0].geometry.location
      this.setState({lat, lng})

    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    getTrails(this.state)
    .then(results => this.props.setTrails(results.trails))
  }

  render() {
    const { sort, maxDistance, minStars, search, minLength} = this.state
    return(
      <form className='filter'>
        <input name='maxDistance' onChange={this.handleChange} value={maxDistance} type='number'/>
        <select value={sort} name='sort' onChange={this.handleChange}>
          <option value='quality'>Quality</option>
          <option value='distance'>Distance</option>
        </select>
        <select value={minStars} name='minStars' onChange={this.handleChange}>
          <option value={0}>All Ratings</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <input name='minLength' onChange={this.handleChange} value={minLength} type='number'/>
        <input name='search' value={search} onChange={this.handleChange} type='text'/>
        <button onClick={(e) => this.handleSearch(e)}>Update Location</button>
        <button onClick={(e) => this.handleSubmit(e)}>Update Results</button>
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  setTrails: trails => dispatch(setTrails(trails)),
});

export default connect(null, mapDispatchToProps)(Filter);