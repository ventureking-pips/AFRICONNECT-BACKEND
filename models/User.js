import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },       // random uuid
  name: { type: String, default: "" },              // “Chrome on Windows”, etc.
  refreshTokenHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastUsedAt: { type: Date, default: Date.now },
  revokedAt: { type: Date, default: null },
});


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["client", "pro", "admin"],
      default: "client",
    },
    // for global invalidation if needed
    refreshTokenHash: { type: String, default: null },
    refreshTokenHash: { type: String, default: null },
    devices: [deviceSchema],
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
