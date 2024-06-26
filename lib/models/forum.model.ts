import { Schema, model, models } from "mongoose";

const forumSchema = new Schema({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  community: {
    type: Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: {
    type: Schema.Types.ObjectId,
    ref: "Forum",
  },
});

const Forum = models.Forum || model("Forum", forumSchema);

export default Forum;
