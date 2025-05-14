import mongoose from "mongoose";
// Schema
const userSchema = mongoose.Schema ( {
    // name: String, 
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now()}
})


// Model
const User = mongoose.model("User", userSchema)

export default User
