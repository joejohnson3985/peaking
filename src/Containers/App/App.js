import React, { Component } from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import Results from '../Results/Results'
import Filter from '../Filter/Filter'

class App extends Component {

  render() {
    return(
      <div className='content'>
        <Sidebar />
        <main>
          <Route exact path='/' component={Filter} />
          <Results />
        </main>
      </div>
    )
  }
}


export default App;
