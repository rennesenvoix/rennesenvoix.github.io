import { Instagram, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import financeur1 from "@/assets/partenaires/Logos/Communaute-Loue-Lison.jpg";
import { navigationItems } from "@/lib/navigation";

export function Footer() {
  return (
    // Regroupe l'identité du festival, les liens utiles et les réseaux sociaux.
    <footer className="border-t border-border">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:items-start">
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
              <div className="flex h-28 w-50 max-w-80 items-center justify-center overflow-hidden border border-border bg-white p-2">
                <img src={financeur1} alt="Logo du financeur CCLL" className="h-full w-full object-contain" />
              </div>
              <div className="flex h-28 w-50 max-w-80 items-center justify-center border border-border bg-white px-5 text-center font-display text-base font-bold leading-tight text-[#262323]">
                Commune de <br /> Rennes sur Loue
              </div>
            </div>
          </div>

          <nav aria-label="Liens de bas de page">
            <ul className="space-y-2 text-sm">
              {navigationItems.map((link) => (
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
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/rennesenvoix"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram de Rennes en Voix"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 hover:scale-105 hover:border-festival-red hover:text-festival-red"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.youtube.com/@rennesenvoix"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="YouTube de Rennes en Voix"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 hover:scale-105 hover:border-festival-red hover:text-festival-red"
                >
                  <Youtube size={18} />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-festival-red" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <span className="text-sm text-foreground/80">rennesenvoix@gmail.com</span>
                <CopyButton
                  value="rennesenvoix@gmail.com"
                  label="Copier l’adresse e-mail"
                  successMessage="Adresse e-mail copiée !"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 text-xs text-foreground/70">
          © 2026 Rennes en Voix. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
