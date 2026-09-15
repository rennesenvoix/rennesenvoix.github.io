import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ContactPage from "./pages/ContactPage";
import ProgrammingPage from "./pages/ProgrammingPage";
import SupportPage from "./pages/SupportPage";
import MediaPage from "./pages/MediaPage";
import NotFound from "./pages/NotFound";
import FestivalPage from "./pages/FestivalPage";
import AttendancePage from "./pages/AttendancePage";

const App = () => (
  <HashRouter>
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
  </HashRouter>
);

export default App;
