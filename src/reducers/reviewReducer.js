export default function reviewReducer(state = [], action){
    switch(action.type){
        case 'GET_REVIEWS':
            return action.reviews
        case 'ADD_REVIEW':
            return [...state, action.newReview]
        case 'EDIT_REVIEW':
            const updatedReview = action.updatedReview
            const updateIndex = state.findIndex(review => review.id === updatedReview.id)
            const updatedReviews = [...state.slice(0,updateIndex), updatedReview, ...state.slice(updateIndex+1)]
            return updatedReviews
        case 'DELETE_REVIEW':
            const remainingReviews = state.filter(review => review.id !== action.id)
            return remainingReviews
        case 'ADD_COMMENT':
            const commentedReview = state.find(review => review.id === action.newComment.review_id)
            const commentIndex = state.findIndex(review => review.id === commentedReview.id)
            commentedReview.comments = [...commentedReview.comments, action.newComment]
            const commentedReviews = [...state.slice(0,commentIndex), commentedReview, ...state.slice(commentIndex+1)]
            return commentedReviews
        default:
        return state
    }
}
