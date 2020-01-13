import React, { Component } from 'react'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
import { loginSuccess, getUserInfo } from '../actions/userActions'
import { getShows } from '../actions/showActions'
import { createReview, updateReview } from '../actions/reviewActions'
import { Form, Rating, Button, Placeholder } from 'semantic-ui-react'

class Review extends Component {
    state= {
        show_id: parseInt(this.props.match.params.id),
        rating_id: '',
        rating: 0,
        content: '' 
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
        const review= {
            ...this.state,
            rating: parseInt(this.state.rating),
            user_id: this.props.currentUser.id
        }
        console.log(review)
        if (this.props.match.path === '/review/:id/edit') {
            this.props.updateReview(this.state.rating_id, review)
        }else{this.props.createReview(review)}
    }

    componentDidMount() {
        if (this.props.match.path === '/review/:id/edit') {
            fetch(`http://localhost:3000/reviews/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(review => this.setState({
                show_id: review.show_id,
                rating_id: parseInt(this.props.match.params.id),
                rating: review.rating,
                content: review.content
            }))
        }
    }


    render() {
        const rating= this.state.rating
        return (this.props.shows.length === 0 ? <Placeholder.Header image/> :
        <div className='review-form-container'>
            <h2 className='review-title'>{this.props.shows.find(show => show.id === this.state.show_id).title}</h2>
            <Form  onSubmit={this.handleSubmit}>
                <div>
                    <div>Rating: {rating}</div>
                        <input
                        type='range'
                        min={0}
                        max={5}
                        value={rating}
                        name='rating'
                        onChange={this.handleChange}
                        />
                        <br />
                        <Rating icon='star' rating={this.state.rating} maxRating={5} />
                </div>
                <Form.TextArea name='content' placeholder='Your review' value={this.state.content} onChange={this.handleChange} />
                {this.props.match.path === '/review/:id/edit' ? 
                <Button type='submit'>Update Review</Button> :
                <Button type='submit'>Submit Review</Button>}
            </Form>
        </div>
        )
    }

}

const mapStateToProps = ({currentUser, shows}) => ({currentUser, shows})
function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        getShows: () => dispatch(getShows()),
        createReview: (review) => dispatch(createReview(review)),
        updateReview: (id, review) => dispatch(updateReview(id, review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Review))