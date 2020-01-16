import history from '../history';

const SHOWS_URL = 'http://localhost:3000/shows'

export function getShows() {
    return (dispatch) => {
        fetch(SHOWS_URL)
        .then(resp => resp.json())
        .then(shows => dispatch({type: 'GET_SHOWS', shows}))
    }
}

    
