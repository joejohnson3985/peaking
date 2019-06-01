import React, { Component } from 'react';
import './Header.scss';
import { getMyHikes} from '../../APICalls'
import { setTrails } from '../../Actions';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


class Header extends Component {
  constructor() {
    super()
    this.state = {
      ids: [],
      trails: JSON.parse(localStorage.getItem('myHikes'))
    }
  }

  componentDidMount() {
    this.fetchAllMyHikes()
  }

  fetchAllMyHikes = () => {
    const {trails} = this.state
    const ids = trails.map(trail => trail.id)
    this.setState({ids})
  }

  getHikedTrails = () => {
    const {trails} = this.state
    const hikedTrails = trails.filter(trail => trail.hiked)
    const ids = hikedTrails.map(trail => trail.id)
    this.setState({ids})
  }

  getFutureTrails = () => {
    const {trails} = this.state
    const  futureTrails = trails.filter(trail => trail.hikeLater)
    const ids = futureTrails.map(trail => trail.id)
    this.setState({ids})
  }

  getTrails = (ids) => {
    getMyHikes(ids)
    .then(results => this.props.setTrails(results.trails))
  }

  render() {
    let whatToRender;
    const {ids} = this.state
    if(ids.length) {
      this.getTrails(this.state.ids)
    } else {
      whatToRender = (
        <div className='overlay'>
          <div className='popup'>
            <p>You do not have any hikes saved yet, go find some hikes!</p>
            <NavLink to="/search" activeClassName='current-nav' className='nav-link' onClick={this.togglePopUp}><h4>Find Hikes</h4></NavLink>
          </div>
        </div>
      )
    }
    return (
      <div className='header'>
        {whatToRender}
        <h1>My Hikes</h1>
        <p onClick={this.getHikedTrails}>hiked</p>
        <p onClick={this.getFutureTrails}>Hike Later</p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setTrails: trails => dispatch(setTrails(trails))
})

export default connect(null, mapDispatchToProps)(Header);

