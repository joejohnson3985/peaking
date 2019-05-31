import React, { Component } from 'react';
import './Trail.scss'
import Ratings from 'react-ratings-declarative';
import noPhoto from '../../Media/no-photo.png'

class Trail extends Component {

  hikeLater = () => {
    let trails = JSON.parse(localStorage.getItem('hikeLater'))
    trails.push(this.props.id)
    localStorage.setItem('hikeLater', JSON.stringify(trails))
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
        <div onClick={this.hikeLater}>hikeLater</div>
      </div>
    )
  }
}

export default Trail;