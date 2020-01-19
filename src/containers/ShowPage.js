import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Rating, Card, Image, Placeholder, Form, Dropdown, Item, Button, Modal } from 'semantic-ui-react'
// import WithShows from '../components/WithShows'
import { getShows } from '../actions/showActions'
import { loginSuccess, getUserInfo, addToList } from '../actions/userActions'
import  { getReviews, createReview } from '../actions/reviewActions'
import Review from '../components/Review'

const strftime = require('strftime')

class ShowPage extends Component {
    findShow() {
        return this.props.shows.find(show => show.id === parseInt(this.props.match.params.id))
    }

    onList(show) {
        if (this.props.currentUser.id) {
          return this.props.currentUser.my_shows.find(usershow => usershow.show.id === show.id)
        }
    }

    showSeen(show) {
        const listShow = this.onList(show)
        if (listShow) {
            return listShow.seen
        }
    }

    renderCreativeInfo(show) {
            return <div>
                 {show.creatives.music ? <h5>Music By: {show.creatives.music}</h5> : null} 
                 {show.creatives.lyrics ? <h5>Lyrics By: {show.creatives.lyrics}</h5> : null}
                 {show.creatives.book ? <h5>Book By: {show.creatives.book}</h5> : null}
                 {show.creatives.playwright ? <h5>Playwright: {show.creatives.playwright}</h5> : null}
            </div>
    }

    handleModalOpen() {
        this.setState({modalOpen: !this.state.modalOpen})
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
                    <div>{this.renderCreativeInfo(show)}</div>
                    <h4>Average User Rating:</h4>
                    <Rating icon='star' rating={this.getRating(show)} maxRating={5} disabled/>
                    <br></br>
                    {this.onList(show) && this.showSeen(show) ? 
                    <div>                       
                        <Modal trigger={<Button inverted id='review-btn' >Review It!</Button>} >
                            <Review showId={show.id} showTitle={show.title} match={this.props.match} onSubmit={(review) => this.props.createReview(review)} />
                        </Modal>
                    </div>
                    : null}
                </Card.Description>
            </Card.Content>
        </Card>
        )

    }

    renderReviews(reviews) {
        if (reviews.length > 0){
        return reviews.map(review => <Item  key={review.id}>
            <Item.Image src={review.user.avatar ? review.user.avatar : require('../images/default-user-icon.jpg')} avatar size='mini' />
            <Item.Content>
                <Item.Header>{review.user.username}</Item.Header><br></br>
                <Rating rating={review.rating} maxRating={5} disabled></Rating>
                <Item.Meta>
                    <span>{strftime('%B %e, %Y', new Date(review.created_at))}</span>
                </Item.Meta>
                <Item.Description>{review.content}</Item.Description>
            </Item.Content>
        </Item>)}else{
            return <h2>No reviews yet</h2>
        }
    }

    getRating() {
        const reviews = this.findReviews()
        if (reviews.length > 0) {
        const allRatings = reviews.map(review => parseInt(review.rating))
        return allRatings.reduce((total=0, num) => total + num ) / allRatings.length 
        }else{ 
            return 0 
        }
    }

    findReviews() {
        const id = parseInt(this.props.match.params.id)
      return  this.props.reviews.filter(review => review.show_id === id)
    }

    handleSelect = (event) => {
        event.preventDefault()
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
        const reviews = this.findReviews()
        const listOptions = [{text: 'Seen', value: true}, {text: 'Want to See', value: false}]
        return (
            this.props.shows.length === 0 ? <Placeholder.Header image/> :
        <Grid centered columns='two' id='show-detail-grid'>
            <Grid.Row>
                <Grid.Column width={6}>
                    {this.renderShowCard(show)}
                    {this.props.currentUser.id ? 
                    <Form inverted size={'large'} >
                        <Dropdown 
                        placeholder='Add To Your List' 
                        selection options={listOptions}  
                        onChange={this.handleSelect} 
                        defaultValue={
                            this.props.currentUser.loggedIn ? this.showSeen(show) : null
                        } />
                    </Form> : null}
                </Grid.Column>
                <Grid.Column width={8}>
                    <h2>User Reviews</h2>
                    <div className='reviews-container'>
                        <Item.Group divided>
                        {this.renderReviews(reviews)}
                        </Item.Group>
                    </div> 
                </Grid.Column>
            </Grid.Row>
        </Grid>
        )
    }
}
const mapStateToProps = ({shows, currentUser, reviews}) => ({shows, currentUser, reviews})
function mapDispatchToProps(dispatch) {
    return {
        getShows: () => dispatch(getShows()),
        getReviews: () => dispatch(getReviews()),
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        addToList: (listItem) => dispatch(addToList(listItem)),
        createReview: (review) => dispatch(createReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage)