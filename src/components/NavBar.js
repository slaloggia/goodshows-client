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
                <div className='banner-img'><br/><br/><br></br>GoodShows!</div>
                <Menu inverted size='large'>
                    <Menu.Item onClick={() => history.push('/')}>Home</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/Musical')}>Musicals</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/Play')}>Plays</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/other')}>Other</Menu.Item>

                    <Menu.Menu position='right'>
                    {this.props.currentUser.id ?
                    <Menu.Item onClick={() => history.push(`/dashboard`)}>Profile</Menu.Item> : 
                    <Menu.Item onClick={() => history.push('/signup')}>Sign Up</Menu.Item>}
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
