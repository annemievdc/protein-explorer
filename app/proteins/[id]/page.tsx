import { UniProtType } from "@/lib/uniprotTypes";
import { Protein } from "@/lib/types";
import { Pagelayout } from "@/app/_components.tsx/PageLayout";
import { createClient } from "@/lib/server";
import { ProteinCard } from "@/app/proteins/_components/ProteinCard";

type ProteinDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function ProteinDetailPage({
  params,
}: ProteinDetailProps) {
  const { id } = await params;
  const proteinResult = await fetch(
    `https://rest.uniprot.org/uniprotkb/${id}.json`,
  );
  //userid
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.log("Error no user found");
    return null;
  }
  //TO-DO : not found pagina
  if (!proteinResult) {
    console.log("Geen proteine gevonden !!");
  }
  const data: UniProtType = await proteinResult.json();
  console.log("detail api data 1 proteine", data);
  //data gaan mappen naar eigen proteine type
  const protein: Protein = {
    accession: data.primaryAccession,
    name:
      data.proteinDescription?.recommendedName?.fullName?.value ??
      "Onbekende naam",
    gene: data.genes?.[0]?.geneName?.value ?? "Onbekend",
    organism: data.organism.scientificName,
    length: data.sequence.length,
    sequence: data.sequence.value,
  };

  return (
    <Pagelayout
      pageTitle={"Protein Detail"}
      sectionTitle={" "}
      previous={{ href: "/", label: "Back to home" }}
    >
      <div>
        <ProteinCard protein={protein} userId={user.id}></ProteinCard>
      </div>
    </Pagelayout>
  );
}
