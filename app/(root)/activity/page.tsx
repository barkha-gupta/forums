import { getUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUser(user.id);
  if (!userInfo) redirect("/onboarding");

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <p className="text-samll-medium text-gray-1">
        All activities will be shown here!
      </p>
    </section>
  );
};

export default Page;
