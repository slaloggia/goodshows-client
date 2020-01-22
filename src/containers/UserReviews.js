import React, { Component } from 'react'
import { Item, Grid, Placeholder, Image, Rating, Card } from 'semantic-ui-react'


const strftime = require('strftime')




class UserReviews extends Component {
    state= {
        user: {}
    }

    componentDidMount() {

        fetch(`https://good-shows-api.herokuapp.com/users/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(user => this.setState({user: user}))
    }

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
                <Item.Description>{review.content}</Item.Description>
            </Item.Content>
        </Item>))}
    }

    render() {
        const user = this.state.user
        const reviews = this.state.user.reviews

      
        return (
        
            !this.state.user.id ? <Placeholder.Header image/> :
            <Grid relaxed  inverted centered columns='two' id='user-dashboard-grid'>
            <Grid.Row>
                <Grid.Column width={4}>
                    <Card id='user_card'>
                        <Image src={user.avatar ? user.avatar : require('../images/default-user-icon.jpg')} />
                        <Card.Content>
                            <Card.Header>{user.username}</Card.Header>
                            <Card.Meta>Joined: {strftime('%B %Y', new Date(user.created_at))}</Card.Meta>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={10} divided='vertically'>
                    <Grid.Row>
                        <h3>{this.state.user.username}'s Reviews</h3>
                        <div className='reviews-container'>
                            <Item.Group divided>
                            {this.state.user.reviews ? this.renderMyReviews(reviews) : <Placeholder />}
                            </Item.Group>
                        </div> 
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>

        )
    }

}


export default UserReviews