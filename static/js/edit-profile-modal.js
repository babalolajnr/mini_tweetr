const close = document.getElementById('close')
const modalContent = document.getElementById('modal-content')

close.onclick = () => {
    editProfileModal.classList.remove('flex')
    editProfileModal.classList.add('hidden')
}

const modalContentChildren = modalContent.querySelectorAll('*')
const modalContentChildrenArray = Array.from(modalContentChildren)

// Close modal if anywhere is clicked outside the modal content
document.getElementById('edit-profile-modal').onclick = e => {
    if (e.target != modalContent && !modalContentChildrenArray.includes(e.target)) {
        editProfileModal.classList.remove('flex')
        editProfileModal.classList.add('hidden')
    }
}

const saveButton = document.getElementById('save')
const profileForm = document.getElementById('profile-form')
save.onclick = () => {
    profileForm.submit()
}

const firstNameInput = document.getElementById("first-name-input")
const firstNameInputCount = document.getElementById("first-name-input-count")
const firstNameInputMax = document.getElementById("first-name-input-max")

let firstNameInputLength = firstNameInput.value.length
const firstNameInputMaxLength = 25

firstNameInput.setAttribute('maxlength', firstNameInputMaxLength)

firstNameInputCount.innerText = firstNameInputLength
firstNameInputMax.innerText = firstNameInputMaxLength

firstNameInput.oninput = function () {
    firstNameInputLength = this.value.length
    firstNameInputCount.innerText = firstNameInputLength
}
