import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import brushHero1 from "@/assets/brush-hero1.png";

const photos = [
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f66f4a8c66?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485872299829-c673f5194813?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=900&auto=format&fit=crop",
];

const MediaPage = () => {
  // Index de la photo ouverte dans la visionneuse plein écran.
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const showPrevious = () => setSelectedIndex((index) => index === null ? null : (index - 1 + photos.length) % photos.length);
  const showNext = () => setSelectedIndex((index) => index === null ? null : (index + 1) % photos.length);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
        <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="container-wide relative py-20 md:py-28">
          <span className="mb-8 block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
          <h1 className="text-headline">Souvenez-vous</h1>
          {/* Vidéo principale du festival. */}
          <section className="mt-5">
            <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-border bg-black">
              <iframe className="h-full w-full" src="https://www.youtube.com/embed/8eUK53WOZR8" title="Vidéo Rennes en Voix" loading="lazy" allowFullScreen />
            </div>
          </section>

          {/* Mosaïque de vignettes ouvrant la visionneuse au clic. */}
          <div className="mt-12 columns-2 gap-1 sm:columns-3 md:columns-4 lg:columns-5">
            {photos.map((photo, index) => (
              <button key={photo} type="button" onClick={() => setSelectedIndex(index)} className="group relative mb-1 block w-full overflow-hidden bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festival-orange" aria-label={`Ouvrir la photo ${index + 1} en grand`}>
                <img src={photo} alt={`Rennes en Voix, moment du festival ${index + 1}`} loading="lazy" className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1 py-0.5 text-[8px] text-white">© Rennes en voix</span>
              </button>
            ))}
          </div>

        </div>
      </main>
      {/* Visionneuse avec navigation circulaire entre les 20 photos. */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label="Galerie photo" onClick={() => setSelectedIndex(null)}>
          <button type="button" onClick={() => setSelectedIndex(null)} aria-label="Fermer la galerie" className="absolute right-5 top-5 z-10 rounded-full bg-white/90 p-2 text-black"><X size={22} /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Photo précédente" className="absolute left-3 z-10 rounded-full bg-white/90 p-2 text-black md:left-8"><ChevronLeft size={26} /></button>
          <img src={photos[selectedIndex]} alt={`Rennes en Voix, photo ${selectedIndex + 1}`} className="max-h-[90vh] max-w-[90vw] object-contain" onClick={(event) => event.stopPropagation()} />
          <button type="button" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Photo suivante" className="absolute right-3 z-10 rounded-full bg-white/90 p-2 text-black md:right-8"><ChevronRight size={26} /></button>
          <span className="absolute bottom-5 rounded-full bg-black/70 px-3 py-1 text-xs text-white">{selectedIndex + 1} / {photos.length}</span>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MediaPage;
