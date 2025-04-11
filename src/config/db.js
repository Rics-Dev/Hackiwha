const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'http://localhost:27017/' )
    }catch(err){ 
        console.log(err)
    }
}