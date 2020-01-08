import React, {Component} from 'react'
// import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
// import history from '../history'
// import { logout } from '../actions/userActions'

class NavBar extends Component {
    render() {
        return (
            <Menu inverted>
                <Menu.Item position='right'>Log In</Menu.Item>
                <Menu.Item>Home</Menu.Item>
                <Menu.Item>Musicals</Menu.Item>
                <Menu.Item>Plays</Menu.Item>
                <Menu.Item>Specials</Menu.Item>
            </Menu>
        )
    }
}

export default NavBar
