export default function userReducer(state={
    
}, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                id: action.user.id,
                username: action.user.username,
                since: '',
                my_reviews: [],
                my_shows: []
            }
        case 'GET_USER_INFO':
            return {
                ...state,
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