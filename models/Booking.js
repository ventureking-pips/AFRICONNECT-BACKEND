import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
