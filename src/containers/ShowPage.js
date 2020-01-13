import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Rating, Card, Image, Placeholder, Form, Dropdown, Item, Button } from 'semantic-ui-react'
import WithShows from '../components/WithShows'
import { getShows, addToList } from '../actions/showActions'
import { loginSuccess, getUserInfo } from '../actions/userActions'


const strftime = require('strftime')

class ShowPage extends Component {

    findShow() {
        return this.props.shows.find(show => show.id === parseInt(this.props.match.params.id))
    }



    renderShowCard(show) {
        
        return (
        <Card key={show.id}>
            <Image src={show.image} id={show.id}/>
            <Card.Content>
                <Card.Header>{show.title}</Card.Header>
                <Card.Meta className='show-category'>
                    <span>{show.category}</span>
                </Card.Meta>
                <Card.Description>
                    <h4>Average User Rating:</h4>
                    <Rating icon='star' rating={this.getRating(show)} maxRating={5} disabled/>
                    {this.props.currentUser.id && this.props.currentUser.my_shows.find(usershow => usershow.show.id === show.id && usershow.seen) ? 
                    <Button onClick={()=>this.props.history.push(`${this.props.match.url}/review`)}>Review</Button> : null}
                </Card.Description>
            </Card.Content>
        </Card>
        )

    }

    renderReviews(show) {
        if (show.reviews.length > 0){
        return show.reviews.map(review => <Item  key={show.id}>
            <Item.Content>
                <Item.Header>{review.user.username}</Item.Header>
                <Rating rating={review.rating} maxRating={5} disabled></Rating>
                <Item.Meta>
                    <span>{strftime('%B %e, %Y', new Date(review.created_at))}</span>
                </Item.Meta>
                <Item.Description>{review.content}</Item.Description>
            </Item.Content>
        </Item>)}
    }

    getRating(show) {
        if (show.reviews.length > 0) {
        const allRatings = show.reviews.map(review => parseInt(review.rating))
        return allRatings.reduce((total=0, num) => total + num ) / allRatings.length 
        }else{return 0}
    }

    handleSelect = (event) => {
        event.preventDefault()
        console.log(event.target)
        const choice = event.target.firstElementChild.innerText
        let seen
        if(this.props.currentUser.id) {
        if(choice === 'Seen') {
            seen = true
        }else if(choice === 'Want to See') {
            seen = false
        }
        let listItem = {
            user_id: this.props.currentUser.id,
            show_id: parseInt(this.props.match.params.id),
            seen: seen
        }

        this.props.addToList(listItem)}else{ this.props.history.push('/login')}
    }
    

    render() {
        const show = this.findShow()
        const listOptions = [{text: 'Seen', value: true}, {text: 'Want to See', value: false}]
        return (
            this.props.shows.length === 0 ? <Placeholder.Header image/> :
        <Grid centered columns='two' id='show-detail-grid'>
            <Grid.Row>
                <Grid.Column width={6}>
                    {this.renderShowCard(show)}
                    {this.props.currentUser.id ? 
                    <Form inverted size={'large'} >
                        <Dropdown placeholder='Add To Your List' selection options={listOptions}  onChange={this.handleSelect}/>
                    </Form> : null}
                </Grid.Column>
                <Grid.Column width={8}>
                    <h2>User Reviews</h2>
                    <div className='reviews-container'>
                        <Item.Group divided>
                        {this.renderReviews(show)}
                        </Item.Group>
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
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        addToList: (listItem) => dispatch(addToList(listItem))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithShows(ShowPage))