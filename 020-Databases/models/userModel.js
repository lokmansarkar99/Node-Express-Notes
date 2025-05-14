import mongoose from "mongoose";

// Schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// ✅ Add middleware on schema, not model
userSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Model
const User = mongoose.model("User", userSchema);

export default User;
