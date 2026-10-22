import { LogoutButton } from "@/components/logout-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/server";

import Link from "next/link";

export async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let firstName = "";
  let isAdmin = false;
  let avatar = "";

  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, first_name, avatar_url")
      .eq("id", user.id)
      .single();

    console.log("user id:", user.id);
    console.log("profile:", profile);
    console.log("profile error:", profileError);

    firstName = profile?.first_name ?? "not found";

    isAdmin = profile?.role === "admin";
    avatar = profile?.avatar_url;
  }

  return (
    <header className="w-full bg-background mb-10">
      <div className="flex flex-col px-8 py-6">
        <div className="flex justify-center">
          <Link href="/" className="text-3xl font-semibold tracking-wide">
            Protein Explorer
          </Link>
          {user && (
            <section className="mt-4 flex w-full items-center justify-end gap-4 px-8">
              <div>
                <Avatar className="size-10">
                  <AvatarImage src={avatar}></AvatarImage>
                </Avatar>
              </div>
              <p className="text-sm text-muted-foreground">
                Welcome {firstName}
              </p>

              <LogoutButton />
            </section>
          )}
        </div>
      </div>

      <nav className="flex items-center gap-8 border-y px-8 py-3">
        <Link href="/" className="text-sm font-medium">
          Home
        </Link>
        <Separator orientation="vertical" />
        <Link href="/favorites" className="text-sm font-medium">
          Favorites
        </Link>
        <Separator orientation="vertical" />
        <Link href="/forum" className="text-sm font-medium">
          Forum
        </Link>
        <Separator orientation="vertical" />

        <Link href="/profile" className="text-sm font-medium">
          Profile
        </Link>

        <Separator orientation="vertical" />
        {isAdmin && (
          <Link href="/users" className="text-sm font-medium">
            Users
          </Link>
        )}
      </nav>
    </header>
  );
}
