import React, { Component } from 'react'
import { connect } from 'react-redux'
import CoverList from '../components/CoverList'
import { getShows } from '../actions/showActions'
import { loginSuccess } from '../actions/userActions'
import WithShows from '../components/WithShows'


class Home extends Component {

    render() {
        const popularShows = this.props.shows.sort((a, b) => a.reviews.length > b.reviews.length ? -1 : 1)
        return (
            <div className='home-container'>
                <CoverList shows={popularShows.slice(0, 11)}/>
            </div>
        )
    
    }
}

const mapStateToProps = ({shows, reviews}) => ({shows, reviews})
function mapDispatchToProps(dispatch) {
    return {
        getShows: () => dispatch(getShows()),
        loginSuccess: (user) => dispatch(loginSuccess(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithShows(Home))