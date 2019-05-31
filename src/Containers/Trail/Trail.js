import React, { Component } from 'react';
import './Trail.scss'
import Ratings from 'react-ratings-declarative';

class Trail extends Component {


  render() {
    const { name, difficulty, stars, starVotes, length, imgMedium } = this.props
    const url = `https://cdn.apstatic.com/img/diff/${difficulty}.svg`
    console.log(url)
    const bg = {backgroundImage: `url(${imgMedium})`}
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
      </div>
    )
  }
}

export default Trail;