import './textarea'
import './like-tweet'

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

