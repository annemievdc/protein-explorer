"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/client";
import { Heart } from "lucide-react";
import { FC, useEffect, useState } from "react";

type PostLikeButtonProps = {
  postId: number;
  initialLikes: number;
};

export const PostLikeButton: FC<PostLikeButtonProps> = ({
  postId,
  initialLikes,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    const checkLike = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserId(user.id);

      const { data } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .maybeSingle();

      setLiked(!!data);
    };

    checkLike();
  }, [postId]);

  const handleLike = async () => {
    if (!userId) return;

    const supabase = createClient();

    if (liked) {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);

      if (!error) {
        setLiked(false);
        setLikes((current) => current - 1);
      }

      return;
    }

    const { error } = await supabase.from("post_likes").insert({
      post_id: postId,
      user_id: userId,
    });

    if (!error) {
      setLiked(true);
      setLikes((current) => current + 1);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={!userId}
      className="gap-2"
    >
      <Heart className={`size-4 ${liked ? "fill-current" : ""}`} />
      {likes}
    </Button>
  );
};
