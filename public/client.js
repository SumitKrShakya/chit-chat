const socket = io()
let namep;
const textarea = document.querySelector('#textarea')
const messageArea = document.querySelector('.message__area')

do {
    namep = prompt("Enter your name : ")
} while (!namep)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        let temp = e.target.value.trim()
        if (!temp) {
            console.log("hello")
            return;
        }
        // console.log(temp)
        // if (e.target.value == '') {
        //     console.log('blank')
        // }
        // if (e.target.value == ' ') {
        //     console.log('space')
        // }

        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
            user: namep,
            message: message.trim()
        }
        // app.js
    appendmsg(msg, 'outgoing')

    // broadcaste to server
    socket.emit('message', msg)


}

function appendmsg(msg, type) {
    const mainDiv = document.createElement('div')

    let classname = type
    mainDiv.classList.add(classname, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    textarea.value = ""
    scrollToBottom()
}

// recieve messages
socket.on('message', (msg) => {
    appendmsg(msg, 'incoming')
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}