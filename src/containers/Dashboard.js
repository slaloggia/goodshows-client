import React, { Component } from 'react'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
import { loginSuccess } from '../actions/userActions'

class Dashboard extends Component {

    render() {
        return <h2>User Dashboard</h2>
    }

}

const mapStateToProps = ({currentUser}) => ({currentUser})
function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Dashboard))