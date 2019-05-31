import React, { Component } from 'react';
import './Filter.scss'
import { getTrails, getSearchedTrails, getCurrentLocationName } from '../../APICalls'
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error )
    } else {
      console.log('not working');
    }
  }

  setCurrentLocation = (pos) => {
    const { latitude, longitude } = pos.coords
    getCurrentLocationName({lat: latitude, lng: longitude})
      .then(query => this.findLocalAdress(query.results))
      .then(address => this.setState({search: address.formatted_address, lat: latitude, lng: longitude}, () => {
        this.handleSubmit()
        }
      ))
  }

  findLocalAdress = (results) => (results.find(result => result.types.includes('locality')))

  errorLocating = (positionError) => {
    console.log(positionError)
    this.setState({lat: 39.7392358, lng: -104.990251})
    this.handleSubmit()
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({[name]: value})
  }

  handleSearch = (e) => {
    e.preventDefault();
    getSearchedTrails(this.state.search)
    .then(results => {
      const { lat, lng } = results.results[0].geometry.location
      this.setState({lat, lng})

    })
  }

  handleSubmit = () => {
    getTrails(this.state)
    .then(results => this.props.setTrails(results.trails))
  }

  render() {
    const { sort, maxDistance, minStars, search, minLength} = this.state
    return(
      <form className='filter'>
        <input className='filter-options' name='search' value={search} onBlur={this.handleSearch} onChange={this.handleChange} type='text'/>
          <input className='filter-options' name='maxDistance' onChange={this.handleChange} value={maxDistance} type='number'/>
          <select className='filter-options' value={sort} name='sort' onChange={this.handleChange}>
            <option value='quality'>Quality</option>
            <option value='distance'>Distance</option>
          </select>
          <select className='filter-options' value={minStars} name='minStars' onChange={this.handleChange}>
            <option value={0}>All Ratings</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <input className='filter-options' name='minLength' onChange={this.handleChange} value={minLength} type='number'/>
          <div className='submit-btn' role='button' onClick={this.handleSubmit}>Update Results</div>
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  setTrails: trails => dispatch(setTrails(trails)),
});

export default connect(null, mapDispatchToProps)(Filter);