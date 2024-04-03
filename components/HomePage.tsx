import { fetchForums } from "@/lib/actions/forum.action";

export const HomePage = async () => {
  const { posts } = await fetchForums(1, 30);

  return (
    <>
      <h1 className="head-text text-left"> Home</h1>;
      <div>
        {posts.map((post) => (
          <p key={post._id} className="text-light-1">
            {post.text}
          </p>
        ))}
      </div>
    </>
  );
};
