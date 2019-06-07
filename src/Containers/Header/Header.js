import React, { Component } from 'react';
import './Header.scss';
import { getMyHikes} from '../../APICalls'
import { setTrails } from '../../Actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


export class Header extends Component {
  constructor() {
    super()
    this.state = {
      ids: [],
      trails: JSON.parse(localStorage.getItem('myHikes')) || []
    }
  }

  componentDidMount() {
    this.getAllMyHikes()
  }

  getAllMyHikes = () => {
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
    .catch(error => console.log(error))

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
        <NavLink exact={true} to='/my-hikes/completed-hiked' className='nav-link' activeClassName='current-nav' onClick={this.getHikedTrails}>Hiked</NavLink>
        <NavLink exact={true} to='/my-hikes/' className='nav-link' activeClassName='current-nav' onClick={this.getAllMyHikes}>My Hikes</NavLink>
        <NavLink exact={true} to='/my-hikes/hike-later' className='nav-link' activeClassName='current-nav' onClick={this.getFutureTrails}>Hike Later</NavLink>
        <NavLink exact={true} to='/my-hikes/stats' className='nav-link' activeClassName='current-nav'>My Stats</NavLink>
      </div>
    )
  }
}

Header.propTypes = {
  setTrails: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  setTrails: trails => dispatch(setTrails(trails))
})

export default connect(null, mapDispatchToProps)(Header);

