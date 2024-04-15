"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../db/mongoose";
import User from "../models/user.model";
import Forum from "../models/forum.model";
import { FilterQuery, SortOrder } from "mongoose";

interface UserParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

interface FetchUsersParams {
  userId: string;
  serachString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

export const UpdateUser = async ({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UserParams) => {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboard: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    throw new Error(`Failed to create/update user: ${error}`);
  }
};

export const getUser = async (userId: string) => {
  try {
    connectToDB();
    const user = await User.findOne({ id: userId });
    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};

export async function fetchUsersPosts(id: string) {
  try {
    connectToDB();
    const posts = await User.findOne({ id: id }).populate({
      path: "forums",
      model: Forum,
      populate: {
        path: "children",
        model: Forum,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return posts;
  } catch (error: any) {
    throw new Error(`Failed to fetch user forums: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  serachString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: FetchUsersParams) {
  try {
    connectToDB();
    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(serachString, "i");
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (serachString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const userQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUserCount = await User.countDocuments(query);

    const users = await userQuery.exec();

    const isNext = totalUserCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}
