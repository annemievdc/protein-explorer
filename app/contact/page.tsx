import { Pagelayout } from "../_components.tsx/PageLayout";

export default function ContactPage() {
  return (
    <Pagelayout pageTitle="Contact" sectionTitle="Get in touch">
      <div className="mx-auto flex max-w-xl flex-col gap-5 text-center">
        <p>Have a question, suggestion, or feedback about Protein Explorer?</p>

        <p className="text-muted-foreground">
          I would love to hear from you! Feel free to reach out via GitHub or
          email.
        </p>

        <div className="flex flex-col items-center gap-3">
          <a
            href="https://github.com/annemievdc"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            github.com/annemievdc
          </a>

          <a
            href="mailto:annemie.vdc@gmail.com?subject=Protein Explorer"
            className="text-primary hover:underline"
          >
            Send me an email
          </a>
        </div>
      </div>
    </Pagelayout>
  );
}
