"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../db/mongoose";
import Forum from "../models/forum.model";
import User from "../models/user.model";

interface ForumParams {
  text: string;
  author: string;
  communityId: null;
  path: string;
}
export async function createForum({
  text,
  author,
  communityId,
  path,
}: ForumParams) {
  try {
    connectToDB();

    const createForum = await Forum.create({
      text,
      author,
      community: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { forums: createForum._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error while creating thread: ${error.message}`);
  }
}

export async function fetchForums(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const postsQuery = Forum.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostsCount = await Forum.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}
