import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const  connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected to MongoDB")
        });
        
        connection.on('error', (err)=> {
            console.log(`MongoDB connection error, please make sure db is up and running` + err);
            process.exit(1)
        });

    } catch (error) {
        console.log('Error connecting to database');
        console.log(error)
    }
}