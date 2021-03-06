import React, { Component } from 'react'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
import { loginSuccess, getUserInfo, updateProfile } from '../actions/userActions'
import { getShows } from '../actions/showActions'
import { updateReview } from '../actions/reviewActions'
import { Item, Grid, Placeholder, Image, Rating, Card } from 'semantic-ui-react'
import ChallengeBox from '../components/ChallengeBox'
import EditProfile from '../components/EditProfile'
import Review from '../components/Review'

const strftime = require('strftime')


class Dashboard extends Component {
    renderMyShows(status) {
        const listShows = this.props.currentUser.my_shows.filter(show => show.seen === status)
        return listShows.map(showObj => 
        <Image spaced onClick={()=>this.props.history.push('/show/'+ showObj.show.id)} src={showObj.show.image} key={showObj.show.id} />
      )
    }

    findReviews() {
        return this.props.reviews.filter(review => review.user_id === this.props.currentUser.id)
    }

    // submitUpdatedReview(review) {
    //     this.props.updateReview(review)
    //     window.location.reload(true)
    // }


    renderMyReviews(reviews) {
        if (reviews.length > 0){
        return reviews.map(review => (
        <Item  key={review.id}>
            <Item.Header className='review-header' as='a' onClick={() => this.props.history.push(`/show/${review.show_id}`)}>{review.show.title}  </Item.Header>
            <Item.Content className='user-review-content'>
                <Rating rating={review.rating} maxRating={5} disabled></Rating>
                <Item.Meta>
                    <span>{strftime('%B %e, %Y', new Date(review.created_at))}</span>
                </Item.Meta>
                <Item.Description >{review.content}</Item.Description>
                <Item.Extra>
                    <Review match={this.props.match} showTitle={review.show.title} showId={review.show.id} review={review} onSubmit={this.props.updateReview}/>
                </Item.Extra>
            </Item.Content>
        </Item>))}
    }

    render() {
        const user = this.props.currentUser
        const reviews = this.findReviews()

      
        return (
        
            !this.props.currentUser.id ? <Placeholder.Header image/> :
            <Grid relaxed  inverted centered columns='two' id='user-dashboard-grid'>
            <Grid.Row>
                <Grid.Column width={4}>
                    <Card id='user_card'>
                        <Image src={user.avatar ? user.avatar : require('../images/default-user-icon.jpg')} />
                        <EditProfile />
                        <Card.Content>
                            <Card.Header>{user.username}</Card.Header>
                            <Card.Meta>Joined: {strftime('%B %Y', new Date(user.since))}</Card.Meta>
                            <br></br>
                            <Card.Description>
                                <p>Seen: {this.props.currentUser.my_shows ? this.props.currentUser.my_shows.filter(show => show.seen).length : 0}</p>
                                <p>Want to See: {this.props.currentUser.my_shows ? this.props.currentUser.my_shows.filter(show => !show.seen).length : 0}</p>
                                <p>Reviews: {reviews.length}</p>
                                <br></br>
                                <ChallengeBox shows={user.my_shows.filter(show => show.seen)} />
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={10} divided='vertically'>
                    <Grid.Row>
                        <h3>Shows I Have Seen</h3>
                        <Image.Group size='small' className='info-container'>
                            {this.renderMyShows(true)}
                        </Image.Group>
                    </Grid.Row>
                    <Grid.Row>{/* want to see list */}
                    <h3>Shows I Want To See</h3>
                        <Image.Group size='tiny' className='info-container'>
                            {this.renderMyShows(false)}
                        </Image.Group>
                    </Grid.Row>
                    <Grid.Row>{/* user's reviews */}
                        <h3>My Reviews</h3>
                        <div className='info-container'>
                            <Item.Group divided>
                            {this.renderMyReviews(reviews)}
                            </Item.Group>
                        </div> 
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>

        )
    }

}

const mapStateToProps = ({currentUser, shows, reviews}) => ({currentUser, shows, reviews})
function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        getShows: () => dispatch(getShows()),
        updateProfile: (event, avatar) => dispatch(updateProfile(event, avatar)),
        updateReview: (review) => dispatch(updateReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Dashboard))