import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    profession: { type: String, required: true },
    bio: { type: String },
    location: { type: String },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  },
  { timestamps: true }
);

export default mongoose.model("Professional", professionalSchema);
