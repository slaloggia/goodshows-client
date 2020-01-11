import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'
import { getShows } from '../actions/showActions'
import { loginSuccess } from '../actions/userActions'
import { getReviews } from '../actions/reviewActions'
import WithShows from '../components/WithShows'


class Shows extends Component {

    filterShows() {
        const categoryFilter = this.props.match.params.category
       return this.props.shows.filter(show => show.category === categoryFilter)
    }

    displayShowImages() {
        const displayShows = this.filterShows()
        return displayShows.map(show => 
        <Card   color='pink' key={show.id}>
            <Image src={show.image} id={show.id}/>
            <Card.Content>
                <Card.Header>{show.title}</Card.Header>
                <Card.Description className='show-category'>{show.category}</Card.Description>
            </Card.Content>
        </Card>
        )
    }

    handleImageClick = (event) => {
        console.log(event.target)
        if (event.target.className === 'ui image') {
            this.props.history.push(`/show/${event.target.id}`)
        }
    }

    render() {
        return (
        <Card.Group onClick={this.handleImageClick} itemsPerRow={5}>
            {this.displayShowImages()}
        </Card.Group>
        )
    }
}

const mapStateToProps = ({shows}) => ({shows})
function mapDispatchToProps(dispatch) {
    return {
        getShows: () => dispatch(getShows()),
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getReviews: () => dispatch(getReviews())

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WithShows(Shows))