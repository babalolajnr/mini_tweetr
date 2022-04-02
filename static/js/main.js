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
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire938a"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire938a"] = parcelRequire;
}
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

parcelRequire.register("haw7a", function(module, exports) {
const $c7fc48236b5c00cc$var$close = document.getElementById('close');
const $c7fc48236b5c00cc$var$modalContent = document.getElementById('modal-content');
const $c7fc48236b5c00cc$var$editProfileModal = document.getElementById('edit-profile-modal');
$c7fc48236b5c00cc$var$close.onclick = ()=>{
    $c7fc48236b5c00cc$var$editProfileModal.classList.remove('flex');
    $c7fc48236b5c00cc$var$editProfileModal.classList.add('hidden');
};
const $c7fc48236b5c00cc$var$modalContentChildren = $c7fc48236b5c00cc$var$modalContent.querySelectorAll('*');
const $c7fc48236b5c00cc$var$modalContentChildrenArray = Array.from($c7fc48236b5c00cc$var$modalContentChildren);
// Close modal if anywhere is clicked outside the modal content
document.getElementById('edit-profile-modal').onclick = (e)=>{
    if (e.target != $c7fc48236b5c00cc$var$modalContent && !$c7fc48236b5c00cc$var$modalContentChildrenArray.includes(e.target)) {
        $c7fc48236b5c00cc$var$editProfileModal.classList.remove('flex');
        $c7fc48236b5c00cc$var$editProfileModal.classList.add('hidden');
    }
};
const $c7fc48236b5c00cc$var$saveButton = document.getElementById('save');
const $c7fc48236b5c00cc$var$profileForm = document.getElementById('profile-form');
save.onclick = ()=>{
    $c7fc48236b5c00cc$var$profileForm.submit();
};
// Count input value length and update counter
function $c7fc48236b5c00cc$var$inputCounter(input, inputCount) {
    input.oninput = function() {
        inputCount.innerText = this.value.length;
    };
}
// Get all input fields
const $c7fc48236b5c00cc$var$inputElements = document.querySelectorAll('[id$="input"]');
const $c7fc48236b5c00cc$var$inputElementsArray = Array.from($c7fc48236b5c00cc$var$inputElements);
$c7fc48236b5c00cc$var$inputElementsArray.forEach((element)=>{
    let id = element.id;
    let inputCount = document.getElementById(id + '-count');
    inputCount.innerText = element.value.length;
    $c7fc48236b5c00cc$var$inputCounter(element, inputCount);
});

});

parcelRequire.register("7Ky6S", function(module, exports) {
const $5a4749d04ed42564$var$popup = document.getElementById('popup');
setTimeout(()=>{
    $5a4749d04ed42564$var$popup.classList.replace('sticky', 'hidden');
}, 5000);

});

const $9184024f63534557$var$body = document.getElementsByTagName('body')[0];
const $9184024f63534557$var$view = $9184024f63534557$var$body.dataset.view;
const $9184024f63534557$var$popup = document.getElementById('popup');

if ($9184024f63534557$var$popup != null) (parcelRequire("7Ky6S"));


if ($9184024f63534557$var$view === 'profile') {
    (parcelRequire("a5kBe"));
    (parcelRequire("haw7a"));
}
// Resize textarea on input dynamically
const $9184024f63534557$var$tx = document.getElementsByTagName("textarea");
for(let i = 0; i < $9184024f63534557$var$tx.length; i++){
    $9184024f63534557$var$tx[i].setAttribute("style", "height:" + $9184024f63534557$var$tx[i].scrollHeight + "px;overflow-y:hidden;");
    $9184024f63534557$var$tx[i].addEventListener("input", $9184024f63534557$var$OnInput, false);
}
function $9184024f63534557$var$OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
}


//# sourceMappingURL=main.js.map
