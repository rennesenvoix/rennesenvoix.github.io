import { useState } from "react";
import { Menu, X } from "lucide-react";
import titleLogo from "@/assets/Titre ReV.png";

const navItems = [
  { label: "Le Festival", href: "/#festival" },
  { label: "Programmation", href: "/#programmation" },
  { label: "Infos pratiques", href: "/#infos" },
  { label: "Éditions passées", href: "/editions" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" aria-label="Rennes en Voix, accueil">
            <img src={titleLogo} alt="Rennes en Voix" className="h-10 w-auto object-contain md:h-14" />
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-sans tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#programmation"
              className="rounded-full bg-festival-purple px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-transform duration-300 hover:scale-105"
            >
              Réserver
            </a>
          </nav>

          <button
            className="md:hidden p-2 -mr-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-fade-in" aria-label="Navigation mobile">
          <div className="container-wide py-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-display font-semibold"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
