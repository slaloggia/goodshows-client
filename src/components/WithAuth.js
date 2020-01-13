import React from 'react'

export default function WithAuth(WrappedComponent) {
    return class extends React.Component {

        componentDidMount() {

            const token = localStorage.getItem('token')

            if(!token) {
                this.props.history.push('/login')
            }else{
                const reqObj = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }

                fetch('http://localhost:3000/api/v1/current_user', reqObj)
                .then(resp => resp.json())
                .then(data => {
                    console.log('***', data)
                    if(data.error) {
                        this.props.history.push('/login')
                    }else{
                        // this.props.loginSuccess(data)
                        this.props.getUserInfo(data.id)
                    }
                })
            }
            if(this.props.shows.length === 0) {
                this.props.getShows()
            };


        }

        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
}