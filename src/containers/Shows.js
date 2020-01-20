import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image} from 'semantic-ui-react'
import { getShows } from '../actions/showActions'
import { loginSuccess, getUserInfo } from '../actions/userActions'
import { getReviews } from '../actions/reviewActions'


class Shows extends Component {

    state= {
        search: ''
    }

    filterShows() {
        const categoryFilter = this.props.match.params.category
        let allShows
        if (categoryFilter === 'other') {
            allShows = this.props.shows.filter(show => show.category !== 'Musical' && show.category !== 'Play')
        }else{
            allShows = this.props.shows.filter(show => show.category === categoryFilter)
        }
       return allShows
    }

    displayShowImages() {
        const displayShows = this.filterShows()
        return displayShows.map(show => show.title.toLowerCase().includes(this.state.search.toLowerCase()) ?
        <Card   color='pink' key={show.id}>
            <Image src={show.image} id={show.id}/>
            <Card.Content>
                <Card.Header>{show.title}</Card.Header>
                <Card.Description className='show-category'>{show.category}</Card.Description>
            </Card.Content>
        </Card> : null
        )
    }

    handleSearch = (event) => {
        event.persist()
        this.setState({search: event.target.value})
    }

    handleImageClick = (event) => {
        if (event.target.className === 'ui image') {
            this.props.history.push(`/show/${event.target.id}`)
        }
    }

    render() {
        return (
        <div className={'shows-container'}>
            <input className='show-search' type='search' position='right' placeholder={`Search ${this.props.match.params.category}s`} value={this.state.search} onChange={this.handleSearch}/>
            <br></br>
            <Card.Group onClick={this.handleImageClick} itemsPerRow={5}>
                {this.displayShowImages()}
            </Card.Group>
        </div>
        )
    }
}

const mapStateToProps = ({shows}) => ({shows})
function mapDispatchToProps(dispatch) {
    return {
        getShows: () => dispatch(getShows()),
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getReviews: () => dispatch(getReviews()),
        getUserInfo: (id) => dispatch(getUserInfo(id))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Shows)