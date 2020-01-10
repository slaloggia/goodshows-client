import history from '../history';

const SHOWS_URL = 'http://localhost:3000/shows'
const USER_SHOWS_URL = 'http://localhost:3000/user_shows'

export function getShows() {
    return (dispatch) => {
        fetch(SHOWS_URL)
        .then(resp => resp.json())
        .then(shows => dispatch({type: 'GET_SHOWS', shows}))
    }
}

export function addToList(show) {
    return (dispatch) => {
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(show)
        }
        fetch(USER_SHOWS_URL, reqObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
        .then(() => history.push('/dashboard'))
    }
    
}