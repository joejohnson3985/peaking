import React, { Component } from 'react';
import './Trail.scss'
import Ratings from 'react-ratings-declarative';
import noPhoto from '../../Media/no-photo.png'

class Trail extends Component {
  constructor() {
    super()
    this.state = {
      hikeLater: false,
      hiked: false
    }
  }

  componentDidMount() {
    this.checkState()
  }

  checkState = () => {
    const trails = JSON.parse(localStorage.getItem('myHikes'))
    const existing = trails.find(trail => this.props.id === trail.id)
    if(existing) {
      const { hikeLater, hiked } = existing
      this.setState({hikeLater, hiked})
    }
  }

  updateMyHikes = () => {
    const { hikeLater, hiked } = this.state
    const newTrail = {id: this.props.id, hikeLater, hiked}
    const trails = JSON.parse(localStorage.getItem('myHikes'))
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
    const {hikeLater, hiked} = this.state
    this.setState({hikeLater: !hikeLater, hiked: !hiked},  () => this.updateMyHikes())
  }

  handleHikeLater = () => {
    const {hikeLater} = this.state
    this.setState({hikeLater: !hikeLater}, () => this.updateMyHikes())
  }


  render() {
    const { name, difficulty, stars, starVotes, length, imgMedium } = this.props
    const image = imgMedium || noPhoto
    const url = `https://cdn.apstatic.com/img/diff/${difficulty}.svg`
    const bg = {backgroundImage: `url(${image})`}
    return(
      <div className='trail' style={bg}>
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
          <img src={url} alt={difficulty}/>
        </div>
        <h4>{name}</h4> 
        <div onClick={this.handleHikeLater}>Hike Later</div>
        <div onClick={this.handleHiked}>Hiked</div>
      </div>
    )
  }
}

export default Trail;