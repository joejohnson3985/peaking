import React, { Component } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import Results from '../Results/Results'
import Filter from '../Filter/Filter'
import Header from '../../Components/Header/Header'

class App extends Component {

  componentDidMount() {
    if(!localStorage.getItem('myHikes')) {
      localStorage.setItem('myHikes', JSON.stringify([]))
    }
  }

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
          <Route exact path='/search' component={Results} />
          <Route exact path='/user/future-hikes' component={Results} />
          <Route exact path='/user/completed-hikes' component={Results} />
        </main>
      </div>
    )
  }
}


export default App;
