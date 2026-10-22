"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/client";

import { Heart } from "lucide-react";

import { FC, useEffect, useState } from "react";

type FavoriteButtonProps = {
  proteinAccession: string;
  userId: string;
};

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  proteinAccession,
  userId,
}) => {
  const [favorite, setFavorite] = useState(false);
  //eeste check de supabase of protein er al in zit bij user x?
  useEffect(() => {
    const checkFavorite = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", userId)
        .eq("protein_accession", proteinAccession)
        .maybeSingle();

      if (error) {
        console.log("Error checking favorite:", error);
        return;
      }
      //gebruikt de data in de db
      //als de protein er inzit =>true  en als protein niet gevonden=>false

      setFavorite(!!data);
    };

    checkFavorite();
  }, [proteinAccession, userId]); //dependency array, bepaald wanneer de useEffect opnieuw gedaan mt w

  const handleFavorite = async () => {
    const supabase = createClient();

    if (favorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("protein_accession", proteinAccession);

      if (error) {
        console.log("Error removing favorite:", error);
        return;
      }

      setFavorite(false);
    } else {
      console.log("proteinAccession:", proteinAccession);
      console.log("userId prop:", userId);
      console.log("authenticated user:", userId);

      const { error } = await supabase.from("favorites").insert({
        user_id: userId,
        protein_accession: proteinAccession,
      });

      if (error) {
        console.log("Error adding favorite:", error);
        return;
      }

      setFavorite(true);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleFavorite}
      className="gap-2"
    >
      <Heart
        className={`size-5 ${
          favorite ? "fill-red-400 text-red-400" : "text-foreground"
        }`}
      />
    </Button>
  );
};
