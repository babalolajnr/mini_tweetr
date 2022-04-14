class Popup {
    static run(popup: HTMLElement) {
        setTimeout(() => {
            popup.classList.replace('sticky', 'hidden')
        }, 5000)
    }
}

export default Popup