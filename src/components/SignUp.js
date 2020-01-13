import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginSuccess, getUserInfo } from '../actions/userActions'

class SignUp extends Component {
    state= {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    handleSignUp = (event) =>{
        event.preventDefault()
        event.target.reset()
        const reqObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
              {
                user: this.state
            }
            )
        }
    
        fetch('http://localhost:3000/users', reqObj)
        .then(resp => resp.json())
        .then(data =>  {
          if(data.error) {
            alert(data.error)
          } else {
            console.log(data)
            localStorage.setItem('token', data.token)
            this.props.loginSuccess(data)
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
            <Form id='user-form' onSubmit={this.handleSignUp}>
                <Form.Field>
                    <label>Username</label>
                    <input onChange={this.handleChange} placeholder='Username' name='username' value={this.state.username} />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input onChange={this.handleChange} placeholder='Email' name='email' value={this.state.email} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input onChange={this.handleChange} type ='password' placeholder='password' name='password' value={this.state.password} />
                </Form.Field>
                <Form.Field>
                    <label>Password Confirmation</label>
                    <input onChange={this.handleChange} type ='password' placeholder='confirm password' name='password_confirmation' value={this.state.password_confirmation} />
                </Form.Field>
                <Button type='submit'>Create Account</Button>
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

export default connect(null, mapDispatchToProps)(SignUp)