const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require ('dotenv')
const authRoutes = require ('./routes/authRoutes')

dotenv.config()

app.use(cors())
app.use(express.json())


app.use('/api/auth', authRoutes)

 module.exports = app