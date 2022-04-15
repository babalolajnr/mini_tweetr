class Like {
    likeButtons: HTMLElement[]
    xcsrfToken: string

    constructor(likeButtons: HTMLElement[], xcsrfToken: string) {
        this.likeButtons = likeButtons;

        this.likeButtons.forEach(element => {
            element.onclick = () => {
                if (element.dataset.action == 'unlike') {
                    let tweetId = element.dataset.id
                    this.changeLikeButtonState(tweetId)
                    this.unlikeTweet(tweetId)
                } else {
                    let tweetId = element.dataset.id
                    this.changeUnlikeButtonState(tweetId)
                    this.likeTweet(tweetId)
                }
            }
        })

        this.xcsrfToken = xcsrfToken
    }

    /**
     * fetch API initialization
     * @returns {Object}
     */
    private fetchInit(): object {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFToken': this.xcsrfToken
            },
        }
    }

    /**
     * @param  {string} id
     * Send like tweet request to server
     */
    private likeTweet(id: string) {
        fetch(`http://127.0.0.1:8000/tweet/like_tweet/${id}/`, this.fetchInit()).then(response => {
            if (response.status != 200) {
                // Reset like button and count when the request fails
                this.changeLikeButtonState(id)
            }
        })
    }

    /**
     * @param  {string} id
     * Send unlike tweet request to server
     */
    private unlikeTweet(id: string) {
        fetch(`http://127.0.0.1:8000/tweet/unlike_tweet/${id}/`, this.fetchInit()).then(response => {
            if (response.status != 200) {
                // Reset unlike button and count when the request fails
                this.changeUnlikeButtonState(id)
            }
        })
    }

    /**
     *  Change unlike button state to like button state
     */
    private changeUnlikeButtonState(dataId: string): void {
        const unlikeButtons: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-id="${dataId}"]`)

        unlikeButtons.forEach(element => {
            const likeIcon = element.querySelector('i')
            likeIcon.classList.replace('fa-regular', 'fa-solid')
            likeIcon.classList.add('text-red-500')

            const likesCount = element.querySelectorAll('span')[0]
            const likesCountNumber = parseInt(likesCount.innerText)
            likesCount.innerText = `${likesCountNumber + 1}`

            element.dataset.state = 'liked'
        })
    }


    /**
     * @param  {string} dataId
     *  Change like button state to ulike button state
     */
    private changeLikeButtonState(dataId: string) {
        const likeButtons: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-id="${dataId}"]`)

        likeButtons.forEach(element => {
            const likeIcon = element.querySelector('i')
            likeIcon.classList.replace('fa-solid', 'fa-regular')
            likeIcon.classList.remove('text-red-500')

            const likesCount = element.querySelectorAll('span')[0]
            const likesCountNumber = parseInt(likesCount.innerText)
            likesCount.innerText = `${likesCountNumber - 1}`

            element.dataset.state = 'unliked'
        })
    }
}

export default Like