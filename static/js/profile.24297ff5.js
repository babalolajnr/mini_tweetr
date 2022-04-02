var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var parcelRequire = $parcel$global["parcelRequire938a"];
parcelRequire.register("a5kBe", function(module, exports) {
const $757a59a0cba01a58$var$tweetsTab = document.getElementById('tweets-tab');
const $757a59a0cba01a58$var$tweetsAndRepliesTab = document.getElementById('tweets-and-replies-tab');
const $757a59a0cba01a58$var$likesTab = document.getElementById('likes-tab');
const $757a59a0cba01a58$var$mediaTab = document.getElementById('media-tab');
const $757a59a0cba01a58$var$editProfile = document.getElementById('edit-profile');
const $757a59a0cba01a58$var$editProfileModal = document.getElementById('edit-profile-modal');
const $757a59a0cba01a58$var$tweetsTabView = document.getElementById('tweets-tab-view');
const $757a59a0cba01a58$var$tweetsAndRepliesTabView = document.getElementById('tweets-and-replies-tab-view');
const $757a59a0cba01a58$var$likesTabView = document.getElementById('likes-tab-view');
const $757a59a0cba01a58$var$mediaTabView = document.getElementById('media-tab-view');
const $757a59a0cba01a58$var$relations = {
    'tweets-tab': [
        $757a59a0cba01a58$var$tweetsTab,
        $757a59a0cba01a58$var$tweetsTabView
    ],
    'tweets-and-replies-tab': [
        $757a59a0cba01a58$var$tweetsAndRepliesTab,
        $757a59a0cba01a58$var$tweetsAndRepliesTabView
    ],
    'likes-tab': [
        $757a59a0cba01a58$var$likesTab,
        $757a59a0cba01a58$var$likesTabView
    ],
    'media-tab': [
        $757a59a0cba01a58$var$mediaTab,
        $757a59a0cba01a58$var$mediaTabView
    ]
};
const $757a59a0cba01a58$var$tabs = [
    $757a59a0cba01a58$var$tweetsTab,
    $757a59a0cba01a58$var$likesTab,
    $757a59a0cba01a58$var$mediaTab,
    $757a59a0cba01a58$var$tweetsAndRepliesTab
];
const $757a59a0cba01a58$var$parser = new DOMParser();
const $757a59a0cba01a58$var$activeTabIndicatorString = "<div class='w-16 h-1 bg-yellow-400 rounded-full'></div>";
// Parse the active tab indicator string and extract the firstChild
// which his the node we need to append to the parent div
const $757a59a0cba01a58$var$activeTabIndicator = $757a59a0cba01a58$var$parser.parseFromString($757a59a0cba01a58$var$activeTabIndicatorString, 'text/html').body.firstChild;
// On page load set tweetsTab as active
$757a59a0cba01a58$var$tweetsTab.appendChild($757a59a0cba01a58$var$activeTabIndicator);
$757a59a0cba01a58$var$tweetsTabView.classList.remove('hidden');
$757a59a0cba01a58$var$tabs.forEach((element)=>{
    element.onclick = ()=>{
        element.appendChild($757a59a0cba01a58$var$activeTabIndicator);
        // Iterate through relation keys and find one that matches
        // the element clicked on's id
        Object.keys($757a59a0cba01a58$var$relations).forEach((i)=>{
            if (i == element.id) {
                const tabView = $757a59a0cba01a58$var$relations[i][1];
                tabView.classList.remove('hidden');
            } else {
                const tabView = $757a59a0cba01a58$var$relations[i][1];
                tabView.classList.add('hidden');
            }
        });
    };
});
// Display edit modal
$757a59a0cba01a58$var$editProfile.onclick = ()=>{
    $757a59a0cba01a58$var$editProfileModal.classList.remove('hidden');
    $757a59a0cba01a58$var$editProfileModal.classList.add('flex');
};
const $757a59a0cba01a58$var$likeButtons = document.querySelectorAll('[id^="like-button-"]');
const $757a59a0cba01a58$var$likeButtonsArray = Array.from($757a59a0cba01a58$var$likeButtons);
$757a59a0cba01a58$var$likeButtonsArray.forEach((element)=>{
    element.onclick = ()=>{
        tweetId = element.id.split('-')[2];
        $757a59a0cba01a58$var$likeTweet(tweetId);
    };
});
function $757a59a0cba01a58$var$likeTweet(id) {
    fetch(`http://127.0.0.1:8000/tweet/like_tweet/${id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value
        }
    }).then((response)=>{
        response.status;
    });
}

});


//# sourceMappingURL=profile.24297ff5.js.map
