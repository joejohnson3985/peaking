import React, { Component } from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import Garden from '../../Components/Garden/Garden'
import Filter from '../Filter/Filter'
import Results from '../Results/Results'
import ExpandedPlant from '../ExpandedPlant/ExpandedPlant'


class App extends Component {

  render() {
    return(
      <div className='content'>
        <Sidebar className='Sidebar-container'/>
        <main>
          <Garden />
          <Filter />
          <Results />
        </main>
        <Route exact path='/plant/:id' component={ExpandedPlant} />
      </div>
    )
  }
}


export default App;
