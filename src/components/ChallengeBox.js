import React from 'react'
import { Progress, Segment} from 'semantic-ui-react'

const ChallengeBox = (props) => {
    let yearShows = props.shows.filter(show => show.created_at.startsWith('2020'))
    return (
        <Segment id='challenge-box'>
            <h3>20 Shows in 2020 Challenge!</h3>
            <p>{yearShows.length} of 20</p>
            <Progress percent={(yearShows.length/20)*100} />

        </Segment>
    )
}

export default ChallengeBox