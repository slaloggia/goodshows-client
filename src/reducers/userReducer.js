export default function userReducer(state={}, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {...action.user}
        default:
        return state
    }
}