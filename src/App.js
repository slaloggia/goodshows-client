import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import {Container} from 'semantic-ui-react'
import Home from './containers/Home'
import NavBar from './components/NavBar'
import history from './history';


function App() {
  return (
    <div>
      <NavBar/>
      <Router history={history}>
        <Container>
          <Switch>
            <Route exact path='/' component={Home}/>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
