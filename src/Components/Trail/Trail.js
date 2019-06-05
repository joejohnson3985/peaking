import React, { Component } from 'react';
import './Trail.scss'
import Ratings from 'react-ratings-declarative';
import noPhoto from '../../Media/no-photo.png';
import { NavLink } from 'react-router-dom';

class Trail extends Component {
  constructor() {
    super()
    this.state = {
      hikeLater: false,
      hiked: false,
      expand: {}
    }
  }

  componentDidMount() {
    const trails = JSON.parse(localStorage.getItem('myHikes')) || []
    const existing = trails.find(trail => this.props.id === trail.id)
    if(existing) {
      this.checkState(existing)
    }
  }

  checkState = (existing) => {
      const { hikeLater, hiked } = existing
      this.setState({hikeLater, hiked})
  }

  updateMyHikes = () => {
    const { hikeLater, hiked } = this.state
    const newTrail = {id: this.props.id, hikeLater, hiked}
    const trails = JSON.parse(localStorage.getItem('myHikes')) || []
    const existing = trails.find(trail => this.props.id === trail.id)
    if(existing && !hikeLater && !hiked) {
      let index = trails.indexOf(existing)
      trails.splice(index, 1)
    } else if(existing) {
      let index = trails.indexOf(existing)
      trails.splice(index, 1, newTrail)
    } else {
      trails.push(newTrail)
    }
    localStorage.setItem('myHikes', JSON.stringify(trails))
  }

  handleHiked = () => {
    const {hiked} = this.state
    this.setState({hiked: !hiked},  () => this.updateMyHikes())
  }

  handleHikeLater = () => {
    const {hikeLater} = this.state
    this.setState({hikeLater: !hikeLater}, () => this.updateMyHikes())
  }

  displayChecks = (value) => {
    return value ? <i className='far fa-check-square'></i> : <i className='far fa-square'></i>
  }



  render() {
    const { hiked, hikeLater } = this.state
    const {name, difficulty, stars, starVotes, length, imgMedium, id} = this.props
    const image = imgMedium || noPhoto
    const imgUrl = `https://cdn.apstatic.com/img/diff/${difficulty}.svg`
    const routeUrl = `/trail/${id}`
    const bg = {backgroundImage: `url(${image})`}
    return(
      <div to={routeUrl} className='trail' style={bg}>
        <div className='data'>
          <p>{stars}</p>
          <Ratings rating={stars} widgetRatedColors='#df7975' title={starVotes}>
            <Ratings.Widget widgetDimension="25px"/>
            <Ratings.Widget widgetDimension="25px"/>
            <Ratings.Widget widgetDimension="25px"/>
            <Ratings.Widget widgetDimension="25px"/>
            <Ratings.Widget widgetDimension="25px"/>
          </Ratings>
          <p>{length} miles</p>
          <img src={imgUrl} alt={difficulty}/>
        </div>
        <NavLink className='more-info' to={routeUrl} >
          <p>More Info</p>
        </NavLink>
        <div className='user-actions'>
          <div onClick={this.handleHikeLater} className='hike-later'>
            {this.displayChecks(hikeLater)}
            <label >Hike Later</label>
          </div>
          <div className='trail-name'>
            {name}
          </div>
          <div onClick={this.handleHiked} className='hiked'>
            <label onClick={this.handleHiked}>Hiked</label>
            {this.displayChecks(hiked)}
          </div>
        </div>
      </div>
    )
  }
}


export default Trail;

