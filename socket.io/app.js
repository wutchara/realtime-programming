const express = require('express')
const socketio = require('socket.io')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

// WEB UI
app.get('/', (req, res) => {
    res.render('index')
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server is running, On port: ", server.address().port)
})

//initialize socket for the server
const io = socketio(server, {
    'transports': ['websocket', 'polling'],
    allowEIO3: true,
    cors: {// cors
        origin: "*",
        methods: ["GET"],
        allowedHeaders: ["*"],
        credentials: true
    }
})

io.on('connect', socket => {
    console.log("New user connected")
    socket.on('disconnect', () => {
        console.log("user disconnected")
    })

    socket.username = "Anonymous"

    socket.on('change_username', data => {
        console.log('change_username', data)
        socket.username = data.username
    })

    //handle the new message event
    socket.on('new_message', data => {
        console.log("new message", data)
        io.sockets.emit('receive_message', {
            message: data.message,
            username: socket.username
        })
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', {
            username: socket.username
        })
    })

    setInterval(() => {
        socket.broadcast.emit('date_time', {
            message: new Date(),
            username: socket.username,
        })
    }, 10 * 1000); // 10s
})