export default function userReducer(state={}, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                id: action.user.id,
                username: action.user.username,
                since: action.user.created_at,
                my_reviews: action.user.reviews,
                my_shows: action.user.user_shows
            }
        case 'LOGOUT_USER':
            return {}
        default:
        return state
    }
}