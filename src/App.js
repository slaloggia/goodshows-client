import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
// import {Container} from 'semantic-ui-react'
import Home from './containers/Home'
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import Dashboard from './containers/Dashboard'
import history from './history';


function App() {
  return (
    <div >
      <NavBar/>
      <Router history={history}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={LogIn} />
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
