import React, { Component } from 'react'
import { connect } from 'react-redux'
import WithAuth from '../components/WithAuth'
import { loginSuccess, getUserInfo } from '../actions/userActions'
import { getShows } from '../actions/showActions'
import { createReview, updateReview, deleteReview } from '../actions/reviewActions'
import { Form, Rating, Button, Placeholder, Modal } from 'semantic-ui-react'

class Review extends Component {
    state= {
        open: false,
        review: {
        review_id: "",
        user_id: this.props.currentUser.id,
        show_id: this.props.showId,
        // rating_id: '',
        rating: 0,
        content: ''} 
    }

    handleChange = (event) => {
        this.setState({review: {
            ...this.state.review,
            [event.target.name]: event.target.value
        }})
    }

    changeModalOpen = () => {
        this.setState({open: !this.state.open})
    }

    componentDidMount() {
        if (this.props.review) {
            const review = this.props.review
            this.setState({
                review_id: review.id,
                user_id: review.user_id,
                show_id: review.show_id,
                rating: review.rating,
                content: review.content
            })
        }
    }

    handleFormSubmit = () => {
        this.changeModalOpen()
        this.props.onSubmit(this.state.review)
    }


    render() {
        const rating= this.state.rating
        return (this.props.shows.length === 0 ? <Placeholder.Header image/> :
            <div className='review-form-container'>
                {this.props.review ?
                <div >
                    <Button basic size='mini' onClick={this.changeModalOpen}>Edit</Button>
                    <Button basic size='mini' onClick={() => this.props.deleteReview(this.state.review.review_id)}>Delete</Button>
                </div> :
                <Button inverted size='large' id='review-btn' onClick={this.changeModalOpen}>Review It!</Button>}
                <Modal open={this.state.open} basic size='small' >
                <h2 >{this.props.showTitle}</h2>
                    <Form  onSubmit={this.handleFormSubmit} >
                        <div>
                            <div>Your Rating: {rating}</div>
                                <input
                                type='range'
                                min={0}
                                max={5}
                                value={rating}
                                name='rating'
                                onChange={this.handleChange}
                                />
                                <br />
                                <Rating icon='star' rating={this.state.review.rating} maxRating={5} />
                        </div>
                        <Form.TextArea name='content' placeholder='Your review' value={this.state.content} onChange={this.handleChange} />
                        <Button type='submit'>Submit</Button>
                        <Button onClick={this.changeModalOpen} >Cancel</Button>
                    </Form>
                </Modal>
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
        updateReview: (review) => dispatch(updateReview(review)), 
        deleteReview: (id) => dispatch(deleteReview(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Review))