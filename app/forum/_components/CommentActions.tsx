"use client";

import { useState } from "react";
import { createClient } from "@/lib/client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

type CommentActionsProps = {
  commentId: number;
  content: string;
};

export function CommentActions({ commentId, content }: CommentActionsProps) {
  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleDelete = async () => {
    const supabase = createClient();

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);
    if (error) {
      console.error("Error deleting comment:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    }
  };

  const handleEdit = async () => {
    const supabase = createClient();

    const { error } = await supabase
      .from("comments")
      .update({
        content: editContent,
      })
      .eq("id", commentId);

    if (error) {
      console.error("Error updating comment:", error);
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Pencil className="mr-2 size-4" />
            Edit comment
          </DropdownMenuItem>

          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 size-4" />
            Delete comment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit comment</DialogTitle>
          </DialogHeader>

          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
