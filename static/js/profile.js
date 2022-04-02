const tweetsTab = document.getElementById('tweets-tab')
const tweetsAndRepliesTab = document.getElementById('tweets-and-replies-tab');
const likesTab = document.getElementById('likes-tab');
const mediaTab = document.getElementById('media-tab');
const editProfile = document.getElementById('edit-profile')
const editProfileModal = document.getElementById('edit-profile-modal')

const tweetsTabView = document.getElementById('tweets-tab-view');
const tweetsAndRepliesTabView = document.getElementById('tweets-and-replies-tab-view')
const likesTabView = document.getElementById('likes-tab-view')
const mediaTabView = document.getElementById('media-tab-view')

const relations = {
    'tweets-tab': [tweetsTab, tweetsTabView],
    'tweets-and-replies-tab': [tweetsAndRepliesTab, tweetsAndRepliesTabView],
    'likes-tab': [likesTab, likesTabView],
    'media-tab': [mediaTab, mediaTabView]
}

const tabs = [tweetsTab, likesTab, mediaTab, tweetsAndRepliesTab];

const parser = new DOMParser();
const activeTabIndicatorString = "<div class='w-16 h-1 bg-yellow-400 rounded-full'></div>"

// Parse the active tab indicator string and extract the firstChild
// which his the node we need to append to the parent div
const activeTabIndicator = parser.parseFromString(activeTabIndicatorString, 'text/html').body.firstChild

// On page load set tweetsTab as active
tweetsTab.appendChild(activeTabIndicator)
tweetsTabView.classList.remove('hidden')

tabs.forEach(element => {
    element.onclick = () => {
        element.appendChild(activeTabIndicator)

        // Iterate through relation keys and find one that matches
        // the element clicked on's id
        Object.keys(relations).forEach((i) => {
            if (i == element.id) {
                const tabView = relations[i][1]
                tabView.classList.remove('hidden')
            } else {
                const tabView = relations[i][1]
                tabView.classList.add('hidden')
            }
        })
    }
});

// Display edit modal
editProfile.onclick = () => {
    editProfileModal.classList.remove('hidden')
    editProfileModal.classList.add('flex')
}



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
        // response.json().then(data => {
        //     console.log(data)
        // })
        console.log(response)
    })
}