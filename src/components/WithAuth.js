import React from 'react'

export default function WithAuth(WrappedComponent) {
    return class extends React.Component {

        componentDidMount() {

            const token = localStorage.getItem('token')

            if(!token) {
                this.props.history.push('/login')
            }else if (token && !this.props.currentUser.loggedIn){
                const reqObj = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }

                fetch('https://good-shows-api.herokuapp.com/api/v1/current_user', reqObj)
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