import { DeleteFavoriteButton } from "@/app/favorites/_components/DeleteFavoritesButton";
import { Pagelayout } from "@/app/_components.tsx/PageLayout";
import { createClient } from "@/lib/server";
import { UniProtType } from "@/lib/uniprotTypes";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

type UserFavoritesPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserFavoritesPage({
  params,
}: UserFavoritesPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // ---------------- logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // ---------------- check admin role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.log("profile error:", profileError);
  }

  if (profile?.role !== "admin") {
    redirect("/");
  }

  // ---------------- selected user
  const { data: selectedUser, error: selectedUserError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", id)
    .single();

  if (selectedUserError) {
    console.log("selected user error:", selectedUserError);
  }

  // ---------------- selected user's favorites
  const { data: favorites, error: favoritesError } = await supabase
    .from("favorites")
    .select("id, protein_accession")
    .eq("user_id", id);

  if (favoritesError) {
    console.log("favorites error:", favoritesError);
  }

  // ---------------- fetch protein data from UniProt
  const proteins = await Promise.all(
    (favorites ?? []).map(async (favorite) => {
      const response = await fetch(
        `https://rest.uniprot.org/uniprotkb/${favorite.protein_accession}.json`,
      );

      if (!response.ok) {
        return {
          favoriteId: favorite.id,
          accession: favorite.protein_accession,
          geneName: "Unknown gene",
          fullName: "Unknown protein",
          organism: "Unknown organism",
        };
      }

      const data: UniProtType = await response.json();

      return {
        favoriteId: favorite.id,
        accession: data.primaryAccession,
        geneName: data.genes?.[0]?.geneName?.value ?? "Unknown gene",
        fullName:
          data.proteinDescription?.recommendedName?.fullName?.value ??
          "Unknown protein",
        organism: data.organism?.scientificName ?? "Unknown organism",
      };
    }),
  );

  return (
    <Pagelayout
      pageTitle="User Favorites"
      sectionTitle={`Favorites of: ${selectedUser?.username ?? "Unknown user"}`}
    >
      {proteins.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          This user has no favorites.
        </p>
      ) : (
        <div className="space-y-4">
          {proteins.map((protein) => (
            <article
              key={protein.favoriteId}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Accession:</span>{" "}
                  {protein.accession}
                </p>

                <p>
                  <span className="font-medium">Gene:</span> {protein.geneName}
                </p>

                <p>
                  <span className="font-medium">Name:</span> {protein.fullName}
                </p>

                <p>
                  <span className="font-medium">Organism:</span>{" "}
                  {protein.organism}
                </p>
              </div>
              <DeleteFavoriteButton favoriteId={protein.favoriteId} />
            </article>
          ))}
        </div>
      )}
    </Pagelayout>
  );
}
