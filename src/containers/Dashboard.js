import React, { Component } from 'react'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
import { loginSuccess } from '../actions/userActions'
import { getShows } from '../actions/showActions'
import { Item } from 'semantic-ui-react'

class Dashboard extends Component {

    render() {
        return <h2>User Dashboard</h2>
    }

}

const mapStateToProps = ({currentUser, shows}) => ({currentUser, shows})
function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getShows: () => dispatch(getShows())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Dashboard))