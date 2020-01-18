// import history from '../history';

const SHOWS_URL = 'https://intense-wildwood-13749.herokuapp.com/shows'

export function getShows() {
    return (dispatch) => {
        fetch(SHOWS_URL)
        .then(resp => resp.json())
        .then(shows => dispatch({type: 'GET_SHOWS', shows}))
    }
}

    
