const close = document.getElementById('close')
const modalContent = document.getElementById('modal-content')
const editProfileModal = document.getElementById('edit-profile-modal')

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

// Count input value length and update counter
function inputCounter(input, inputCount) {
    input.oninput = function () {
        inputCount.innerText = this.value.length
    }
}

// Get all input fields
const inputElements = document.querySelectorAll('[id$="input"]')
const inputElementsArray = Array.from(inputElements)

inputElementsArray.forEach(element => {
    let id = element.id
    let inputCount = document.getElementById(id + '-count')
    inputCount.innerText = element.value.length

    inputCounter(element, inputCount)
});