import { buttonVariants } from "@/components/ui/button";
import { Protein } from "@/lib/types";
import Link from "next/link";
import { FC } from "react";
import { FavoriteButton } from "./FavoriteButton";

type ProteinCardProps = {
  protein: Protein;
  userId: string;
};

export const ProteinCard: FC<ProteinCardProps> = async ({
  protein,
  userId,
}) => {
  console.log("protein in card", protein);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex w-full justify-end">
        <FavoriteButton proteinAccession={protein.accession} userId={userId} />
      </div>
      <div className="min-w-0 grid flex-1 grid-cols-1 gap-y-5 2xl:grid-cols-2 2xl:gap-x-6 ">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Accession
          </p>
          <p className="mt-1 font-medium text-foreground">
            {protein.accession}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Organism
          </p>
          <p className="mt-1 font-medium text-foreground">{protein.organism}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Name
          </p>
          <p className="mt-1 font-medium text-foreground">{protein.name}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            Gene
          </p>
          <p className="mt-1 font-medium text-foreground">{protein.gene}</p>
        </div>
      </div>

      <section className="mt-8 border-t border-border pt-6">
        <h2 className="text-xl font-semibold text-foreground">
          Amino acid sequence
        </h2>

        <p className="mt-2 text-sm text-foreground/70">
          View the complete sequence of{" "}
          <span className="text-accent">{protein.length}</span> amino acids.
        </p>

        <Link
          href={`/proteins/${protein.accession}/proteinsequence`}
          className={buttonVariants({
            className:
              "mt-4 bg-primary text-primary-foreground hover:bg-accent hover:text-secondary",
          })}
        >
          View full sequence
        </Link>
      </section>
    </article>
  );
};
