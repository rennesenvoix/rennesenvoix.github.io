import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import titleLogo from "@/assets/Titre ReV.png";
import { navigationItems } from "@/lib/navigation";

export function Header() {
  // Contrôle l'ouverture du menu mobile.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" aria-label="Rennes en Voix, accueil">
            <img src={titleLogo} alt="Rennes en Voix" className="h-10 w-auto object-contain md:h-14" />
          </Link>

          {/* Navigation principale. */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Navigation principale">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={item.isCallToAction
                  ? "rounded-full bg-festival-purple px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-transform duration-300 hover:scale-105"
                  : "text-xs font-sans tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors"}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden p-2 -mr-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation compacte affichée sur les petits écrans. */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-background animate-fade-in" aria-label="Navigation mobile">
          <div className="container-wide py-6 flex flex-col gap-5">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={item.isCallToAction
                  ? "mt-2 rounded-full bg-festival-purple px-5 py-3 text-center text-lg font-semibold uppercase tracking-wider text-white"
                  : "text-2xl font-display font-semibold"}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
