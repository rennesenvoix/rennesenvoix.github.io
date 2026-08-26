import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import brushHero1 from "@/assets/brush-hero1.png";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useTimelineSections } from "@/hooks/use-timeline-sections";

const photoUrls = [
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

const galleryYears = [
  {
    year: "2026",
    description: "Retour en images sur la 3°édition du festival",
    videoUrl: undefined,
    photos: photoUrls.slice(0, 7),
  },
  {
    year: "2025",
    description: "Quelques instants capturés lors de la deuxième édition de Rennes en Voix",
    videoUrl: "https://www.youtube.com/embed/8eUK53WOZR8",
    photos: photoUrls.slice(7, 14),
  },
  {
    year: "2024",
    description: "Les premiers souvenirs du festival et de sa toute première édition",
    videoUrl: undefined,
    photos: photoUrls.slice(14),
  },
] as const;

type SelectedPhoto = { yearIndex: number; photoIndex: number };

const sectionColors = ["bg-festival-orange", "bg-festival-blue", "bg-festival-purple"] as const;
const timelineYears = galleryYears.map((gallery, yearIndex) => ({ gallery, yearIndex }));

const MediaPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto | null>(null);
  const { activeIndex, scrollToSection, sectionRefs } = useTimelineSections(galleryYears.length);
  const selectedGallery = selectedPhoto === null ? null : galleryYears[selectedPhoto.yearIndex];

  const showPrevious = () => {
    setSelectedPhoto((selection) => {
      if (!selection) return null;

      const photoCount = galleryYears[selection.yearIndex].photos.length;
      return { ...selection, photoIndex: (selection.photoIndex - 1 + photoCount) % photoCount };
    });
  };

  const showNext = () => {
    setSelectedPhoto((selection) => {
      if (!selection) return null;

      const photoCount = galleryYears[selection.yearIndex].photos.length;
      return { ...selection, photoIndex: (selection.photoIndex + 1) % photoCount };
    });
  };

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="relative flex-1 pt-16 md:pt-20">
        <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="container-wide relative py-20 md:py-28">
          <span className="mb-8 block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
          <h1 className="text-headline">Souvenez-vous</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80">Retrouvez les moments forts de Rennes en Voix, édition après édition.</p>

          <div className="mt-14 grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <nav className="sticky top-16 z-20 -mx-6 self-start border-y border-border bg-background/95 px-6 py-2 shadow-sm backdrop-blur lg:top-28 lg:mx-0 lg:rounded-xl lg:border lg:p-4" aria-label="Éditions de la galerie">
              <ol className="relative flex items-center justify-between lg:block lg:space-y-1">
                <span className="absolute left-4 right-4 top-1.5 h-px bg-festival-blue lg:hidden" aria-hidden="true" />
                <span className="absolute bottom-6 left-7 top-6 hidden w-0.5 bg-festival-blue lg:block" aria-hidden="true" />
                {timelineYears.map(({ gallery, yearIndex }) => {
                  const isActive = yearIndex === activeIndex;

                  return (
                    <li key={gallery.year} className="relative">
                      <button
                        type="button"
                        onClick={() => scrollToSection(yearIndex)}
                        aria-current={isActive ? "true" : undefined}
                        className={`relative z-10 flex flex-col items-center gap-1 px-2 py-1 text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-festival-orange focus-visible:ring-offset-2 lg:w-full lg:flex-row lg:gap-3 lg:rounded-lg lg:px-3 lg:py-3 lg:text-left ${isActive ? "text-festival-purple lg:bg-festival-purple lg:text-white lg:shadow-md lg:shadow-festival-purple/20" : "text-foreground/75 hover:text-festival-purple lg:hover:bg-card"}`}
                      >
                        <span className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-2 border-background lg:h-8 lg:w-8 lg:border-4 ${isActive ? "bg-festival-orange" : "bg-festival-blue"}`} aria-hidden="true">
                          <span className="hidden h-2 w-2 rounded-full bg-white lg:block" />
                        </span>
                        <span>
                          <span className={`hidden text-[10px] uppercase tracking-[0.18em] lg:block ${isActive ? "text-white/75" : "text-foreground/55"}`}>Édition</span>
                          <span className="font-display text-sm font-bold lg:text-xl">{gallery.year}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="space-y-20">
              {galleryYears.map((gallery, yearIndex) => (
                <section
                  key={gallery.year}
                  ref={(element) => { sectionRefs.current[yearIndex] = element; }}
                  id={`gallery-${gallery.year}`}
                  className="scroll-mt-28"
                  aria-labelledby={`gallery-title-${gallery.year}`}
                >
                  <span className={`block h-2 w-16 rounded-full ${sectionColors[yearIndex]}`} aria-hidden="true" />
                  <h2 id={`gallery-title-${gallery.year}`} className="mt-6 font-display text-3xl font-bold md:text-4xl">Édition {gallery.year}</h2>
                  <p className="mt-3 max-w-2xl text-foreground/75">{gallery.description}</p>

                  {gallery.videoUrl && (
                    <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border bg-black">
                      <iframe className="h-full w-full" src={gallery.videoUrl} title={`Vidéo Rennes en Voix ${gallery.year}`} loading="lazy" allowFullScreen />
                    </div>
                  )}

                  <div className="mt-8 columns-2 gap-1 sm:columns-3 md:columns-4">
                    {gallery.photos.map((photo, photoIndex) => (
                      <button
                        key={photo}
                        type="button"
                        onClick={() => setSelectedPhoto({ yearIndex, photoIndex })}
                        className="group relative mb-1 block w-full overflow-hidden bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festival-orange"
                        aria-label={`Ouvrir la photo ${photoIndex + 1} de l'édition ${gallery.year} en grand`}
                      >
                        <img src={photo} alt={`Rennes en Voix ${gallery.year}, moment du festival ${photoIndex + 1}`} loading="lazy" className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1 py-0.5 text-[8px] text-white">© Rennes en Voix</span>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      {selectedPhoto && selectedGallery && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={`Galerie photo ${selectedGallery.year}`} onClick={() => setSelectedPhoto(null)}>
          <button type="button" onClick={() => setSelectedPhoto(null)} aria-label="Fermer la galerie" className="absolute right-5 top-5 z-10 rounded-full bg-white/90 p-2 text-black"><X size={22} /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Photo précédente" className="absolute left-3 z-10 rounded-full bg-white/90 p-2 text-black md:left-8"><ChevronLeft size={26} /></button>
          <img src={selectedGallery.photos[selectedPhoto.photoIndex]} alt={`Rennes en Voix ${selectedGallery.year}, photo ${selectedPhoto.photoIndex + 1}`} className="max-h-[90vh] max-w-[90vw] object-contain" onClick={(event) => event.stopPropagation()} />
          <button type="button" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Photo suivante" className="absolute right-3 z-10 rounded-full bg-white/90 p-2 text-black md:right-8"><ChevronRight size={26} /></button>
          <span className="absolute bottom-5 rounded-full bg-black/70 px-3 py-1 text-xs text-white">Édition {selectedGallery.year} · {selectedPhoto.photoIndex + 1} / {selectedGallery.photos.length}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MediaPage;
