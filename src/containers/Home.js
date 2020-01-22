import React, { Component } from 'react'
import { connect } from 'react-redux'
import CoverList from '../components/CoverList'
import { getShows } from '../actions/showActions'
import { loginSuccess, getUserInfo } from '../actions/userActions'
import { getReviews } from '../actions/reviewActions'

class Home extends Component {

    

    render() {
        const sortedShows = this.props.shows.sort((a, b) => a.reviews.length > b.reviews.length ? -1 : 1)
        return (
            <div className='home-container'>
                <h2 className='welcome'>Browse and Search Broadway shows from the past 20 years</h2>
                <h3 className='welcome'>Create an Account or Log In to add shows to your list and review them</h3>
                <CoverList shows={sortedShows.slice(0, 11)}/>
            </div>
        )
    
    }
}

const mapStateToProps = ({shows, reviews}) => ({shows, reviews})

function mapDispatchToProps(dispatch) {
    return {
        getShows: () => dispatch(getShows()),
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        getReviews: () => dispatch(getReviews())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)