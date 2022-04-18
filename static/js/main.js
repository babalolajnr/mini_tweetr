class $22927594a1eadbc7$var$EditProfileModal {
    static run() {
        const close = document.getElementById('close');
        const modalContent = document.getElementById('modal-content');
        const editProfileModal = document.getElementById('edit-profile-modal');
        close.onclick = ()=>{
            editProfileModal.classList.remove('flex');
            editProfileModal.classList.add('hidden');
        };
        const modalContentChildren = modalContent.querySelectorAll('*');
        const modalContentChildrenArray = Array.from(modalContentChildren);
        // Close modal if anywhere is clicked outside the modal content
        editProfileModal.onclick = (e)=>{
            if (e.target != modalContent && !modalContentChildrenArray.includes(e.target)) {
                editProfileModal.classList.remove('flex');
                editProfileModal.classList.add('hidden');
            }
        };
        const saveButton = document.getElementById('save');
        const profileForm = document.getElementById('profile-form');
        saveButton.onclick = ()=>{
            profileForm.submit();
        };
        // Count input value length and update counter
        function inputCounter(input, inputCount) {
            input.oninput = function() {
                inputCount.innerText = this.value.length;
            };
        }
        // Get all input fields
        const inputElements = document.querySelectorAll('[id$="input"]');
        const inputElementsArray = Array.from(inputElements);
        inputElementsArray.forEach((element)=>{
            let id = element.id;
            let inputCount = document.getElementById(id + '-count');
            inputCount.innerText = `${element.value.length}`;
            inputCounter(element, inputCount);
        });
    }
}
var $22927594a1eadbc7$export$2e2bcd8739ae039 = $22927594a1eadbc7$var$EditProfileModal;


class $f7d50bab9555af31$var$Like {
    constructor(likeButtons, xcsrfToken){
        this.likeButtons = likeButtons;
        this.likeButtons.forEach((element)=>{
            element.onclick = ()=>{
                if (element.dataset.action == 'unlike') {
                    let tweetId = element.dataset.id;
                    this.changeLikeButtonAction(tweetId);
                    this.unlikeTweet(tweetId);
                } else {
                    let tweetId = element.dataset.id;
                    this.changeUnlikeButtonAction(tweetId);
                    this.likeTweet(tweetId);
                }
            };
        });
        this.xcsrfToken = xcsrfToken;
    }
    /**
     * fetch API initialization
     * @returns {Object}
     */ fetchInit() {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFToken': this.xcsrfToken
            }
        };
    }
    /**
     * @param  {string} id
     * Send like tweet request to server
     */ likeTweet(id) {
        fetch(`http://127.0.0.1:8000/tweet/like_tweet/${id}/`, this.fetchInit()).then((response)=>{
            if (response.status != 200) // Reset like button and count when the request fails
            this.changeLikeButtonAction(id);
        });
    }
    /**
     * @param  {string} id
     * Send unlike tweet request to server
     */ unlikeTweet(id) {
        fetch(`http://127.0.0.1:8000/tweet/unlike_tweet/${id}/`, this.fetchInit()).then((response)=>{
            if (response.status != 200) // Reset unlike button and count when the request fails
            this.changeUnlikeButtonAction(id);
        });
    }
    /**
     *  Change unlike button action
     */ changeUnlikeButtonAction(dataId) {
        const unlikeButtons = document.querySelectorAll(`[data-button="like"][data-id="${dataId}"]`);
        unlikeButtons.forEach((element)=>{
            const likeIcon = element.querySelector('i');
            likeIcon.classList.replace('fa-regular', 'fa-solid');
            likeIcon.classList.add('text-red-500');
            const likesCount = element.querySelectorAll('span')[0];
            likesCount.classList.add('text-red-500');
            const likesCountNumber = parseInt(likesCount.innerText);
            likesCount.innerText = `${likesCountNumber + 1}`;
            element.dataset.action = 'unlike';
        });
    }
    /**
     * @param  {string} dataId
     *  Change like button action
     */ changeLikeButtonAction(dataId) {
        const likeButtons = document.querySelectorAll(`[data-button="like"][data-id="${dataId}"]`);
        likeButtons.forEach((element)=>{
            const likeIcon = element.querySelector('i');
            likeIcon.classList.replace('fa-solid', 'fa-regular');
            likeIcon.classList.remove('text-red-500');
            const likesCount = element.querySelectorAll('span')[0];
            likesCount.classList.remove('text-red-500');
            const likesCountNumber = parseInt(likesCount.innerText);
            likesCount.innerText = `${likesCountNumber - 1}`;
            element.dataset.action = 'like';
        });
    }
}
var $f7d50bab9555af31$export$2e2bcd8739ae039 = $f7d50bab9555af31$var$Like;


class $1b687d53ec8042ef$var$Profile {
    static run() {
        const tweetsTab = document.getElementById('tweets-tab');
        const tweetsAndRepliesTab = document.getElementById('tweets-and-replies-tab');
        const likesTab = document.getElementById('likes-tab');
        const mediaTab = document.getElementById('media-tab');
        const editProfile = document.getElementById('edit-profile');
        const editProfileModal = document.getElementById('edit-profile-modal');
        const tweetsTabView = document.getElementById('tweets-tab-view');
        const tweetsAndRepliesTabView = document.getElementById('tweets-and-replies-tab-view');
        const likesTabView = document.getElementById('likes-tab-view');
        const mediaTabView = document.getElementById('media-tab-view');
        const relations = {
            'tweets-tab': [
                tweetsTab,
                tweetsTabView
            ],
            'tweets-and-replies-tab': [
                tweetsAndRepliesTab,
                tweetsAndRepliesTabView
            ],
            'likes-tab': [
                likesTab,
                likesTabView
            ],
            'media-tab': [
                mediaTab,
                mediaTabView
            ]
        };
        const tabs = [
            tweetsTab,
            likesTab,
            mediaTab,
            tweetsAndRepliesTab
        ];
        const parser = new DOMParser();
        const activeTabIndicatorString = "<div class='w-16 h-1 bg-yellow-400 rounded-full'></div>";
        // Parse the active tab indicator string and extract the firstChild
        // which his the node we need to append to the parent div
        const activeTabIndicator = parser.parseFromString(activeTabIndicatorString, 'text/html').body.firstChild;
        // On page load set tweetsTab as active
        tweetsTab.appendChild(activeTabIndicator);
        tweetsTabView.classList.remove('hidden');
        tabs.forEach((element)=>{
            element.onclick = ()=>{
                element.appendChild(activeTabIndicator);
                // Iterate through relation keys and find one that matches
                // the element clicked on's id
                Object.keys(relations).forEach((i)=>{
                    if (i == element.id) {
                        const tabView = relations[i][1];
                        tabView.classList.remove('hidden');
                    } else {
                        const tabView = relations[i][1];
                        tabView.classList.add('hidden');
                    }
                });
            };
        });
        // Display edit modal
        editProfile.onclick = ()=>{
            editProfileModal.classList.remove('hidden');
            editProfileModal.classList.add('flex');
        };
    }
}
var $1b687d53ec8042ef$export$2e2bcd8739ae039 = $1b687d53ec8042ef$var$Profile;


class $eff0bedde61234ed$var$Retweet {
    constructor(retweetButtons, xcsrfToken){
        this.retweetButtons = retweetButtons;
        this.retweetButtons.forEach((element)=>{
            element.onclick = ()=>{
                if (element.dataset.action == 'unretweet') {
                    let tweetId = element.dataset.id;
                    this.changeRetweetButtonAction(tweetId);
                    this.unretweet(tweetId);
                } else {
                    let tweetId = element.dataset.id;
                    this.changeUnretweetButtonAction(tweetId);
                    this.retweet(tweetId);
                }
            };
        });
        this.xcsrfToken = xcsrfToken;
    }
    /**
     * fetch API initialization
     * @returns {Object}
     */ fetchInit() {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFToken': this.xcsrfToken
            }
        };
    }
    /**
     * @param  {string} id
     * Send retweet tweet request to server
     */ retweet(id) {
        fetch(`http://127.0.0.1:8000/tweet/retweet/${id}/`, this.fetchInit()).then((response)=>{
            if (response.status != 200) // Reset retweet button and count when the request fails
            this.changeRetweetButtonAction(id);
        });
    }
    /**
     * @param  {string} id
     * Send unretweet request to server
     */ unretweet(id) {
        fetch(`http://127.0.0.1:8000/tweet/unretweet/${id}/`, this.fetchInit()).then((response)=>{
            if (response.status != 200) // Reset unretweet button and count when the request fails
            this.changeUnretweetButtonAction(id);
        });
    }
    /**
     *  Change unretweet button action
     */ changeUnretweetButtonAction(dataId) {
        const unlikeButtons = document.querySelectorAll(`[data-button="retweet"][data-id="${dataId}"]`);
        unlikeButtons.forEach((element)=>{
            const retweetIcon = element.querySelector('i');
            retweetIcon.classList.add('text-green-500');
            const retweetsCount = element.querySelectorAll('span')[0];
            retweetsCount.classList.add('text-green-500');
            const retweetsCountNumber = parseInt(retweetsCount.innerText);
            retweetsCount.innerText = `${retweetsCountNumber + 1}`;
            element.dataset.action = 'unretweet';
        });
    }
    /**
     * @param  {string} dataId
     *  Change retweet button action
     */ changeRetweetButtonAction(dataId) {
        const retweetButtons = document.querySelectorAll(`[data-button="retweet"][data-id="${dataId}"]`);
        retweetButtons.forEach((element)=>{
            const retweetIcon = element.querySelector('i');
            retweetIcon.classList.remove('text-green-500');
            const retweetsCount = element.querySelectorAll('span')[0];
            retweetsCount.classList.remove('text-green-500');
            const retweetsCountNumber = parseInt(retweetsCount.innerText);
            retweetsCount.innerText = `${retweetsCountNumber - 1}`;
            element.dataset.action = 'reweet';
        });
    }
}
var $eff0bedde61234ed$export$2e2bcd8739ae039 = $eff0bedde61234ed$var$Retweet;


class $d07afc15d861e52d$var$App {
    view = document.getElementsByTagName('body')[0].dataset.view;
    constructor(xcsrfToken){
        this.xcsrfToken = xcsrfToken;
    }
    run() {
        this.textarea();
        const likeButtons = Array.from(document.querySelectorAll('[data-button="like"]'));
        new $f7d50bab9555af31$export$2e2bcd8739ae039(likeButtons, this.xcsrfToken);
        const retweetButtons = Array.from(document.querySelectorAll('[data-button="retweet"]'));
        new $eff0bedde61234ed$export$2e2bcd8739ae039(retweetButtons, this.xcsrfToken);
        this.loadClasses();
        console.log('App running...');
    }
    /**
     * Resize textarea on input dynamically
     */ textarea() {
        const tx = document.getElementsByTagName("textarea");
        for(let i = 0; i < tx.length; i++){
            tx[i].setAttribute("style", "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;");
            tx[i].addEventListener("input", OnInput, false);
        }
        function OnInput() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        }
    }
    /**
     * Load classes based on view
     */ loadClasses() {
        if (this.view === 'profile') {
            $1b687d53ec8042ef$export$2e2bcd8739ae039.run();
            $22927594a1eadbc7$export$2e2bcd8739ae039.run();
        }
    }
}
const $d07afc15d861e52d$var$csrfmiddlewaretokenInputs = document.getElementsByName('csrfmiddlewaretoken');
const $d07afc15d861e52d$var$xcsrfToken = $d07afc15d861e52d$var$csrfmiddlewaretokenInputs[0].value;
new $d07afc15d861e52d$var$App($d07afc15d861e52d$var$xcsrfToken).run();


//# sourceMappingURL=main.js.map
