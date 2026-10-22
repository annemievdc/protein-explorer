"use client";

import { Button } from "@base-ui/react";
import { FC, useState } from "react";

type CopyTextButtonProps = {
  text: string;
  label?: string;
  copySuccessLabel?: string;
};

export const CopyTextButton: FC<CopyTextButtonProps> = ({
  text,
  label = "Copy",
  copySuccessLabel = "Copied !",
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <Button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      className="h-11 rounded-lg border border-border bg-primary px-5 font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:border-accent hover:bg-accent hover:text-secondary"
    >
      {copied ? copySuccessLabel : label}
    </Button>
  );
};
