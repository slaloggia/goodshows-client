import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

class SignUp extends Component {
    state= {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    render() {
        return (
            <Form>

            </Form>
        )
    }
}

export default (null, mapDispatchToProps)(SignUp)