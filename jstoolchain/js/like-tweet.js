
const likeButtons = document.querySelectorAll('[id^="like-button-"]')
const likeButtonsArray = Array.from(likeButtons)

likeButtonsArray.forEach(element => {
    element.onclick = () => {
        tweetId = element.id.split('-')[2]
        likeTweet(tweetId)
    }
})

function likeTweet(id) {
    fetch(`http://127.0.0.1:8000/tweet/like_tweet/${id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
    }).then(response => {
        if (response.status == 200) {
            const likeButton = document.getElementById(`like-button-${id}`)
            const likeCount = document.getElementById(`like-count-${id}`)
            const likeCountNumber = parseInt(likeCount.innerText)
            likeCount.innerText = likeCountNumber + 1
            likeButton.classList.add('hidden')
            const unlikeButton = document.getElementById(`unlike-button-${id}`)
            unlikeButton.classList.remove('hidden')
        }
    })
}