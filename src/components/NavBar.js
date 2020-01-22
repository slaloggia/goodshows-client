import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Menu, Image, Dropdown, Icon, Label, Popup, Feed } from 'semantic-ui-react'
import history from '../history'
import { logoutUser, getNotifications, deleteNotification } from '../actions/userActions'

class NavBar extends Component {

    handleLogout = () => {
        localStorage.removeItem('token')
        this.props.logoutUser()
        history.push('/')
    }

    handleReadNotification = (notifId, showId) => {
        this.props.deleteNotification(notifId)
        history.push(`/show/${showId}`)
    }

    notificationFeed() {
        return this.props.currentUser.notifications.map(n => {
            const thisReview = this.props.reviews.find(review => review.id === n.notifiable_id)
            return (
            <Feed.Event key={n.id}>
                <Feed.Content>
                    <Feed.Summary>
                        <Feed.User onClick={() => this.handleReadNotification(n.id, thisReview.show_id)}>{n.actor.username}</Feed.User> commented on your {thisReview.show.title} review
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>)
        })
    }


    render() {
        return (
            <div className='page-header'>
                <div className='banner-img'><br/><br/><br></br>GoodShows!</div>
                <Menu inverted size='huge' fitted='vertically'>
                    <Menu.Item onClick={() => history.push('/')}>Home</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows')}>All Shows</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/Musical')}>Musicals</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/Play')}>Plays</Menu.Item>
                    <Menu.Item onClick={()=> history.push('/shows/other')}>Other</Menu.Item>

                    
                {this.props.currentUser.id ?
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            {this.props.currentUser.notifications.length > 0 ?
                            <Label id='notif-label' circular >{this.props.currentUser.notifications.length}</Label> : null}
                            <Popup trigger={<Icon name='bell'/>} on='click' offset='0, 5px' position='bottom center' >
                                <Feed >
                                    {this.notificationFeed()}
                                </Feed>
                            </Popup>
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

const mapStateToProps = ({currentUser, reviews}) => ({currentUser, reviews})

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: ()=> dispatch(logoutUser()),
        getNotifications: (id) => dispatch(getNotifications(id)),
        deleteNotification: (id) => dispatch(deleteNotification(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
