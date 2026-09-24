import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Accueil from "./pages/Accueil";

const InformationsPratiques = lazy(() => import("./pages/InformationsPratiques"));
const Programmation = lazy(() => import("./pages/Programmation"));
const Soutien = lazy(() => import("./pages/Soutien"));
const SouvenezVous = lazy(() => import("./pages/SouvenezVous"));
const PageIntrouvable = lazy(() => import("./pages/PageIntrouvable"));
const Festival = lazy(() => import("./pages/Festival"));
const Frequentation = lazy(() => import("./pages/Frequentation"));

const PageScrollSnap = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("page-scroll-snap");
    return () => document.documentElement.classList.remove("page-scroll-snap");
  }, [pathname]);

  return null;
};

const App = () => (
  <HashRouter>
    <PageScrollSnap />
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-foreground">Chargement…</div>}>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/le-festival" element={<Festival />} />
        <Route path="/contact" element={<InformationsPratiques />} />
        <Route path="/programmation" element={<Programmation />} />
        <Route path="/soutien" element={<Soutien />} />
        <Route path="/medias" element={<SouvenezVous />} />
        <Route path="/frequentation" element={<Frequentation />} />
        <Route path="*" element={<PageIntrouvable />} />
      </Routes>
    </Suspense>
  </HashRouter>
);

export default App;
