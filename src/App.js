import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
// import {Container} from 'semantic-ui-react'
import Home from './containers/Home'
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import Dashboard from './containers/Dashboard'
import ShowPage from './containers/ShowPage'
import Shows from './containers/Shows'
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
            <Route path='/show/:id' component={ShowPage} />
            {/* <Route path='/shows' component={Shows} /> */}
            <Route path='/shows/:category' component={Shows} />

          </Switch>
      </Router>
    </div>
  );
}

export default App;
