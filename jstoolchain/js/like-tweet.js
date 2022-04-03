
const likeButtons = document.querySelectorAll('[id^="like-button-"]')
const likeButtonsArray = Array.from(likeButtons)

likeButtonsArray.forEach(element => {
    element.onclick = () => {
        if (element.dataset.state == 'liked') {
            changeLikeButtonState(element)
            tweetId = element.id.split('-')[2]
            unlikeTweet(tweetId, element)
        } else {
            changeUnlikeButtonState(element)
            tweetId = element.id.split('-')[2]
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
function changeLikeButtonState(likeButton) {
    const likeIcon = likeButton.querySelectorAll('i')[0]
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
function changeUnlikeButtonState(unlikeButton) {
    const likeIcon = unlikeButton.querySelectorAll('i')[0]
    likeIcon.classList.replace('fa-regular', 'fa-solid')
    likeIcon.classList.add('text-red-500')

    // Increase likes count
    const likesCount = unlikeButton.querySelectorAll('span')[0]
    const likesCountNumber = parseInt(likesCount.innerText)
    likesCount.innerText = likesCountNumber + 1

    unlikeButton.dataset.state = 'liked'
}