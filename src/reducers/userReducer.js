export default function userReducer(state={
    loggedIn: false,
    id: null,
    username: '',
    avatar: null,
    since: null,
    my_reviews: [],
    my_shows: [],
    notifications: []
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
                my_shows: action.user.user_shows,
                notifications: []
            }
        case 'LOGOUT_USER':
            return {loggedIn: false}
        case 'ADD_USER_SHOW':
            const current_shows = state.my_shows
            const new_show = action.data
            if (current_shows.find(user_show => user_show.show_id === new_show.show_id)) {
                const index = state.my_shows.findIndex(user_show => user_show.show_id === new_show.show_id)
                const my_shows = [...state.my_shows.slice(0, index), new_show, ...state.my_shows.slice(index+1)]
                return {
                    ...state,
                    my_shows: my_shows
                }
            }else{
            return {
                ...state, 
                my_shows: [...current_shows, action.data]
            }}
        case 'UPDATE_PROFILE_PIC':
            return {
                ...state,
                avatar: action.data.avatar
            }
        case 'GET_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.data
            }
        case 'REMOVE_NOTIFICATION':
            const unread = state.notifications.filter(n => n.id !== action.notif.id)
            return {
                ...state,
                notifications: unread
            }
        default:
        return state
    }
}