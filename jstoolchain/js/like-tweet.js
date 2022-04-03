
const likeButtons = document.querySelectorAll('[id^="like-button-"]')
const likeButtonsArray = Array.from(likeButtons)

likeButtonsArray.forEach(element => {
    element.onclick = () => {
        tweetId = element.id.split('-')[2]
        likeTweet(tweetId, element)
    }
})

function likeTweet(id, likeButton) {
    fetch(`http://127.0.0.1:8000/tweet/like_tweet/${id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
    }).then(response => {
        if (response.status == 200) {
            // Make icon filled
            const likeIcon = likeButton.querySelectorAll('i')[0]
            likeIcon.classList.replace('fa-regular', 'fa-solid')
            likeIcon.classList.add('text-red-500')

            const likesCount = likeButton.querySelectorAll('span')[0]
            const likesCountNumber = parseInt(likesCount.innerText)
            likesCount.innerText = likesCountNumber + 1
        }
    })
}