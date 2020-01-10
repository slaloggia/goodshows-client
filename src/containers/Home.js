import React, { Component } from 'react'
import { connect } from 'react-redux'
import CoverList from '../components/CoverList'
import { getShows } from '../actions/showActions'
import { getReviews } from '../actions/reviewActions'
import WithShows from '../components/WithShows'


class Home extends Component {


    componentDidMount() {
        this.props.getShows()
    }



    render() {
        return (
            <div className='home-container'>
                <CoverList shows={this.props.shows.slice(0, 11)}/>
            </div>
        )
    
    }
}

const mapStateToProps = ({shows, reviews}) => ({shows, reviews})
function mapDispatchToProps(dispatch) {
    return {
        getShows: () => dispatch(getShows()),
        getReviews: () => dispatch(getReviews())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithShows(Home))