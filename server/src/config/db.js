const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'http://localhost:27017/' )
        console.log('ay temchi')
    }catch(err){ 

        console.error('database error', err)
    }

}

module.exports = connectDB