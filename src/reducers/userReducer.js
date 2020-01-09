export default function userReducer(state={}, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                id: action.user.id,
                username: action.user.username
            }
        case 'LOGOUT_USER':
            return {}
        default:
        return state
    }
}