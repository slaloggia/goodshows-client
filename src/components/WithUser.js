import React from 'react'

export default function WithUser(WrappedComponent) {
    return class extends React.Component {

        componentDidMount() {
            const token = localStorage.getItem('token')

            if(token) {
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
                        this.props.loginSuccess(data)
                    }
                })
            }
        }

        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
}