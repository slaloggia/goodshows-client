export default function reviewReducer(state = [], action){
    switch(action.type){
        case 'GET_REVIEWS':
            return action.reviews
        case 'ADD_REVIEW':
            return [...state, action.newReview]
        case 'EDIT_REVIEW':
            const updatedReview = action.updatedReview
            const index = state.findIndex(review => review.id === updatedReview.id)
            const updatedReviews = [...state.slice(0,index), updatedReview, ...state.slice(index+1)]
            return updatedReviews
        case 'DELETE_REVIEW':
            const remainingReviews = state.filter(review => review.id !== action.id)
            return remainingReviews
        default:
        return state
    }
}
