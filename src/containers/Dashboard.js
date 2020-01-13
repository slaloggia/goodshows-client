import React, { Component } from 'react'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
import { loginSuccess, getUserInfo } from '../actions/userActions'
import { getShows } from '../actions/showActions'
import { Item, Grid, Placeholder, Image, Rating, Card } from 'semantic-ui-react'

const strftime = require('strftime')


class Dashboard extends Component {

    renderMyShows(status) {
        const listShows = this.props.currentUser.my_shows.filter(show => show.seen === status)
        return listShows.map(showObj => <Image src={showObj.show.image} key={showObj.show.id}/>)
    }

    renderMyReviews() {
        const reviews = this.props.currentUser.my_reviews
        console.log(reviews)
        if (reviews.length > 0){
        return reviews.map(review => (
        <Item  key={review.id}>
            <Item.Header className='review-header'>{review.show.title}  </Item.Header>
            <Item.Content>
                <Rating rating={review.rating} maxRating={5} disabled></Rating>
                <Item.Meta>
                    <span>{strftime('%B %e, %Y', new Date(review.created_at))}</span>
                </Item.Meta>
                <Item.Description>{review.content}</Item.Description>
            </Item.Content>
        </Item>))}
    }

    render() {
        const user = this.props.currentUser
        return (
        
            this.props.shows.length === 0 ? <Placeholder.Header image/> :
            <Grid relaxed  inverted centered columns='two' id='user-dashboard-grid'>
            <Grid.Row>
                <Grid.Column width={4}>
                    {/* user profile card */}
                    <Card id='user_card'>
                        <Card.Content>
                            <Card.Header>{user.username}</Card.Header>
                            <Card.Meta>Joined: {strftime('%B %Y', new Date(user.since))}</Card.Meta>
                            <br></br>
                            <Card.Description>
                                <p>Seen: </p>
                                <p>Want to See:</p>
                                <p>Reviews:</p>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={10} divided='vertically'>
                    <Grid.Row>{/* seen list */}
                        <h3>Shows I Have Seen</h3>
                        <Image.Group size='tiny'>
                            {this.renderMyShows(true)}
                        </Image.Group>
                    </Grid.Row>
                    <Grid.Row>{/* want to see list */}
                    <h3>Shows I Want To See</h3>
                        <Image.Group size='tiny'>
                            {this.renderMyShows(false)}
                        </Image.Group>
                    </Grid.Row>
                    <Grid.Row>{/* user's reviews */}
                        <h3>My Reviews</h3>
                        <div className='reviews-container'>
                            <Item.Group divided>
                            {this.renderMyReviews()}
                            </Item.Group>
                        </div> 
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>

        )
    }

}

const mapStateToProps = ({currentUser, shows}) => ({currentUser, shows})
function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        getShows: () => dispatch(getShows())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Dashboard))