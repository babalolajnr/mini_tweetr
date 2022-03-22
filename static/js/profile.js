const tweetsTab = document.getElementById('tweets-tab')
const tweetsAndRepliesTab = document.getElementById('tweets-and-replies-tab');
const likesTab = document.getElementById('likes-tab');
const mediaTab = document.getElementById('media-tab');

const tabs = [tweetsTab, likesTab, mediaTab, tweetsAndRepliesTab];

const parser = new DOMParser();
const activeTabIndicatorString = "<div class='w-16 h-1 bg-yellow-400 rounded-full'></div>"

// Parse the active tab indicator string and extract the firstChild
// which his the node we need to append to the parent div
const activeTabIndicator = parser.parseFromString(activeTabIndicatorString, 'text/html').body.firstChild

tabs.forEach(element => {
    element.onclick = () => {
        element.appendChild(activeTabIndicator)
    }
});
