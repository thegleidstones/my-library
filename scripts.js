const Modal = {
    open(modal) {
        console.log(modal)
        document.getElementById(modal).classList.add('active')
    },

    close(modal) {
        document.getElementById(modal).classList.remove('active')
    }
}