import ForumCard from "@/components/cards/ForumCard";
import { Comment } from "@/components/forms/Comment";
import { fetchForumById } from "@/lib/actions/forum.action";
import { getUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUser(user.id);
  if (!userInfo?.onboard) redirect("/onboarding");

  const forum = await fetchForumById(params.id);

  return (
    <section className="relative">
      <div>
        <ForumCard
          key={forum.id}
          id={forum.id}
          currentUserId={user?.id || ""}
          parentId={forum.parentId}
          content={forum.text}
          author={forum.author}
          community={forum.community}
          createdAt={forum.createdAt}
          comments={forum.comments}
        />
      </div>

      <div className="mt-7">
        <Comment />
      </div>
    </section>
  );
};

export default Page;
