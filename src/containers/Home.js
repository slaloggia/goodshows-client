import React, { Component } from 'react'
import { connect } from 'react-redux'
import CoverList from '../components/CoverList'
import { getShows } from '../actions/showActions'
// import { Image } from 'semantic-ui-react'

class Home extends Component {

    // state = {
    //     showImages: [],
    //     recentReviews: []
    // }

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
        getShows: () => dispatch(getShows())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)