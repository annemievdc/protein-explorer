import { Button } from "@/components/ui/button";
import { Protein } from "@/lib/types";
import Link from "next/link";
import { FavoriteButton } from "../proteins/_components/FavoriteButton";

type ProteinListProps = {
  proteins: Protein[];
  userId?: string;
};

export const ProteinList = ({ proteins, userId }: ProteinListProps) => {
  if (proteins.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <h2 className="mb-4 text-left text-xl font-semibold text-foreground">
        Search results
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {proteins.map((protein) => (
          <article
            key={protein.accession}
            className="flex h-full flex-col rounded-xl border border-border bg-background p-5 transition duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <h3 className="min-w-0 flex-1 text-lg font-semibold text-foreground">
                {protein.name}
              </h3>

              {userId && (
                <FavoriteButton
                  proteinAccession={protein.accession}
                  userId={userId}
                />
              )}
            </div>

            <div className="mb-5 flex-1 text-sm text-foreground">
              <p className="font-medium">Gene: {protein.gene}</p>

              <p className="mt-3 text-foreground/60">
                Accession: {protein.accession}
              </p>

              <p className="mt-1 text-foreground/60">
                Organism: {protein.organism}
              </p>
            </div>

            <Button className="w-full">
              <Link href={`/proteins/${protein.accession}`}>Go to details</Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
};
