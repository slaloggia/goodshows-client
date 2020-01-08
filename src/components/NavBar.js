import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import history from '../history'

class NavBar extends Component {
    render() {
        return (
            <Menu inverted>
                <Menu.Item onClick={() => history.push('/')}>Home</Menu.Item>
                <Menu.Item>Musicals</Menu.Item>
                <Menu.Item>Plays</Menu.Item>
                <Menu.Item>Specials</Menu.Item>
                {this.props.currentUser.token ? 
                <Menu.Item position='right' onClick={() => history.push('/dashboard')}>Profile</Menu.Item> :
                <Menu.Item position='right' onClick ={() => history.push('/login')} >Log In</Menu.Item>}

            </Menu>
        )
    }
}

const mapStateToProps = ({currentUser}) => ({currentUser})

export default connect(mapStateToProps)(NavBar)
