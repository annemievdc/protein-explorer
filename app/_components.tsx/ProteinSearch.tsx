"use client";

import { useState } from "react";
import { Protein } from "@/lib/types";
import { ProteinSearchForm } from "../proteins/_components/ProteinSearchForm";
import { UniProtType } from "@/lib/uniprotTypes";

type ProteinSearchProps = {
  onSearchResults: (proteins: Protein[]) => void;
};

export const ProteinSearch = ({ onSearchResults }: ProteinSearchProps) => {
  const [message, setMessage] = useState("");
  const [organismId, setOrganismId] = useState("9606");

  const handleSearch = async (searchTerm: string) => {
    // Check empty search field
    const query = searchTerm.trim().toLowerCase();

    if (query === "") {
      setMessage("Enter a valid search term.");
      onSearchResults([]);
      return;
    }

    console.log(query);

    // Search term + selected organism
    const uniProtQuery = `${query} AND (organism_id:${organismId})`;

    console.log(uniProtQuery);

    const response = await fetch(
      `https://rest.uniprot.org/uniprotkb/search?query=${encodeURIComponent(
        uniProtQuery,
      )}&format=json`,
    );

    const data = await response.json();

    console.log(data);

    if (data.results.length === 0) {
      setMessage("No protein found, try another English search term.");
      onSearchResults([]);
      return;
    }

    const mappedProteins: Protein[] = data.results.map(
      (searchResult: UniProtType) => ({
        accession: searchResult.primaryAccession,
        name:
          searchResult.proteinDescription?.recommendedName?.fullName?.value ??
          "Unknown protein name",
        gene: searchResult.genes?.[0]?.geneName?.value ?? "Unknown gene",
        organism: searchResult.organism.scientificName,
        length: searchResult.sequence.length,
        sequence: searchResult.sequence.value,
      }),
    );

    onSearchResults(mappedProteins);
    setMessage("");
  };

  return (
    <section className="w-full border-b px-8 py-8">
      <ProteinSearchForm
        onSearch={handleSearch}
        organismId={organismId}
        setOrganismId={setOrganismId}
      />

      {message && (
        <p className="mt-4 rounded-lg border border-accent bg-secondary px-4 py-3 text-sm text-foreground">
          {message}
        </p>
      )}
    </section>
  );
};
