import React, { Component } from 'react';
import './Sidebar.scss';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      showNav: false
    }
  }

  showSidebar = () => {
    this.setState({showNav: !this.state.showNav})
  }

  render() {
    let css = 'bar';
    if(this.state.showNav) {css = 'bar show-nav' }
    return(
      <div className='side-bar-container'>
        <i className='fas fa-bars' onClick={this.showSidebar}></i>
        <div className={css}>
          <div>
            <i className='fas fa-times' onClick={this.showSidebar}></i>
            <h1>Peaking</h1>
            <NavLink exact={true} to="/search" activeClassName='current-nav' className='nav-link' onClick={this.showSidebar} ><h4>Find Hikes</h4></NavLink>
            <NavLink exact={true} to="/user/future-hikes" activeClassName='current-nav' className='nav-link' onClick={this.showSidebar} ><h4>Future Hikes</h4></NavLink>
            <NavLink exact={true} to="/user/completed-hikes" activeClassName='current-nav' className='nav-link' onClick={this.showSidebar} ><h4>Completed Hikes</h4></NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar;
