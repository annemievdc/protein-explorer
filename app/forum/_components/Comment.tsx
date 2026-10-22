import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentActions } from "./CommentActions";

type CommentProps = {
  username: string;
  avatarUrl?: string;
  content: string;
  createdAt: string;
  commentId: number;
  isOwner: boolean;
};

export function Comment({
  username,
  avatarUrl,
  content,
  commentId,
  isOwner,
  createdAt,
}: CommentProps) {
  const formattedDate = new Date(createdAt).toLocaleString("nl-BE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <article className="flex w-full gap-4 rounded-xl border border-border bg-card p-4">
      <Avatar>
        <AvatarImage src={avatarUrl} alt={username} />
        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{username}</p>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>

            <p className="mt-2 text-sm leading-relaxed">{content}</p>
          </div>

          {isOwner && (
            <CommentActions commentId={commentId} content={content} />
          )}
        </div>
      </div>
    </article>
  );
}
