"use client";

import { createClient } from "@/lib/client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

type DeleteFavoriteButtonProps = {
  favoriteId: number;
};

export const DeleteFavoriteButton: FC<DeleteFavoriteButtonProps> = ({
  favoriteId,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const supabase = createClient();

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", favoriteId);

    if (error) {
      console.log("delete favorite error:", error);
      setIsDeleting(false);
      return;
    }

    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-md p-2 hover:bg-destructive/10 disabled:opacity-50"
    >
      <Trash2 className="size-5" />
    </button>
  );
};
