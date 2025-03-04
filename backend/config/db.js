import mongoose from "mongoose";
const connectdb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB Connected")
        
    } catch (error) {
        console.log(`Error in the connected DB ${error}`)
        process.exit(1);
        
    }
}

export default connectdb