import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    professional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professional",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    currency: { type: String, default: "USD" },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
