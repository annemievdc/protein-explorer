"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { organisms } from "@/lib/organisms";
import { Dispatch, SetStateAction, useState } from "react";

type ProteinSearchFormProps = {
  onSearch: (searchTerm: string) => void;
  organismId: string;
  setOrganismId: Dispatch<SetStateAction<string>>;
};

export const ProteinSearchForm = ({
  onSearch,
  organismId,
  setOrganismId,
}: ProteinSearchFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <form
      className="flex flex-col gap-4 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(searchTerm);
      }}
    >
      <Input
        type="search"
        placeholder="f.ex. 'insulin'"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-12 flex-1 border-border bg-background px-4 text-foreground placeholder:text-foreground/50 focus-visible:ring-accent"
      />

      <select
        value={organismId}
        onChange={(e) => setOrganismId(e.target.value)}
        className="h-12 rounded-md border border-border bg-background px-4 text-sm"
      >
        {organisms.map((organism) => (
          <option key={organism.id} value={organism.id}>
            {organism.label} - {organism.scientificName}
          </option>
        ))}
      </select>

      <Button
        type="submit"
        className="h-12 bg-primary px-8 text-primary-foreground hover:bg-accent hover:text-accent-foreground"
      >
        Search
      </Button>
    </form>
  );
};
