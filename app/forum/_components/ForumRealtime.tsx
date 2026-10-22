"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import { RealtimeChannel } from "@supabase/supabase-js";

type ForumRealtimeProps = {
  postId?: number;
};

export function ForumRealtime({ postId }: ForumRealtimeProps) {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const postsChannel = supabase
      .channel("forum-posts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          console.log("Change : ", payload);
          router.refresh();
        },
      )
      .subscribe();

    let commentsChannel: RealtimeChannel;

    if (postId) {
      commentsChannel = supabase
        .channel(`forum-comments-${postId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "comments",
          },
          (payload) => {
            console.log("Comment changed : ", payload);
            router.refresh();
          },
        )
        .subscribe((status) => {
          console.log("comments realtime status = ", status);
        });
    }

    return () => {
      supabase.removeChannel(postsChannel);

      if (commentsChannel) {
        supabase.removeChannel(commentsChannel);
      }
    };
  }, [router, postId]);

  return null;
}
