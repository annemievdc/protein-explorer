"use client";

import { useState } from "react";
import { Protein } from "@/lib/types";
import { ProteinSearch } from "./ProteinSearch";
import { ProteinList } from "./ProteinList";

type HomeProteinSearchProps = {
  userId: string;
};

export const HomeProteinSearch = ({ userId }: HomeProteinSearchProps) => {
  const [proteins, setProteins] = useState<Protein[]>([]);

  return (
    <div className="w-full space-y-6">
      <ProteinSearch onSearchResults={setProteins} />

      <ProteinList proteins={proteins} userId={userId} />
    </div>
  );
};
