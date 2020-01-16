export default function userReducer(state={
    loggedIn: false
}, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                loggedIn: true,
                id: action.user.id,
                username: action.user.username,
                avatar: action.user.avatar,
                since: action.user.created_at,
                my_reviews: action.user.reviews,
                my_shows: action.user.user_shows
            }
        case 'LOGOUT_USER':
            return {loggedIn: false}
        case 'ADD_USER_SHOW':
            const current_shows = state.my_shows
            return {
                ...state, 
                my_shows: [...current_shows, action.data]
            }
        default:
        return state
    }
}