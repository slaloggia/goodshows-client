import history from '../history';
const USERS_URL = 'http://localhost:3000/users/'
const USER_SHOWS_URL = 'http://localhost:3000/user_shows'



export const loginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        user
    }
}

export function getUserInfo(id) {
    return (dispatch) => {

        fetch(USERS_URL + id)
        .then(resp => resp.json())
        .then(user => dispatch(loginSuccess(user)))
    }
}

export const logoutUser= () => {
    return {
      type: 'LOGOUT_USER',
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
        .then(data => dispatch({type: 'ADD_USER_SHOW', data}))
        .then(() => history.push('/dashboard'))
    }
}