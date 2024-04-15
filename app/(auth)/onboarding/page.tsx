import { Accountprofile } from "@/components/forms/Accountprofile";
import { getUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUser(user.id);
  if (userInfo?.onboard) redirect("/");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: user?.username || userInfo?.username,
    name: user?.firstName || userInfo?.name || "",
    bio: userInfo?.bio,
    image: user?.imageUrl || userInfo?.image,
  };
  return (
    <main className="flex flex-col justify-start max-w-3xl px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-light-2 text-base-regular">
        Complete your profile now to use Forums
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <Accountprofile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default Page;
