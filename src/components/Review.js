import React, { Component } from 'react'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
import { loginSuccess } from '../actions/userActions'
import { getShows } from '../actions/showActions'
import { createReview } from '../actions/reviewActions'
import { Form, Rating, Button } from 'semantic-ui-react'

class Review extends Component {
    state= {
        show_id: parseInt(this.props.match.params.id),
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
        this.props.createReview(review)
    }

    render() {
        const rating= this.state.rating
        return (
        <div className='review-form-container'>
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
                        <Rating rating={this.state.rating} maxRating={5} />
                </div>
                <Form.TextArea name='content' placeholder='Your review' value={this.state.content} onChange={this.handleChange} />
                <Button type='submit'>Submit Review</Button>
            </Form>
        </div>
        )
    }

}

const mapStateToProps = ({currentUser, shows}) => ({currentUser, shows})
function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getShows: () => dispatch(getShows()),
        createReview: (review) => dispatch(createReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Review))