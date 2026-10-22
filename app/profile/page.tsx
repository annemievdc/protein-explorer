import { AvatarUpload } from "@/app/_components.tsx/AvatarUploader";
import { Pagelayout } from "@/app/_components.tsx/PageLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, first_name, last_name, avatar_url")
    .eq("id", user.id)
    .single();

  return (
    <Pagelayout pageTitle="Profile" sectionTitle="Your profile">
      <div className="mx-auto max-w-xl space-y-6">
        <div>
          <Avatar className="size-40">
            <AvatarImage src={profile?.avatar_url ?? undefined}></AvatarImage>
            <AvatarFallback>
              {profile?.first_name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Username</p>
          <p>{profile?.username}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Firstname</p>
          <p>{profile?.first_name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Lastname</p>
          <p>{profile?.last_name}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p>{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-3">
            Upload Profile Picture
          </p>

          <AvatarUpload userId={user.id}></AvatarUpload>
        </div>
      </div>
    </Pagelayout>
  );
}
