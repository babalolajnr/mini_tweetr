const close = document.getElementById('close')

close.onclick = () => {
    editProfileModal.classList.remove('flex')
    editProfileModal.classList.add('hidden')
}