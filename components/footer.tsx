import Image from "next/image";

const navLinks = [
  /* { href: "#", label: "About" }, */
  { href: "/contact", label: "Contact" },
];

/* const socialLinks = [
  {
    href: "https://github.com/annemievdc",
    label: "Github",
    icon: <GithubIcon />,
  },
]; */

export function Footer() {
  return (
    <footer className="w-full p-4">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <Logo className="h-4.5" /> */}
          </div>
          {/* <div className="flex items-center">
            {socialLinks.map(({ href, label, icon }) => (
              <Button
                key={label}
                size="icon"
                variant="ghost"
                render={<a aria-label={label} href={href} />}
                nativeButton={false}
              >
                {icon}
              </Button>
            ))}
          </div> */}
        </div>

        <nav>
          <ul className="flex flex-wrap gap-4 font-medium text-muted-foreground text-sm md:gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a className="hover:text-foreground" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-between gap-4 border-t py-4 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Thomas More </p>

        <p className="inline-flex items-center gap-1">
          <span>Built by</span>
          <a
            aria-label="GitHub profile"
            className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline"
            href="https://github.com/annemievdc"
            rel="noreferrer"
            target="_blank"
          >
            <Image
              src="https://github.com/annemievdc.png"
              alt="Annemie Vandecandelaere GitHub profile"
              width={16}
              height={16}
              className="rounded-full"
            />
            Annemie
          </a>
        </p>
      </div>
    </footer>
  );
}
