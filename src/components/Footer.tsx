import { Instagram, Mail } from "lucide-react";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Programmation", href: "/programmation" },
  { label: "Soutenir", href: "/soutien" },
  { label: "Galerie & vidéos", href: "/medias" },
  { label: "Contact & infos", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-wide py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="font-display text-2xl font-bold">Rennes en Voix</p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Festival vocal a capella, organisé par le comité des fêtes de
              Rennes-sur-Loue.
            </p>
            <div className="flex h-1.5 w-32 overflow-hidden rounded-full">
              <span className="flex-1 bg-festival-blue" />
              <span className="flex-1 bg-festival-orange" />
              <span className="flex-1 bg-festival-purple" />
              <span className="flex-1 bg-festival-green" />
              <span className="flex-1 bg-festival-red" />
            </div>
          </div>

          <nav aria-label="Liens de bas de page">
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="link-underline text-foreground/80 hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <p className="text-label">Nous suivre</p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="rounded-full border border-border p-2.5 text-foreground transition-all duration-300 hover:scale-110 hover:border-festival-red hover:text-festival-red"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:rennesenvoix@gmail.com"
                aria-label="Envoyer un email"
                className="rounded-full border border-border p-2.5 text-foreground transition-all duration-300 hover:scale-110 hover:border-festival-purple hover:text-festival-purple"
              >
                <Mail size={18} />
              </a>
            </div>
            <a href="mailto:rennesenvoix@gmail.com" className="block text-sm text-foreground/80 hover:text-foreground">
              rennesenvoix@gmail.com
            </a>
          </div>
        </div>

        <p className="mt-12 text-xs text-foreground/60">
          © 2026 Rennes en Voix. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
