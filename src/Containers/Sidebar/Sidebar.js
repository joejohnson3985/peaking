import React, { Component } from 'react';
import './Sidebar.scss';
import Filter from '../Filter/Filter'

class Sidebar extends Component {

  render() {
    return(
      <div className='bar'>
        <h1>Peaking</h1>
        <Filter />
      </div>
    )
  }
}

export default Sidebar;
