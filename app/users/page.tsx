import { Pagelayout } from "@/app/_components.tsx/PageLayout";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { UserCard } from "../profile/_components/UsersCard";

export default async function UsersPage() {
  const supabase = await createClient();
  //check eerst of user een admin is
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) {
    console.log("profile error:", error);
  }

  if (profile?.role !== "admin") {
    redirect("/");
  }
  //haal alle users op uit db
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, username, first_name, last_name, role, created_at")
    .order("created_at", { ascending: false });

  if (profilesError) {
    console.log("profiles error:", profilesError);
  }
  //users

  return (
    <Pagelayout pageTitle={"Users"}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles?.map((profile) => (
          <UserCard
            key={profile.id}
            id={profile.id}
            username={profile.username}
            firstName={profile.first_name}
            lastName={profile.last_name}
            role={profile.role}
            currentUserId={user.id}
          />
        ))}
      </div>
    </Pagelayout>
  );
}
