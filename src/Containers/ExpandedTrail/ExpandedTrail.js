import React, { Component } from 'react';
// import Ratings from 'react-ratings-declarative';
// import noPhoto from '../../Media/no-photo.png';
import './ExpandedTrail.scss'
import { getMyHikes} from '../../APICalls'

class ExpandedTrail extends Component {
  constructor() {
    super()
   this.state = {trail: {}}
  }

  componentDidMount() {
    this.getAllTrailIfno(this.props.match.params.id)
  }

  handleClick = (e) => {
    window.history.back()
  }

  getAllTrailIfno = (id) => {
    getMyHikes(id)
    .then(result => this.setState({trail: result.trails[0]}))
  }  

  render() {
    const { name, difficulty, stars, starVotes, length, imgMedium, expandTrail } = this.state.trail
    return (
      <div className='trail-overlay'>
        <div className='expanded-trail'>
          <p>{name}</p>
          <p>{stars}</p>
          <p>{difficulty}</p>
          <p>{starVotes}</p>
          <p>{length}</p>
          <img src={imgMedium}/>
          <button onClick={() => this.handleClick()}>x</button>
        </div>
      </div>
    )
  }
}

export default ExpandedTrail;