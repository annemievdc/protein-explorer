import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import { UniProtType } from "@/lib/uniprotTypes";
import { Protein } from "@/lib/types";
import { CopyTextButton } from "../../_components/CopyTextButton";
import { ArrowLeft } from "lucide-react";
import { Pagelayout } from "@/app/_components.tsx/PageLayout";

type ProteinSequencePageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProteinSequencePage({
  params,
}: ProteinSequencePageProps) {
  const { id } = await params;

  const response = await fetch(`https://rest.uniprot.org/uniprotkb/${id}.json`);

  if (!response.ok) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-8 py-10">
          <p>Protein sequence not found.</p>
        </div>
      </main>
    );
  }

  const data: UniProtType = await response.json();

  const protein: Protein = {
    accession: data.primaryAccession,
    name:
      data.proteinDescription?.recommendedName?.fullName?.value ??
      "Unknown protein name",
    gene: data.genes?.[0]?.geneName?.value ?? "Unknown gene",
    organism: data.organism?.scientificName ?? "Unknown organism",
    length: data.sequence?.length ?? 0,
    sequence: data.sequence?.value ?? "",
  };

  return (
    <Pagelayout
      pageTitle="Amino acid sequence"
      sectionTitle={protein.name}
      previous={{
        href: `/proteins/${protein.accession}`,
        label: "Back to protein details",
      }}
    >
      <article className="rounded-2xl border border-border bg-card p-6 shadow-lg w-full space-y-6 m-3">
        <div className="border-b border-border pb-6">
          <p className="text-sm text-muted-foreground">{protein.accession}</p>

          <h2 className="mt-1 text-2xl font-semibold">{protein.name}</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {protein.length} amino acids
          </p>
        </div>

        <section className="mt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold">Complete sequence</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Raw amino acid sequence
              </p>
            </div>

            <CopyTextButton
              text={protein.sequence}
              label="Copy full sequence"
            />
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-5">
            <p className="break-all font-mono text-sm leading-8 tracking-widest text-foreground/90">
              {protein.sequence}
            </p>
          </div>
        </section>
      </article>
    </Pagelayout>
  );
}
