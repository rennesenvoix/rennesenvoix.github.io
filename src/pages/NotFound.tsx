import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const setMeta = (selector: string, attr: string, value: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const title = "Page introuvable (404) — Rennes en Voix";
    const description =
      "Cette page n'existe pas ou a été déplacée. Retrouvez la programmation 2026 et les infos pratiques du festival Rennes en Voix.";

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[name="robots"]', "name", "robots", "noindex, follow");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="font-display text-5xl font-bold">404</h1>
        <p className="mt-4 text-lg text-foreground/70">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-full bg-festival-orange px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-black transition-transform duration-300 hover:scale-105"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
