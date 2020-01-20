import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home'
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import Dashboard from './containers/Dashboard'
import ShowPage from './containers/ShowPage'
import Shows from './containers/Shows'
import Review from './components/Review'
import SignUp from './components/SignUp'
import history from './history'
import { connect } from 'react-redux'
import WithShows from './components/WithShows'
import { getShows } from './actions/showActions'
import { getReviews } from './actions/reviewActions'
import { loginSuccess, getUserInfo } from './actions/userActions'
// import EditProfile from './components/EditProfile';




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
            <Route exact path='/shows' component={Shows} />
            <Route path='/shows/:category' component={Shows} />
            <Route exact path='/signup' component={SignUp} />
            <Route path='/review/:id/edit' component={Review} />
            {/* <Route path='/profile/edit' component={EditProfile} /> */}

          </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = ({shows, currentUser, reviews}) => ({shows, currentUser, reviews})

function mapDispatchToProps(dispatch) {
  return {
      getShows: () => dispatch(getShows()),
      getUserInfo: (id) => dispatch(getUserInfo(id)),
      loginSuccess: (user) => dispatch(loginSuccess(user)),
      getReviews: () => dispatch(getReviews())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithShows(App));
