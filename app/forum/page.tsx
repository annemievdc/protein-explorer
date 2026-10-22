import { ForumPost } from "./_components/ForumPost";
import { ForumRealtime } from "./_components/ForumRealtime";
import { NewPostForm } from "./_components/NewPostForm";
import { Pagelayout } from "@/app/_components.tsx/PageLayout";
import { createClient } from "@/lib/server";

export default async function ForumPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const postSelect = `
  id,
  user_id,
  protein_accession,
  protein_common_name,
  title,
  content,
  created_at,
  profiles (
    username,
    avatar_url
  ),
  post_likes (
    id
  ),
  comments (
    id
  )
`;
  const { data: posts, error } = await supabase
    .from("posts")
    .select(postSelect)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error loading posts:", error);
  }
  console.log("posts:", JSON.stringify(posts, null, 2));
  return (
    <Pagelayout pageTitle="Forum" sectionTitle="Community discussions">
      <ForumRealtime />
      <section className="w-full space-y-6">
        {user && <NewPostForm userId={user.id} />}

        {posts?.map((post) => {
          const profile = post.profiles as unknown as {
            username: string;
            avatar_url: string | null;
          } | null;

          return (
            <ForumPost
              key={post.id}
              id={post.id}
              username={profile?.username ?? "Unknown"}
              avatarUrl={profile?.avatar_url ?? undefined}
              proteinCommonName={post.protein_common_name}
              proteinAccession={post.protein_accession}
              title={post.title}
              content={post.content}
              createdAt={post.created_at}
              likes={post.post_likes.length}
              totalComments={post.comments.length}
              showFooter={true}
              isOwner={user?.id === post.user_id}
            />
          );
        })}
      </section>
    </Pagelayout>
  );
}
