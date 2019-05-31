import React, { Component } from 'react';
import './Sidebar.scss';

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
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar;
