import React, { Component } from 'react';
import logo from '../../Media/logo.svg';
import './App.scss';
import Sidebar from '../Sidebar/Sidebar'
import Garden from '../../Components/Garden/Garden'
import Filter from '../Filter/Filter'
import Results from '../Results/Results'
import ExpandedPlant from '../ExpandedPlant/ExpandedPlant'

class App extends Component {

  render() {
    return(
      <div>
        <Sidebar />
        <Garden />
        <Filter />
        <Results />
        <ExpandedPlant />
      </div>
    )
  }
}

export default App;
