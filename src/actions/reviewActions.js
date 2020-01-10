import history from '../history'
const REVIEWS_URL= 'http://localhost:3000/reviews'

export function createReview(review) {
    return (dispatch) => {
        console.log(review)
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
        .then(newReview => console.log(newReview))
        .then(() => history.push('/dashboard'))
    }
}