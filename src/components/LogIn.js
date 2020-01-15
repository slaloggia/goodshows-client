import React, { Component } from 'react'
import { Form, Button} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginSuccess, getUserInfo } from '../actions/userActions'

class LogIn extends Component {

    state= {
        username: '',
        password: ''
    }

    handleLogin = (event) =>{
        event.preventDefault()
        const reqObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state)
        }
    
        fetch('http://localhost:3000/api/v1/auth', reqObj)
        .then(resp => resp.json())
        .then(data =>  {
          if(data.error) {
            alert('invalid credentials')
          } else {
            localStorage.setItem('token', data.token)
            this.props.getUserInfo(data.id)
            this.props.history.push('/dashboard')
          }
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <Form id='user-form' onSubmit={this.handleLogin}>
                <h2>Log In</h2>
                <Form.Field>
                    <label>Username</label>
                    <input onChange={this.handleChange} placeholder='Username' name='username' value={this.state.username} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input onChange={this.handleChange} type ='password' placeholder='password' name='password' value={this.state.password} />
                </Form.Field>
                <Button type='submit'>Log In</Button>
            </Form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getUserInfo: (id) => dispatch(getUserInfo(id))
    }
}

export default connect(null, mapDispatchToProps)(LogIn)