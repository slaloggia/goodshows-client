import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShowPage extends Component {
    
    render() {
        const show = this.props.shows.find(show => show.id === parseInt(this.props.match.params.id))
        return (
        <div>    
            <h1>{show.title}</h1>
        </div>
        )
    }
}
const mapStateToProps = ({shows}) => ({shows})

export default connect(mapStateToProps)(ShowPage)