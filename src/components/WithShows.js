import React from 'react'

export default function WithShows(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {

            
            if(this.props.shows.length === 0) {
                this.props.getShows()
                this.props.getReviews()
                
            };
            

            const token = localStorage.getItem('token')

            if(token && !this.props.currentUser.loggedIn) {
                const reqObj = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }

                fetch('https://intense-wildwood-13749.herokuapp.com/api/v1/current_user', reqObj)
                .then(resp => resp.json())
                .then(data => {
                    if(data.error) {
                        this.props.history.push('/login')
                    }else{
                        this.props.getUserInfo(data.id)
                    }
                })
            }
        }

        

        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
}