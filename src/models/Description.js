import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    isChecked: {                // ✅ New checkbox field
      type: Boolean,
      default: false,           // default value (unchecked)
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

// Create model
const Description = mongoose.model("Description", descriptionSchema);

export default Description;
