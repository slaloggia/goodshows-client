export default function showReducer(state = [], action){
    switch(action.type){
        case 'GET_SHOWS':
            return action.shows
        case 'ADD_REVIEW':
            const review = action.newReview
            console.log(review)
            const reviewedShow = state.find(show => show.id === review.show_id)
            const index = state.findIndex(show => show.id === reviewedShow.id)
            console.log(reviewedShow)
            reviewedShow.reviews = [...reviewedShow.reviews, review]
            const updatedShows = [...state.slice(0, index), reviewedShow, ...state.slice(index+1)]
            return updatedShows
        default:
        return state
    }
}