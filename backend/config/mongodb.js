import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', ()=> {
        console.log("DB Connected");
    })

    await mongoose.connect(`${process.env.DB_STRING}marketplace`)

    
}

export default connectDB;

