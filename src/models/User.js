import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

// Initialize the plugin using the existing Mongoose connection
const AutoIncrement = AutoIncrementFactory(mongoose);

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, // auto-increment field
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

// Apply the auto-increment plugin
userSchema.plugin(AutoIncrement, { inc_field: "id" });

const User = mongoose.model("User", userSchema);

export default User;
