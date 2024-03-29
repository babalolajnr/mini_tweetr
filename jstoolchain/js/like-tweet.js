
const likeButtons = document.querySelectorAll('[data-button="like"]')
let likeButtonsArray = Array.from(likeButtons)

likeButtonsArray.forEach(element => {
    element.onclick = () => {
        if (element.dataset.state == 'liked') {
            let tweetId = element.dataset.id
            changeLikeButtonState(tweetId)
            unlikeTweet(tweetId, element)
        } else {
            let tweetId = element.dataset.id
            changeUnlikeButtonState(tweetId)
            likeTweet(tweetId, element)
        }
    }
})

/**
 * @param  {} id
 * @param  {} likeButton
 * Send like tweet request to server
 */
function likeTweet(id, likeButton) {
    fetch(`http://127.0.0.1:8000/tweet/like_tweet/${id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
    }).then(response => {
        if (response.status != 200) {
            // Reset like button and count when the request fails
            changeLikeButtonState(likeButton)
        }
    })
}

/**
 * @param  {} id
 * @param  {} unlikeButton
 * Send unlike tweet request to server
 */
function unlikeTweet(id, unlikeButton) {
    fetch(`http://127.0.0.1:8000/tweet/unlike_tweet/${id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
    }).then(response => {
        if (response.status != 200) {
            // Reset unlike button and count when the request fails
            changeUnlikeButtonState(unlikeButton)
        }
    })
}

/**
 * @param  {} likeButton
 *  Change like button state to ulike button state
 */
function changeLikeButtonState(dataId) {
    const likeButtons = document.querySelectorAll(`[data-id="${dataId}"]`)

    likeButtons.forEach(element => {
        const likeIcon = element.querySelector('i')
        likeIcon.classList.replace('fa-solid', 'fa-regular')
        likeIcon.classList.remove('text-red-500')

        const likesCount = element.querySelectorAll('span')[0]
        const likesCountNumber = parseInt(likesCount.innerText)
        likesCount.innerText = likesCountNumber - 1

        element.dataset.state = 'unliked'
    })
}

/**
 * @param  {} unlikeButton
 *  Change unlike button state to like button state
 */
function changeUnlikeButtonState(dataId) {
    const unlikeButtons = document.querySelectorAll(`[data-id="${dataId}"]`)

    unlikeButtons.forEach(element => {
        const likeIcon = element.querySelector('i')
        likeIcon.classList.replace('fa-regular', 'fa-solid')
        likeIcon.classList.add('text-red-500')

        const likesCount = element.querySelectorAll('span')[0]
        const likesCountNumber = parseInt(likesCount.innerText)
        likesCount.innerText = likesCountNumber + 1

        element.dataset.state = 'liked'
    })
}