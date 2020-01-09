import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import history from '../history'
import { logoutUser } from '../actions/userActions'

class NavBar extends Component {

    handleLogout = () => {
        localStorage.removeItem('token')
        this.props.logoutUser()
        history.push('/')
    }

    render() {
        return (
            <Menu inverted>
                <Menu.Item onClick={() => history.push('/')}>Home</Menu.Item>
                <Menu.Item onClick={()=> history.push('/shows/Musical')}>Musicals</Menu.Item>
                <Menu.Item onClick={()=> history.push('/shows/Play')}>Plays</Menu.Item>
                <Menu.Item onClick={()=> history.push('/shows/Special')}>Specials</Menu.Item>
                {this.props.currentUser.id ? 
                <Menu.Item position='right' onClick={this.handleLogout}>Log Out</Menu.Item> :
                <Menu.Item position='right' onClick ={() => history.push('/login')} >Log In</Menu.Item>}

            </Menu>
        )
    }
}

const mapStateToProps = ({currentUser}) => ({currentUser})

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: ()=> dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
