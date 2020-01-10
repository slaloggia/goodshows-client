export default function userReducer(state={}, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                id: action.user.id,
                username: action.user.username,
                my_shows: action.user.my_shows,
                my_reviews: action.user.my_reviews
            }
        case 'LOGOUT_USER':
            return {}
        default:
        return state
    }
}