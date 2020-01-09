import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'

class Shows extends Component {

    filterShows() {
        const categoryFilter = this.props.match.params.category
       return this.props.shows.filter(show => show.category === categoryFilter)
    }

    displayShowImages() {
        const displayShows = this.filterShows()
        return displayShows.map(show => <div className='grid-item'key={show.id} id={show.id}>
        <Card  className='show-grid-card'  >
            <Image src={show.image} id={show.id}/>
            <Card.Content>
                <Card.Header>{show.title}</Card.Header>
                <Card.Description className='show-category'>{show.category}</Card.Description>
            </Card.Content>
        </Card>
        </div>)
    }

    handleImageClick = (event) => {
        console.log(event.target)
        if (event.target.className === 'ui image') {
            this.props.history.push(`/show/${event.target.id}`)
        }
    }

    render() {
        return <div className='grid-container' onClick={this.handleImageClick}>{this.displayShowImages()}</div>
    }
}

const mapStateToProps = ({shows}) => ({shows})

export default connect(mapStateToProps)(Shows)