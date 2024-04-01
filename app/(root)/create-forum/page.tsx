import { PostForum } from "@/components/forms/PostForum";
import { getUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await getUser(user.id);

  if (!userInfo?.onboard) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Forum</h1>
      <PostForum userId={userInfo._id} />
    </>
  );
};

export default Page;
