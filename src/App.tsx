import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProgrammingPage = lazy(() => import("./pages/ProgrammingPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const MediaPage = lazy(() => import("./pages/MediaPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FestivalPage = lazy(() => import("./pages/FestivalPage"));
const AttendancePage = lazy(() => import("./pages/AttendancePage"));

const App = () => (
  <HashRouter>
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-foreground">Chargement…</div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/le-festival" element={<FestivalPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/programmation" element={<ProgrammingPage />} />
        <Route path="/soutien" element={<SupportPage />} />
        <Route path="/medias" element={<MediaPage />} />
        <Route path="/frequentation" element={<AttendancePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </HashRouter>
);

export default App;
