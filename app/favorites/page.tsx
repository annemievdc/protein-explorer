import { Pagelayout } from "@/app/_components.tsx/PageLayout";
import { createClient } from "@/lib/server";
import { Protein } from "@/lib/types";
import { UniProtType } from "@/lib/uniprotTypes";
import { ProteinCard } from "../proteins/_components/ProteinCard";

export default async function FavoritesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: favorites, error } = await supabase
    .from("favorites")
    .select("protein_accession")
    .eq("user_id", user!.id); //user kan niet null zijn
  if (error) {
    console.log("error getting favorites", error);
  }
  //----------proteine ophalen
  const proteins: Protein[] = await Promise.all(
    (favorites ?? []).map(async (favorite) => {
      const proteinResult = await fetch(
        `https://rest.uniprot.org/uniprotkb/${favorite.protein_accession}.json`,
      );
      console.log(proteinResult);
      const data: UniProtType = await proteinResult.json();

      return {
        accession: data.primaryAccession,
        name:
          data.proteinDescription?.recommendedName?.fullName?.value ??
          "Unknown protein",
        gene: data.genes?.[0]?.geneName?.value ?? "Unknown gene",
        organism: data.organism?.scientificName ?? "Unknown organism",
        length: data.sequence?.length ?? 0,
        sequence: data.sequence?.value ?? "",
      };
    }),
  );

  return (
    <Pagelayout pageTitle="Favorites" sectionTitle="Saved Proteins">
      {proteins.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4 w-full space-y-6 m-3">
          {proteins.map((protein) => (
            <ProteinCard
              key={protein.accession}
              protein={protein}
              userId={user!.id}
            />
          ))}
        </div>
      ) : (
        <p>You don&apos;t have any favorites yet.</p>
      )}
    </Pagelayout>
  );
}
