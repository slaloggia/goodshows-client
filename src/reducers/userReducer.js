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
                id: action.user.id,
                username: action.user.username,
                since: action.user.created_at,
                my_reviews: action.user.reviews,
                my_shows: action.user.user_shows
            }
        case 'DELETE_REVIEW':
            const reviews = state.my_reviews.filter(review => review.id !== action.id)
            return {
                ...state,
                my_reviews: reviews
            }
        case 'LOGOUT_USER':
            return {}
        default:
        return state
    }
}