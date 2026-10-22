import { ArrowLeft, ArrowRight } from "lucide-react";
import { FC } from "react";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type NavButton = {
  href: string;
  label: string;
};

type NavButtonProps = {
  previous?: NavButton;
  next?: NavButton;
};

export const NavButtons: FC<NavButtonProps> = ({ previous, next }) => {
  return (
    <nav className="flex items-center justify-between">
      <div className="m-2">
        {previous && (
          <Link
            href={previous.href}
            className={buttonVariants({
              variant: "outline",
              className: "inline-flex items-center gap-2",
            })}
          >
            <ArrowLeft className="size-4" />
            {previous.label}
          </Link>
        )}
      </div>

      <div className="m-2">
        {next && (
          <Link
            href={next.href}
            className={buttonVariants({
              variant: "outline",
              className: "inline-flex items-center gap-2",
            })}
          >
            {next.label}
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </nav>
  );
};
