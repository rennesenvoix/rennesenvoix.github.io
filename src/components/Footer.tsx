import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import financeur1 from "@/assets/partenaires/financeur1 - ccll.jpg";
import { footerNavigationItems } from "@/lib/navigation";

export function Footer() {
  return (
    // Regroupe l'identité du festival, les liens utiles et les réseaux sociaux.
    <footer className="border-t border-border">
      <div className="container-wide py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="font-display text-2xl font-bold">Rennes en Voix</p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Festival vocal a cappella
            </p>
            <div className="flex h-1.5 w-32 overflow-hidden rounded-full">
              <span className="flex-1 bg-festival-blue" />
              <span className="flex-1 bg-festival-orange" />
              <span className="flex-1 bg-festival-purple" />
              <span className="flex-1 bg-festival-green" />
              <span className="flex-1 bg-festival-red" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-label">Avec leur soutien</p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-16 w-40 items-center justify-center overflow-hidden border border-border bg-white p-2">
                <img src={financeur1} alt="Logo du financeur CCLL" className="h-full w-full object-contain" />
              </div>
              <div className="flex h-16 w-40 items-center justify-center border border-border bg-white px-3 text-center font-display text-xs font-bold leading-tight text-[#262323]">
                Commune de Rennes-sur-Loue
              </div>
            </div>
          </div>

          <nav aria-label="Liens de bas de page">
            <ul className="space-y-2 text-sm">
              {footerNavigationItems.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="link-underline text-foreground/80 hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <p className="text-label">Nous suivre</p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/rennesenvoix"
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
