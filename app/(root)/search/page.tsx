import { UserCard } from "@/components/cards/UserCard";
import { fetchUsers, getUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getUser(user.id);
  if (!userInfo) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    serachString: "",
    pageNumber: 1,
    pageSize: 20,
    sortBy: "desc",
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <div className="mt-14 flex flex-col gap-9 text-white">
        {result.users.length === 0 ? (
          <p className="no-result">No users!</p>
        ) : (
          result.users.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              imageUrl={user.image}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Page;
