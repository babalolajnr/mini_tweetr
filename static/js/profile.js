const tweetsTab = document.getElementById('tweets-tab')
const tweetsAndRepliesTab = document.getElementById('tweets-and-replies-tab');
const likesTab = document.getElementById('likes-tab');
const mediaTab = document.getElementById('media-tab');

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
