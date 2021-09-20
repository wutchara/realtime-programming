(function connect() {
    // cors
    let socket = io.connect('http://localhost:8080', {
        withCredentials: true,
        // extraHeaders: {
        //     "my-custom-header": "abcd"
        // }
    })

    let ric = document.querySelector('#ric')
    let ricBtn = document.querySelector('#ricBtn')
    let type = document.querySelector('#type')
    let typeBtn = document.querySelector('#typeBtn')
    let hRic = document.querySelector('#hRic')
    let hType = document.querySelector('#hType')
    let queryBtn = document.querySelector('#queryBtn')
    let messageList = document.querySelector('#message-list')

    ricBtn.addEventListener('click', e => {
        console.log('change_ric', ric.value, (new Date()).toString())
        socket.emit('change_ric', {
            ric: ric.value
        })
        ric.value = ''
    })

    typeBtn.addEventListener('click', e => {
        console.log('change_type', type.value, )
        socket.emit('change_type', {
            type: type.value
        })
        type.value = ''
    })

    const addDataMessage = function(messageList, textContent) {
        let listItem = document.createElement('li')
        listItem.textContent = textContent
        listItem.classList.add('list-group-item')
        messageList.appendChild(listItem)
    }

    queryBtn.addEventListener('click', e => {
        addDataMessage(messageList, (new Date()).toString())

        socket.emit('query_ric', {

        })
    })

    socket.on('change_ric', data => {
        console.log('socket::change_ric', data)
        hRic.textContent = data.ric
    })

    socket.on('change_type', data => {
        console.log('socket::change_type', data)
        hType.textContent = data.type
    })

    socket.on('query_ric', data => {
        console.log('socket::query_ric', data)
        if (data.data) {
            addDataMessage(messageList, JSON.stringify(data.data, null, 4))
        } else {
            addDataMessage(messageList, 'ERROR: '+ JSON.stringify(data.error))
        }
    })
})()