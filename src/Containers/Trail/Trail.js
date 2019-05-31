import React, { Component } from 'react';
import './Trail.scss'

class Trail extends Component {

  render() {
    const { name, dificulity, stars, starVotes, summary } = this.props
    return(
      <div className='Trail'>
        <h4>{name}</h4>
        <p>{stars}, {starVotes}</p>
        <p>{dificulity}</p>
        <p>{summary}</p>

      </div>
    )
  }
}

export default Trail;