import { FC, ReactNode } from "react";
import { Header } from "./Header";
import { NavButtons } from "./NavButton";

type NavButton = { href: string; label: string };

type PagelayoutProps = {
  pageTitle: string;
  sectionTitle?: string;
  previous?: NavButton;
  next?: NavButton;
  children: ReactNode;
};

export const Pagelayout: FC<PagelayoutProps> = ({
  pageTitle,
  sectionTitle,
  previous,
  next,
  children,
}) => {
  return (
    <main className="min-h-screen bg-background text-foreground m-4 p-2">
      <Header></Header>
      <h1 className="text-3xl flex items-center justify-center font-semibold tracking-tight">
        {pageTitle}
      </h1>
      {(previous || next) && (
        <section className="mt-8">
          <NavButtons previous={previous} next={next} />
        </section>
      )}
      <section className="mt-10 ">
        <h2 className="text-xl font-semibold flex items-center justify-center">
          {sectionTitle}
        </h2>
        <div className="mt-6 flex items-center justify-center">{children}</div>
      </section>
    </main>
  );
};
