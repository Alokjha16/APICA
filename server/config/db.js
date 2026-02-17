import mongoose from "mongoose"; //db.js
export const connectDB = async () =>{
    try {
        mongoose.connection.on('connected', ()=> console.log('Database Connected'));
       await mongoose.connect(`${process.env.MONGODB_URI}/ApicaDB`) 
    } catch (error) {
        console.log(error);
    }
}
