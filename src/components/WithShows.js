import React from 'react'

export default function WithShows(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {

            
            if(this.props.shows.length === 0) {
                this.props.getShows()
                
            };
            

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