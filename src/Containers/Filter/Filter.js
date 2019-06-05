import React, { Component } from 'react';
import './Filter.scss'
import { getTrails, getSearchedTrails, getCurrentLocationName } from '../../APICalls'
import { setTrails, setLoading, setError } from '../../Actions';
import { connect } from 'react-redux';

export class Filter extends Component {
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
    this.props.setLoading(true)
    const success = this.setCurrentLocation
    const error = this.errorLocating
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  setCurrentLocation = (pos) => {
    const { latitude, longitude } = pos.coords
    getCurrentLocationName({lat: latitude, lng: longitude})
      .then(query => this.findLocalAddress(query.results))
      .then(address =>  {
        this.setState({search: address.formatted_address, lat: latitude, lng: longitude}, () => {
          this.handleSubmit()
        }
      )})
      .catch(error => {
        this.handleSubmit()
        this.props.setError(error.message)
      })
  }

  findLocalAddress = (results) => results.find(result => result.types.includes('political'))

  errorLocating = (positionError) => {
    let errorMessage = `${positionError.message}. Default location is Denver, Colarado.`
    this.props.setError(errorMessage)
    let pos = {coords: {latitude: 39.7392358, longitude: -104.990251}}
    this.setCurrentLocation(pos)
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({[name]: value})
  }

  handleSearch = () => {
    getSearchedTrails(this.state.search)
    .then(results => {
      const { lat, lng } = results.results[0].geometry.location
      this.setState({lat, lng})

    })
    .catch(error => this.props.setError(error))
  }

  handleSubmit = () => {
    getTrails(this.state)
    .then(results => this.props.setTrails(results.trails))
    .then(results => this.props.setLoading(false))
    .catch(error => this.props.setError(error.message))
  }

  render() {
    const { sort, maxDistance, minStars, search, minLength} = this.state
    return(
      <form className='filter'>
        <div className='form-items'>
          <label htmlFor='search'>Location</label>
          <input className='filter-options' name='search' value={search} onBlur={this.handleSearch} onChange={this.handleChange} type='text'/>
        </div>
        <div className='form-items'>
          <label htmlFor='maxDistance'>Radius</label>
          <input className='filter-options' name='maxDistance' onChange={this.handleChange} value={maxDistance} type='number'/>
        </div>
        <div className='form-items'>
          <label htmlFor='minStars'>Stars</label>
          <select className='filter-options' value={minStars} name='minStars' onChange={this.handleChange}>
            <option value={0}>All Ratings</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className='form-items'>
          <label htmlFor='minLength'>Minimum Length</label>
          <input className='filter-options' name='minLength' onChange={this.handleChange} value={minLength} type='number'/>
        </div>
        <div className='form-items'>
          <label htmlFor='sort'>Sort By</label>
          <select className='filter-options' value={sort} name='sort' onChange={this.handleChange}>
            <option value='quality'>Quality</option>
            <option value='distance'>Distance</option>
          </select>
        </div>
        <div className='submit-btn' role='button' onClick={this.handleSubmit}>Update Results</div>
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  setTrails: trails => dispatch(setTrails(trails)),
  setLoading: bool => dispatch(setLoading(bool)),
  setError: error => dispatch(setError(error))
});

export default connect(null, mapDispatchToProps)(Filter);