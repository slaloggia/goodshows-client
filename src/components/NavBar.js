import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Menu, Image, Dropdown, Icon, Label } from 'semantic-ui-react'
import history from '../history'
import { logoutUser, getNotifications } from '../actions/userActions'

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
                <Menu inverted size='large' fitted='vertically'>
                    <Menu.Item onClick={() => history.push('/')}>Home</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows')}>All Shows</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/Musical')}>Musicals</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/Play')}>Plays</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/other')}>Other</Menu.Item>

                    
                {this.props.currentUser.id ?
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            {this.props.currentUser.notifications.length > 0 ?
                            <Label color='blue' circular >{this.props.currentUser.notifications.length}</Label> : null}
                            <Icon name='bell'/>
                        </Menu.Item>
                        <Menu.Item >
                            <Image src={this.props.currentUser.avatar || require('../images/default-user-icon.jpg')} avatar/>
                            <Dropdown options={[
                                <Menu.Item  onClick={() => history.push(`/dashboard`)} key='profile'>Profile</Menu.Item>,
                                <Menu.Item  onClick={this.handleLogout} key='logout'>Log Out</Menu.Item> 
                            ]}/>
                        </Menu.Item> 
                    </Menu.Menu> : 
                    <Menu.Menu position='right'>
                        <Menu.Item onClick={() => history.push('/signup')}>Sign Up</Menu.Item>
                        <Menu.Item  onClick ={() => history.push('/login')} >Log In</Menu.Item>
                    </Menu.Menu>}
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = ({currentUser}) => ({currentUser})

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: ()=> dispatch(logoutUser()),
        getNotifications: (id) => dispatch(getNotifications(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
