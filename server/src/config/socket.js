const soketio = require('socket.io')

const {protectSocket} = require ('/..middleware/socketMiddleware')

const ChatMessage = require('../models/ChatMessage')

module.exports = (server ) => {
    const io = socketio(server, {
        cors: {
            origin: process.env.frontrndurl, //racim 7at l url hna
            methods: ['GET', 'POST']
        }
    })


    io.use(protectSocket)

    io.on('connection', (socket) => {
        socket.on('join room', (room) => {
            socket.join(room)
        })

socket.on('send message', async ({ room, text} ) => {

    const message = await   ChatMessage.create({
        sender: socket.user.id,
        text,
        room
    })
    io.to(room).emit('new message', message)
})

socket.on('disconnect', () => {
    console.log('User disconnected')
})



    }
    )
    return io
}