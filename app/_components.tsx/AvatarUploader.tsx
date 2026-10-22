"use client";

import { FC } from "react";
import { createClient } from "@/lib/client";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/dropzone";
import { useSupabaseUpload } from "@/hooks/use-supabase-upload";
import { useRouter } from "next/navigation";

type AvatarUploadProps = {
  userId: string;
};

export const AvatarUpload: FC<AvatarUploadProps> = ({ userId }) => {
  const router = useRouter();
  const supabase = createClient();
  const upload = useSupabaseUpload({
    bucketName: "avatars",
    path: userId,
    allowedMimeTypes: ["image/*"],
    maxFiles: 1,
    maxFileSize: 5 * 1024 * 1024,
    upsert: true,

    onUploadSuccess: async (fileName: string) => {
      const filePath = `${userId}/${fileName}`;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const { error } = await supabase
        .from("profiles")
        .update({
          avatar_url: data.publicUrl,
        })
        .eq("id", userId);

      if (error) {
        if (error) {
          console.error("Error saving avatar URL:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          });
        }
      } else {
        router.refresh();
      }
    },
  });

  return (
    <Dropzone {...upload}>
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};
