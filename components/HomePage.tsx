import { fetchForums } from "@/lib/actions/forum.action";
import ForumCard from "./cards/ForumCard";
import { currentUser } from "@clerk/nextjs";

export const HomePage = async () => {
  const { posts } = await fetchForums(1, 30);
  const user = await currentUser();

  return (
    <>
      <h1 className="head-text text-left"> Home</h1>;
      {/* <div>
        {posts.map((post) => (
          <p key={post._id} className="text-light-1">
            {post.text}
          </p>
        ))}
      </div> */}
      <section className="mt-9 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="no-result">No bullets found!</p>
        ) : (
          <>
            {posts.map((post) => (
              <ForumCard
                key={post.id}
                id={post.id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.comments}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};
