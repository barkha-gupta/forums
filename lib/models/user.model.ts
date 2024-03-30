import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  forums: [
    {
      type: Schema.Types.ObjectId,
      ref: "Forum",
    },
  ],
  onboard: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

const User = models.User || model("User", userSchema);

export default User;
