import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import titleLogo from "@/assets/Titre ReV.png";
import { navigationItems } from "@/lib/navigation";

export function Header() {
  // Contrôle l'ouverture du menu mobile.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" aria-label="Rennes en Voix, accueil">
            <img src={titleLogo} alt="Rennes en Voix" className="h-10 w-auto object-contain md:h-14" />
          </Link>

          {/* Navigation principale. */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Navigation principale">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`${item.isCallToAction
                    ? "rounded-full border-2 border-festival-purple px-5 py-2 text-xs font-semibold uppercase tracking-wider text-festival-purple hover:bg-festival-purple hover:text-white"
                    : "text-xs font-sans tracking-widest uppercase hover:text-foreground"} relative transition-colors duration-300 ${isActive ? "text-festival-purple after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-festival-purple" : "text-foreground/75"}`}
                >
                  {item.label}
                  {isActive && <span className="absolute -bottom-2.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-festival-orange" aria-hidden="true" />}
                </Link>
              );
            })}
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
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`${item.isCallToAction
                    ? "mt-2 rounded-full border-2 border-festival-purple px-5 py-3 text-center text-lg font-semibold uppercase tracking-wider text-festival-purple hover:bg-festival-purple hover:text-white"
                    : "font-display text-2xl font-semibold"} relative w-fit transition-colors ${isActive ? "text-festival-purple underline decoration-2 underline-offset-8" : ""}`}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <span className="h-2 w-2 rounded-full bg-festival-orange" aria-hidden="true" />}
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
