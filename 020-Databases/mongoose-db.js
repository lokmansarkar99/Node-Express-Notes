import mongoose from "mongoose";
// step - 1
const connectDB = async () => {
    try {
await mongoose.connect("mongodb://localhost:27017/mongoose_db")
mongoose.set("debug", true)

} catch (error) {
    console.log(error)
    process.exit()
}
}

export default connectDB;