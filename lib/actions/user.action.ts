"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../db/mongoose";
import User from "../models/user.model";

interface UserParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
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
