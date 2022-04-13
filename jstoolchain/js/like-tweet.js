
const likeButtons = document.querySelectorAll('[id^="like-button-"]')
const likedTweetsLikeButtons = document.querySelectorAll('[id^="liked-tweet-like-button-"]')
const likedTweetsLikeButtonsArray = Array.from(likedTweetsLikeButtons)
let likeButtonsArray = Array.from(likeButtons)
likeButtonsArray = [...likeButtonsArray, ...likedTweetsLikeButtonsArray]

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
    const likeButton = document.querySelector(`[data-id="${dataId}"]`)

    const likeIcon = likeButton.querySelector('i')
    likeIcon.classList.replace('fa-solid', 'fa-regular')
    likeIcon.classList.remove('text-red-500')

    const likesCount = likeButton.querySelectorAll('span')[0]
    const likesCountNumber = parseInt(likesCount.innerText)
    likesCount.innerText = likesCountNumber - 1

    likeButton.dataset.state = 'unliked'
}

/**
 * @param  {} unlikeButton
 *  Change unlike button state to like button state
 */
function changeUnlikeButtonState(dataId) {
    const unlikeButton = document.querySelector(`[data-id="${dataId}"]`)
    const likeIcon = unlikeButton.querySelector('i')
    likeIcon.classList.replace('fa-regular', 'fa-solid')
    likeIcon.classList.add('text-red-500')

    // Increase likes count
    const likesCount = unlikeButton.querySelectorAll('span')[0]
    const likesCountNumber = parseInt(likesCount.innerText)
    likesCount.innerText = likesCountNumber + 1

    unlikeButton.dataset.state = 'liked'
}