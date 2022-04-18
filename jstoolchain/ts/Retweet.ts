class Retweet {
    retweetButtons: HTMLElement[]
    xcsrfToken: string

    constructor(retweetButtons: HTMLElement[], xcsrfToken: string) {
        this.retweetButtons = retweetButtons;

        this.retweetButtons.forEach(element => {
            element.onclick = () => {
                if (element.dataset.action == 'unretweet') {
                    let tweetId = element.dataset.id
                    this.changeRetweetButtonAction(tweetId)
                    this.unretweet(tweetId)
                } else {
                    let tweetId = element.dataset.id
                    this.changeUnretweetButtonAction(tweetId)
                    this.retweet(tweetId)
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
    private retweet(id: string) {
        fetch(`http://127.0.0.1:8000/tweet/retweet/${id}/`, this.fetchInit()).then(response => {

            if (response.status != 200) {
                // Reset like button and count when the request fails
                this.changeRetweetButtonAction(id)
            }
        })
    }

    /**
     * @param  {string} id
     * Send unretweet tweet request to server
     */
    private unretweet(id: string) {
        // fetch(`http://127.0.0.1:8000/tweet/unlike_tweet/${id}/`, this.fetchInit()).then(response => {
        //     if (response.status != 200) {
        //         // Reset unretweet button and count when the request fails
        //         this.changeUnretweetButtonAction(id)
        //     }
        // })
        console.log("unretweeted")
    }

    /**
     *  Change unretweet button action
     */
    private changeUnretweetButtonAction(dataId: string): void {
        const unlikeButtons: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-button="retweet"][data-id="${dataId}"]`)

        unlikeButtons.forEach(element => {
            const retweetIcon = element.querySelector('i')
            retweetIcon.classList.add('text-green-500')

            const retweetsCount = element.querySelectorAll('span')[0]
            retweetsCount.classList.add('text-green-500')
            const retweetsCountNumber = parseInt(retweetsCount.innerText)
            retweetsCount.innerText = `${retweetsCountNumber + 1}`

            element.dataset.action = 'unretweet'
        })
    }


    /**
     * @param  {string} dataId
     *  Change retweet button action
     */
    private changeRetweetButtonAction(dataId: string) {
        const retweetButtons: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-button="retweet"][data-id="${dataId}"]`)

        retweetButtons.forEach(element => {
            const retweetIcon = element.querySelector('i')
            retweetIcon.classList.remove('text-green-500')

            const retweetsCount = element.querySelectorAll('span')[0]
            retweetsCount.classList.remove('text-green-500')
            const retweetsCountNumber = parseInt(retweetsCount.innerText)
            retweetsCount.innerText = `${retweetsCountNumber - 1}`

            element.dataset.action = 'reweet'
        })
    }
}

export default Retweet