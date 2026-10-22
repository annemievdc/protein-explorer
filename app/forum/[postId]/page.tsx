import { Comment } from "@/app/forum/_components/Comment";
import { CommentForm } from "@/app/forum/_components/CommentForm";
import { ForumPost } from "@/app/forum/_components/ForumPost";
import { Pagelayout } from "@/app/_components.tsx/PageLayout";
import { createClient } from "@/lib/server";
import { ForumRealtime } from "../_components/ForumRealtime";

type CommentsPageProps = {
  params: Promise<{ postId: string }>;
};

export default async function CommentsPage({ params }: CommentsPageProps) {
  const { postId } = await params;

  const postIdNumber = Number(postId);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select(
      `
      id,
      user_id,
      title,
      content,
      created_at,
      protein_common_name,
      protein_accession,
      profiles (
        username,
        avatar_url
      ),
      post_likes (
        id
      )
    `,
    )
    .eq("id", postIdNumber)
    .single();

  const { data: comments, error: commentsError } = await supabase
    .from("comments")
    .select(
      `
      id,
      user_id,
      content,
      created_at,
      profiles (
        username,
        avatar_url
      )
    `,
    )
    .eq("post_id", postIdNumber)
    .order("created_at", { ascending: false });

  if (postError || !post) {
    return (
      <Pagelayout pageTitle="Forum" sectionTitle="Post">
        <p>Post not found.</p>
      </Pagelayout>
    );
  }

  if (commentsError) {
    console.log("comments error:", commentsError);
  }

  return (
    <Pagelayout pageTitle="Discussion">
      <ForumRealtime postId={postIdNumber} />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <ForumPost
          id={post.id}
          username={post.profiles?.[0]?.username ?? "Unknown user"}
          avatarUrl={post.profiles?.[0]?.avatar_url}
          title={post.title}
          content={post.content}
          createdAt={post.created_at}
          likes={post.post_likes.length}
          totalComments={comments?.length ?? 0}
          showFooter={false}
          proteinCommonName={post.protein_common_name}
          proteinAccession={post.protein_accession}
        />

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border p-3">
            <h2 className="text-lg font-semibold">Comments</h2>

            <p className="text-sm text-muted-foreground">
              {comments?.length ?? 0} comments
            </p>
          </div>

          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.profiles?.[0]?.username ?? "Unknown user"}
                avatarUrl={comment.profiles?.[0]?.avatar_url}
                content={comment.content}
                createdAt={comment.created_at}
                isOwner={user?.id === comment.user_id}
                commentId={comment.id}
              />
            ))
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No comments yet. Be the first to comment.
            </p>
          )}
        </section>
        <CommentForm postId={postId} />
      </div>
    </Pagelayout>
  );
}
