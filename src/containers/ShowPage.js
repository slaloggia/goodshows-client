import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Rating, Card, Image, Placeholder, Form, Dropdown } from 'semantic-ui-react'
import WithShows from '../components/WithShows'
import { getShows } from '../actions/showActions'
import { loginSuccess } from '../actions/userActions'

class ShowPage extends Component {
    

    findShow() {
        return this.props.shows.find(show => show.id === parseInt(this.props.match.params.id))
    }

    renderShowCard(show) {
        
        return (
        <Card   key={show.id}>
            <Image src={show.image} id={show.id}/>
            <Card.Content>
                <Card.Header>{show.title}</Card.Header>
                <Card.Meta className='show-category'>
                    <span>{show.category}</span>
                </Card.Meta>
                <Card.Description>
                    <Rating defaultRating={3} maxRating={5} disabled/>
                </Card.Description>

            </Card.Content>
        </Card>
        )

    }

    renderReviews(show) {
        if (show.reviews.length > 0) {
        return show.reviews.map(review => <div className='show-review'>
            <h5>{review.user.username}</h5>
            <p>Date: {review.created_at}</p>
            <p>{review.content}</p>
        </div>)
        }

    }

    render() {
        const show = this.findShow()
        const listOptions = [{text: 'Seen', value: 'Seen'}, {text: 'Want to See', value: 'Want to See'}]
        return (
            this.props.shows.length === 0 ? <Placeholder.Header image/> :
        <Grid centered columns='two' id='show-detail-grid'>
            <Grid.Row>
                <Grid.Column width={6}>
                    {this.renderShowCard(show)}
                    {this.props.currentUser.id ? 
                    <Form inverted size={'large'}>
                        <Dropdown placeholder='Add To Your List' options={listOptions} />
                    </Form> : null}
                </Grid.Column>
                <Grid.Column width={8}>
                    <div className='reviews-container'>
                        <h2>User Reviews</h2>
                        {this.renderReviews(show)}
                    </div> 
                </Grid.Column>
            </Grid.Row>
        </Grid>
        )
    }
}
const mapStateToProps = ({shows, currentUser}) => ({shows, currentUser})
function mapDispatchToProps(dispatch) {
    return {
        getShows: () => dispatch(getShows()),
        loginSuccess: (user) => dispatch(loginSuccess(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithShows(ShowPage))