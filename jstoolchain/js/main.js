const body = document.getElementsByTagName('body')[0]
const view = body.dataset.view
const popup = document.getElementById('popup')

if (popup != null) {
    require('./popup')
}

if (view === 'profile') {
    require('./profile')
    require('./edit-profile-modal')
}

// Resize textarea on input dynamically
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
    );
    tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
}

