(function connect() {
    // cors
    let socket = io.connect('http://localhost:3000', {
        withCredentials: true,
        // extraHeaders: {
        //     "my-custom-header": "abcd"
        // }
    })

    let username = document.querySelector('#username')
    let usernameBtn = document.querySelector('#usernameBtn')
    let curUsername = document.querySelector('.card-header')
    usernameBtn.addEventListener('click', e => {
        console.log(username.value)
        socket.emit('change_username', {
            username: username.value
        })
        curUsername.textContent = username.value
        username.value = ''
    })

    let message = document.querySelector('#message')
    let messageBtn = document.querySelector('#messageBtn')
    let messageList = document.querySelector('#message-list')
    messageBtn.addEventListener('click', e => {
        console.log(message.value)
        socket.emit('new_message', {
            message: message.value
        })
        message.value = ''
    })

    // add typing
    let info = document.querySelector('.info')
    message.addEventListener('keypress', e => {
        socket.emit('typing')
    })
    socket.on('typing', data => {
        info.textContent = data.username + " is typing..."
        setTimeout(() => {
            info.textContent = ''
        }, 5000)
    })

    socket.on('receive_message', data => {
        console.log('receive_message', data)
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ': ' + data.message
        listItem.classList.add('list-group-item')
        messageList.appendChild(listItem)
    })

    let messageDate = document.getElementById('date')
    socket.on('date_time', data => {
        console.log('date_time', data)
        messageDate.innerHTML = data.message
    })
})()