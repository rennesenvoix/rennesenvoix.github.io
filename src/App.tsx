import { lazy, Suspense, useLayoutEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Accueil from "./pages/Accueil";

const InformationsPratiques = lazy(() => import("./pages/InformationsPratiques"));
const Programmation = lazy(() => import("./pages/Programmation"));
const Soutien = lazy(() => import("./pages/Soutien"));
const SouvenezVous = lazy(() => import("./pages/SouvenezVous"));
const PageIntrouvable = lazy(() => import("./pages/PageIntrouvable"));
const Festival = lazy(() => import("./pages/Festival"));
const InformationsLegales = lazy(() => import("./pages/InformationsLegales"));
const Frequentation = lazy(() => import("./pages/Frequentation"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

const App = () => (
  <HashRouter>
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-foreground">Chargement…</div>}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/le-festival" element={<Festival />} />
        <Route path="/contact" element={<InformationsPratiques />} />
        <Route path="/programmation" element={<Programmation />} />
        <Route path="/soutien" element={<Soutien />} />
        <Route path="/medias" element={<SouvenezVous />} />
        <Route path="/frequentation" element={<Frequentation />} />
        <Route path="/mentions-legales" element={<InformationsLegales />} />
        <Route path="/confidentialite" element={<InformationsLegales confidentialite />} />
        <Route path="*" element={<PageIntrouvable />} />
      </Routes>
    </Suspense>
  </HashRouter>
);

export default App;
