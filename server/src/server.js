const app = require('./app')
const connectDB = require('./config/db')
const setupSocket = require('./config/socket')
const PORT = process.env.PORT || 5000

app.listen(PORT , () => {
    console.log('server running')
})

connectDB()
setupSocket(server)