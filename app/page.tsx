import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { Pagelayout } from "@/app/_components.tsx/PageLayout";
import { ProteinSearch } from "./_components.tsx/ProteinSearch";
import { HomeProteinSearch } from "./_components.tsx/HomeProteinSearch";

export default async function Home() {
  //eerst controleren of user is ingelogd
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }
  return (
    <Pagelayout pageTitle={"Search"} sectionTitle={""}>
      <HomeProteinSearch userId={user.id}></HomeProteinSearch>
    </Pagelayout>
  );
}
