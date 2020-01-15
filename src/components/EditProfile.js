import React, { Component } from 'react'
import WithAuth from '../components/WithAuth'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginSuccess, getUserInfo } from '../actions/userActions'

class EditProfile extends Component {
    state= {
        avatar: null
    }

    handleChange = (event) => {
        this.setState({
            avatar: event.target.files[0]
        })
    }

    handleUpdateProfile = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('user[avatar]', this.state.avatar)

        const reqObj = {
            method: 'PATCH',
            body: data
        }

        fetch('http://localhost:3000/users/'+this.props.currentUser.id, reqObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    render() {
        return (
            <div>
                <Form id='user-form' onSubmit={this.handleUpdateProfile} inverted>
                    <h2>Upload a profile image</h2>
                    <input type='file' onChange={this.handleChange}/> 
                    <Button type='submit'>Save Image</Button>
                </Form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getUserInfo: (id) => dispatch(getUserInfo(id))
    }
}

const mapStateToProps = ({currentUser, shows}) => ({currentUser, shows})

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(EditProfile))