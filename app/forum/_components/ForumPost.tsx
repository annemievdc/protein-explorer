import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import Link from "next/link";
import { PostLikeButton } from "./PostLikeButton";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { PostActions } from "./PostActions";

type ForumPostProps = {
  id: number;
  username: string;
  avatarUrl?: string;
  proteinAccession: string;
  proteinCommonName: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  totalComments: number;
  lastComment?: {
    username: string;
    content: string;
  };
  showFooter: boolean;
  isOwner?: boolean;
};

export function ForumPost({
  id,
  username,
  avatarUrl,
  proteinCommonName,
  proteinAccession,
  title,
  content,
  createdAt,
  likes,
  totalComments,
  lastComment,
  showFooter = true,
  isOwner = false,
}: ForumPostProps) {
  const formattedDate = new Date(createdAt).toLocaleString("nl-BE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="w-full overflow-hidden border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">{username}</p>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>
          </div>

          {isOwner && (
            <PostActions
              postId={id}
              title={title}
              content={content}
            ></PostActions>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 py-6">
        <div>
          <Badge variant="secondary">
            {proteinCommonName} · {proteinAccession}
          </Badge>
        </div>

        <Link href={`/forum/${id}`} className="block">
          <h2 className="text-xl font-semibold tracking-tight hover:underline">
            {title}
          </h2>
        </Link>

        <p className="leading-relaxed text-muted-foreground">{content}</p>
      </CardContent>

      {showFooter && (
        <CardFooter className="flex flex-col items-start gap-4 border-t border-border/60 pt-4">
          {lastComment && (
            <div className="w-full rounded-lg border bg-muted/40 p-4">
              <p className="text-sm font-medium">{lastComment.username}</p>

              <p className="mt-1 text-sm text-muted-foreground">
                {lastComment.content}
              </p>
            </div>
          )}

          <div className="flex w-full items-center justify-between gap-4">
            <PostLikeButton postId={id} initialLikes={likes} />

            <Button variant="ghost" size="sm">
              <Link href={`/forum/${id}`}>
                View all {totalComments} comments
              </Link>
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
