import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {

    render() {
        return <h2>{this.props.currentUser.username}</h2>
    }

}

const mapStateToProps = ({currentUser}) => ({currentUser})

export default connect(mapStateToProps)(Dashboard)