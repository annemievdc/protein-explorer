"use client";

import { useState } from "react";
import { createClient } from "@/lib/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type PostActionsProps = {
  postId: number;
  title: string;
  content: string;
};

export function PostActions({ postId, title, content }: PostActionsProps) {
  const [open, setOpen] = useState(false);

  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const handleDelete = async () => {
    const supabase = createClient();

    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = async () => {
    const supabase = createClient();

    const { error } = await supabase
      .from("posts")
      .update({
        title: editTitle,
        content: editContent,
      })
      .eq("id", postId);

    if (error) {
      console.error("Error updating post:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
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
            Edit post
          </DropdownMenuItem>

          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 size-4" />
            Delete post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>

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
