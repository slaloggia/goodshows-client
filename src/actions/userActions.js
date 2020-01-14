import history from '../history';
const USERS_URL = 'http://localhost:3000/users/'


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