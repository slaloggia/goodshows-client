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
            <div className='page-header'>
                <div className='banner-img'></div>
                <Menu inverted>
                    <Menu.Item onClick={() => history.push('/')}>Home</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/Musical')}>Musicals</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/Play')}>Plays</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/Special')}>Specials</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/Concert')}>Concerts</Menu.Item>

                    <Menu.Menu position='right'>
                    {this.props.currentUser.id ?
                    <Menu.Item onClick={() => history.push('/dashboard')}>Profile</Menu.Item> : null}
                    {this.props.currentUser.id ? 
                    <Menu.Item  onClick={this.handleLogout}>Log Out</Menu.Item> :
                    <Menu.Item  onClick ={() => history.push('/login')} >Log In</Menu.Item>}
                    </Menu.Menu>

                </Menu>
            </div>
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
