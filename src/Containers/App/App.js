import React, { Component } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import Results from '../Results/Results'
import Filter from '../Filter/Filter'
import Header from '../../Components/Header/Header'

class App extends Component {

  render() {
    return(
      <div className='content'>
        <Sidebar />
        <main>
          <Switch>
            <Redirect exact from="/" to="/search" />
            <Route exact path='/search' component={Filter} />
            <Route path='/user/' component={Header} />
          </Switch>
          <Results/>
        </main>
      </div>
    )
  }
}


export default App;
