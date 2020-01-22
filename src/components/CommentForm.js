import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createComment } from '../actions/reviewActions'


class CommentForm extends Component {
    state= {
        user_id: this.props.userId,
        review_id: this.props.reviewId,
        content: ''
    }

    handleChange = (event) => {
        event.persist()
        this.setState({content: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.createComment(this.state)
        this.setState({
            user_id: this.props.userId,
            review_id: this.props.reviewID,
            content: ''
        })
        this.props.toggleForm()
    }

    render() {
        return (
            <Form reply onSubmit={this.handleSubmit}>
                <Form.TextArea name='content' value={this.state.content} onChange={this.handleChange} />
                <Button type='submit'>Comment</Button>
            </Form>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        createComment: (comment) => dispatch(createComment(comment))
    }
}

export default connect(null, mapDispatchToProps)(CommentForm)