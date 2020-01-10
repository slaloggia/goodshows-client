import history from '../history'
const REVIEWS_URL= 'http://localhost:3000/reviews'

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