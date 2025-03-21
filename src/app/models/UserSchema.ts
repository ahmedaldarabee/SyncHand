import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, unique: true, required: true },
    emailAddress: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/  // تحقق من صحة البريد الإلكتروني
    },
  },
  { timestamps: true }
);

userSchema.methods.getUserInfo = function () {
  return `User: ${this.clerkUserId}, Email: ${this.emailAddress}`;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
