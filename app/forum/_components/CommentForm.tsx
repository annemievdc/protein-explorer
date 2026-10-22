"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/client";
import { FC, useState } from "react";

type CommentFormProps = {
  postId: string;
};

export const CommentForm: FC<CommentFormProps> = ({ postId }) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  /* const router = useRouter(); */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsLoading(true);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      user_id: user.id,
      content: content.trim(),
    });

    if (error) {
      console.log("Comment insert error:", error);
      setIsLoading(false);
      return;
    }

    setContent("");
    /*   router.refresh(); */
    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <Textarea
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-32"
          />
        </CardContent>

        <CardFooter className="justify-end">
          <Button type="submit" disabled={!content.trim() || isLoading}>
            {isLoading ? "Posting..." : "Post comment"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
