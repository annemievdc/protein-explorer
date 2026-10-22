import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Mijn account</h1>
      <p>Je bent ingelogd als {user.email}</p>
    </main>
  );
}
