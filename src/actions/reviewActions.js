import history from '../history'
const REVIEWS_URL= 'https://intense-wildwood-13749.herokuapp.com/reviews/'

export function getReviews() {
    return (dispatch) => {
        fetch(REVIEWS_URL)
        .then(resp => resp.json())
        .then(reviews => dispatch({type: 'GET_REVIEWS', reviews}))
    }
}

export function createReview(review) {
    return (dispatch) => {
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(review)
        }

        fetch(REVIEWS_URL, reqObj)
        .then(resp => resp.json())
        .then(newReview => 
            dispatch({type: 'ADD_REVIEW', newReview})
            )
        .then(() => history.push('/dashboard'))
    }
}

export function updateReview(review) {
    return (dispatch) => {
        const id = review.review_id
        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(review)
        }

        fetch(REVIEWS_URL + id, reqObj)
        .then(resp => resp.json())
        .then(updatedReview => dispatch({type: 'EDIT_REVIEW', updatedReview}))
        // .then(() => history.push('/dashboard'))
    }
}

export function deleteReview(id) {
    return (dispatch) => {
        fetch(REVIEWS_URL + id, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(deletedReview => dispatch({type: 'DELETE_REVIEW', id: deletedReview.id}))
        .then(() => history.push('/dashboard'))
    }
}