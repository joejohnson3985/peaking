import React from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import Results from '../Results/Results'
import Filter from '../Filter/Filter'
import Header from '../../Components/Header/Header'
import ExpandedTrail from '../ExpandedTrail/ExpandedTrail'
import Stats from '../Stats/Stats'
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay'

const App = () => {
  return (
    <div className='content'>
      <Sidebar />
      <ErrorDisplay />
      <main>
        <Switch>
          <Redirect exact from="/" to="/search" />
          <Route exact path='/search' component={Filter} />
          <Route path='/my-hikes' component={Header} />
          <Route path='/trail/:id' component={ExpandedTrail} />
        </Switch>
        <Route path='/my-hikes' component={Stats}/>
        <Route exact path='/search' component={Results} />
        <Route path='/my-hikes' component={Results} />
      </main>
    </div>
  )
}

export default App;