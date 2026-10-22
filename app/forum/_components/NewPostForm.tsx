"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/client";
import { Protein } from "@/lib/types";

import { ProteinSearch } from "@/app/_components.tsx/ProteinSearch";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";

type NewPostFormProps = {
  userId: string;
};

export function NewPostForm({ userId }: NewPostFormProps) {
  const supabase = createClient();
  /*   const router = useRouter(); */

  const [proteins, setProteins] = useState<Protein[]>([]);
  const [selectedProtein, setSelectedProtein] = useState<Protein | null>(null);
  const [showProteins, setShowProteins] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedProtein) {
      setMessage("Please select a protein topic.");
      return;
    }

    if (!title.trim()) {
      setMessage("Please enter a title.");
      return;
    }

    if (!content.trim()) {
      setMessage("Please enter a message.");
      return;
    }

    const { error } = await supabase.from("posts").insert({
      user_id: userId,
      protein_accession: selectedProtein.accession,
      protein_common_name: selectedProtein.name,
      title: title.trim(),
      content: content.trim(),
    });

    if (error) {
      console.error("Error creating post:", error);
      setMessage("Something went wrong while creating the post.");
      return;
    }

    setSelectedProtein(null);
    setProteins([]);
    setTitle("");
    setContent("");
    setMessage("");

    /*     router.refresh(); */
  };

  return (
    <section className="w-full space-y-6">
      {/* Protein search */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Choose a protein topic</h3>

        <ProteinSearch onSearchResults={setProteins} />

        {proteins.length > 0 && (
          <Toggle pressed={showProteins} onPressedChange={setShowProteins}>
            {showProteins ? "Hide proteins" : "Show proteins"}
          </Toggle>
        )}

        {showProteins && proteins.length > 0 && (
          <div className="space-y-3">
            {/* protein results */}
            {showProteins && proteins.length > 0 && (
              <div className="space-y-3">
                {proteins.map((protein) => (
                  <Card key={protein.accession}>
                    <CardContent className="flex items-center justify-between gap-4 p-4">
                      <div className="space-y-1">
                        <p className="font-medium">{protein.name}</p>

                        <p className="text-sm text-muted-foreground">
                          Gene: {protein.gene}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Accession: {protein.accession}
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant={
                          selectedProtein?.accession === protein.accession
                            ? "secondary"
                            : "outline"
                        }
                        onClick={() => {
                          setSelectedProtein(protein);
                          setShowProteins(false);
                        }}
                      >
                        {selectedProtein?.accession === protein.accession
                          ? "Selected"
                          : "Select"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-border bg-card p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="topic">Topic</Label>

          <Input
            id="topic"
            value={
              selectedProtein
                ? `${selectedProtein.name} (${selectedProtein.accession})`
                : ""
            }
            placeholder="Select a protein above"
            readOnly
          />

          {selectedProtein && (
            <p className="text-sm text-muted-foreground">
              Gene: {selectedProtein.gene}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>

          <Input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a title for your post"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Message</Label>

          <Textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your message..."
            rows={6}
          />
        </div>

        {message && <p className="text-sm text-muted-foreground">{message}</p>}

        <Button type="submit">Create post</Button>
      </form>
    </section>
  );
}
