import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Rating, Card, Image } from 'semantic-ui-react'
import WithShows from '../components/WithShows'
import { getShows } from '../actions/showActions'

class ShowPage extends Component {

    findShow() {
        return this.props.shows.find(show => show.id === parseInt(this.props.match.params.id))
    }

    renderShowCard() {
        const show = this.findShow()
        return (
        <Card   key={show.id}>
                    <Image src={show.image} id={show.id}/>
                    <Card.Content>
                        <Card.Header>{show.title}</Card.Header>
                        <Card.Meta className='show-category'>
                            <span>{show.category}</span>
                        </Card.Meta>
                        <Card.Description>
                            <Rating defaultRating={3} maxRating={5} disabled/>
                        </Card.Description>

                    </Card.Content>
                </Card>
        )

    }
    render() {
        return (
            this.props.shows.length === 0 ? <h3>Loading</h3> :
        <Grid columns='two' id='show-detail-grid'>
            <Grid.Row>
                <Grid.Column width={6}>
                    {this.renderShowCard()}
                </Grid.Column>
                <Grid.Column width={8}>
                    <h2>Reviews Go Here</h2>

                </Grid.Column>
            </Grid.Row>
        </Grid>
        )
    }
}
const mapStateToProps = ({shows}) => ({shows})
function mapDispatchToProps(dispatch) {
    return {
        getShows: () => dispatch(getShows())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithShows(ShowPage))