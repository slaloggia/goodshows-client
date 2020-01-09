import React from 'react'

export default function WithShows(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            if(this.props.shows.length === 0) {
                this.props.getShows()
            }
        }

        render() {
            // debugger
            return <WrappedComponent {...this.props}/>
        }
    }
}