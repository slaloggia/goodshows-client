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
import Review from './components/Review'
import SignUp from './components/SignUp'
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
            <Route exact path='/show/:id' component={ShowPage} />
            <Route path='/show/:id/review' component={Review} />
            <Route path='/shows/:category' component={Shows} />
            <Route exact path='/signup' component={SignUp} />
            <Route path='/review/:id/edit' component={Review} />

          </Switch>
      </Router>
    </div>
  );
}

export default App;
