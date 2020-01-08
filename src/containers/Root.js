import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getShows } from '../actions/showActions'

class Root extends Component {
    componentDidMount() {
        this.props.getShows()
    }
    render() {
        return <div></div>
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getShows: () => dispatch(getShows())
    }
}

export default connect(null, mapDispatchToProps)(Root)
