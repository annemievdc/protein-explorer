import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type UserCardProps = {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string;
  currentUserId: string;
};

export const UserCard: FC<UserCardProps> = ({
  id,
  username,
  firstName,
  lastName,
  role,
  currentUserId,
}) => {
  return (
    <article className="rounded-lg border p-4">
      <p className="font-medium">{username ?? "No username"}</p>

      <p className="text-sm">
        {firstName} {lastName}
      </p>

      <p className="text-sm">Role: {role}</p>

      <div className="mt-4 flex gap-3">
        <Button variant="outline">
          <Link href={`/users/${id}/favorites`}>User favorites</Link>
        </Button>

        {id !== currentUserId && (
          <Button variant="destructive">Delete user</Button>
        )}
      </div>
    </article>
  );
};
