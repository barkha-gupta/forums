import { fetchUsersPosts } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ForumCard from "../cards/ForumCard";
import { resourceLimits } from "worker_threads";

interface ForumsTabsProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
export const ForumsTabs = async ({
  currentUserId,
  accountId,
  accountType,
}: ForumsTabsProps) => {
  const post = await fetchUsersPosts(accountId);

  if (!post) redirect("/");
  return (
    <div className="mt-9 flex flex-col gap-10">
      {post.forums.map((forum: any) => (
        <ForumCard
          key={forum.id}
          id={forum.id}
          currentUserId={currentUserId}
          parentId={forum.parentId}
          content={forum.text}
          author={
            accountType === "User"
              ? { name: post.name, image: post.image, id: post.id }
              : {
                  name: forum.author.name,
                  image: forum.author.image,
                  id: forum.author.id,
                }
          }
          community={forum.community}
          createdAt={forum.createdAt}
          comments={forum.comments}
        />
      ))}
    </div>
  );
};
