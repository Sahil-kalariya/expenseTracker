const mongoose = require("mongoose");

const connectDB = async () => { 
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connected")
    }
    catch(error){
        console.log(`db not connected ${error}`);
    }
}

module.exports = connectDB;