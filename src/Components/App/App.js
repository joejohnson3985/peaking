import React from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import Results from '../../Containers/Results/Results'
import Filter from '../../Containers/Filter/Filter'
import Header from '../../Containers/Header/Header'
import ExpandedTrail from '../ExpandedTrail/ExpandedTrail'
import ErrorDisplay from '../../Containers/ErrorDisplay/ErrorDisplay'
import Stats from '../../Containers/Stats/Stats'

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
        <Route exact path='/my-hikes/stats' component={Stats} />
        <Route exact path='/search' component={Results} />
        <Route path='/my-hikes' component={Results} />
      </main>
    </div>
  )
}

export default App;