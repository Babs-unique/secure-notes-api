const mongoose = require('mongoose');

const noteDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database successfully")
    } catch (error) {
        console.error("Problem connecting with Database", error)
        process.exit(1)
    }
}


module.exports = noteDb;