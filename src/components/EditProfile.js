import React, { Component } from 'react'
import WithAuth from '../components/WithAuth'
import { Form, Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginSuccess, getUserInfo, updateProfile } from '../actions/userActions'

class EditProfile extends Component {
    state= {
        avatar: null, 
        open: false
    }

    handleChange = (event) => {
        this.setState({
            avatar: event.target.files[0]
        })
    }

    handleModalChange = () => {
        this.setState({open: !this.state.open})
    }

    handleSubmitForm = (event) => {
        event.preventDefault()
        this.setState({open: false})
        this.props.updateProfile(event, this.state.avatar)
    }


    render() {
        return (
        <div>
            <Button  onClick={this.handleModalChange} basic compact fluid>Add or Change Profile Picture</Button>
            <Modal open={this.state.open}>
                <div>
                    <Form id='user-form' data-id={this.props.currentUser.id} onSubmit={this.handleSubmitForm} >
                        <h2>Upload a profile image</h2>
                        <input type='file' onChange={this.handleChange}/> 
                        <Button type='submit'>Save Image</Button>
                    </Form>
                </div>
            </Modal>
        </div>
    )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginSuccess: (user) => dispatch(loginSuccess(user)),
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        updateProfile: (event, avatar) => dispatch(updateProfile(event, avatar))
    }
}

const mapStateToProps = ({currentUser, shows}) => ({currentUser, shows})

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(EditProfile))