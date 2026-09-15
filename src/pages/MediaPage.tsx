import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import brushHero1 from "@/assets/brush-hero1.png";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useTimelineSections } from "@/hooks/use-timeline-sections";

const shuffle = <Item,>(items: Item[]) => {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[index]];
  }

  return shuffledItems;
};

const photoEntries2026 = Object.entries(
  import.meta.glob<string>("/src/assets/2026/**/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
)
  .filter(([path]) => !path.split("/").pop()?.startsWith("._"))
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath, "fr", { numeric: true }));

const groupOrder2026 = ["Le festival", "Nos bénévoles", "Over the Pop", "A Bocca Chiusa", "2x2 Voix"];
const normalizeGroupName = (name: string) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const groups2026 = Object.entries(
  photoEntries2026.reduce<Record<string, string[]>>((groups, [path, url]) => {
    const groupName = path.match(/\/2026\/([^/]+)\//)?.[1] ?? "Autres photos";
    groups[groupName] = [...(groups[groupName] ?? []), url];
    return groups;
  }, {}),
)
  .map(([folderName, photos]) => ({
    name: groupOrder2026.find((groupName) => normalizeGroupName(groupName) === normalizeGroupName(folderName)) ?? folderName,
    photos: shuffle(photos),
  }))
  .sort((firstGroup, secondGroup) => {
    const firstIndex = groupOrder2026.indexOf(firstGroup.name);
    const secondIndex = groupOrder2026.indexOf(secondGroup.name);
    if (firstIndex === -1) return 1;
    if (secondIndex === -1) return -1;
    return firstIndex - secondIndex;
  });

const photos2026 = groups2026.flatMap((group) => group.photos);

const getGroupId = (year: string, groupName: string) =>
  `gallery-${year}-${groupName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const scrollToGroup = (year: string, groupName: string) => {
  document.getElementById(getGroupId(year, groupName))?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const placeholderPhotoUrls = [
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
    description: "Retour en images sur la 3e édition du festival · Photos © Noé Michaud — Arche Production",
    videoUrl: "https://www.youtube.com/embed/n21b2hTy0OQ",
    videoFormat: "portrait",
    groups: groups2026,
    photos: photos2026,
  },
  {
    year: "2025",
    description: "Quelques instants capturés lors de la deuxième édition de Rennes en Voix",
    videoUrl: "https://www.youtube.com/embed/8eUK53WOZR8",
    videoFormat: "landscape",
    groups: [{ name: "Souvenirs de l'édition", photos: placeholderPhotoUrls.slice(7, 14) }],
    photos: placeholderPhotoUrls.slice(7, 14),
  },
  {
    year: "2024",
    description: "Les premiers souvenirs du festival et de sa toute première édition",
    videoUrl: undefined,
    videoFormat: "landscape",
    groups: [{ name: "Souvenirs de l'édition", photos: placeholderPhotoUrls.slice(14) }],
    photos: placeholderPhotoUrls.slice(14),
  },
] as const;

type SelectedPhoto = { yearIndex: number; photoIndex: number };

type ScrollingGalleryProps = {
  groupName: string;
  groupPhotos: readonly string[];
  year: string;
  yearIndex: number;
  yearPhotos: readonly string[];
  onSelectPhoto: (photo: SelectedPhoto) => void;
};

const ScrollingGallery = ({ groupName, groupPhotos, year, yearIndex, yearPhotos, onSelectPhoto }: ScrollingGalleryProps) => {
  const [isFast, setIsFast] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTouching, setIsTouching] = useState(false);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rowOffsets = useRef<number[]>([0, 0, 0]);
  const rows = [0, 1, 2].map((rowIndex) => groupPhotos.filter((_, photoIndex) => photoIndex % 3 === rowIndex));

  const finishTouch = () => {
    rowRefs.current.forEach((row, rowIndex) => {
      if (row) rowOffsets.current[rowIndex] = row.scrollLeft;
    });
    setIsTouching(false);
  };

  useEffect(() => {
    if (isTouching || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrame: number;
    let previousTime = performance.now();
    const rowSpeeds = isFast ? [130, 190, 260] : [13, 20, 29];

    const animate = (currentTime: number) => {
      const elapsedSeconds = Math.min((currentTime - previousTime) / 1000, 0.1);
      previousTime = currentTime;

      rowRefs.current.forEach((row, rowIndex) => {
        if (!row) return;
        const loopWidth = row.scrollWidth / 2;
        if (loopWidth <= 0) return;

        let nextOffset = rowOffsets.current[rowIndex] + rowSpeeds[rowIndex] * elapsedSeconds * direction;
        if (nextOffset >= loopWidth) nextOffset -= loopWidth;
        if (nextOffset < 0) nextOffset += loopWidth;

        rowOffsets.current[rowIndex] = nextOffset;
        row.scrollLeft = nextOffset;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [direction, isFast, isTouching]);

  return (
    <div
      className="gallery-scroll-viewport relative min-w-0 max-w-full space-y-1"
      onTouchStart={() => setIsTouching(true)}
      onTouchEnd={finishTouch}
      onTouchCancel={finishTouch}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          ref={(element) => { rowRefs.current[rowIndex] = element; }}
          className="gallery-photo-row"
        >
          <div className="gallery-photo-track">
            {[false, true].map((isDuplicate) => (
              <div key={String(isDuplicate)} className="gallery-photo-sequence" aria-hidden={isDuplicate || undefined}>
                {row.map((photo) => {
                  const photoIndex = yearPhotos.indexOf(photo);

                  return (
                    <button
                      key={`${photo}-${isDuplicate}`}
                      type="button"
                      tabIndex={isDuplicate ? -1 : undefined}
                      onClick={() => onSelectPhoto({ yearIndex, photoIndex })}
                      className="block shrink-0 overflow-hidden bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festival-orange"
                      aria-label={`Ouvrir la photo ${photoIndex + 1} de l'édition ${year} en grand`}
                    >
                    <img src={photo} alt={`${groupName}, Rennes en Voix ${year}`} loading="lazy" className="h-20 w-auto max-w-none object-contain min-[400px]:h-24 sm:h-32 lg:h-36" />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div
        className="group absolute inset-y-0 left-0 z-10 hidden w-[18%] items-center justify-start bg-gradient-to-r from-black/10 to-transparent pl-3 opacity-0 transition-opacity hover:opacity-100 md:flex"
        onMouseEnter={() => { setDirection(-1); setIsFast(true); }}
        onMouseLeave={() => setIsFast(false)}
        aria-hidden="true"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
          <ChevronRight size={25} />
        </span>
      </div>

      <div
        className="group absolute inset-y-0 right-0 z-10 hidden w-[18%] items-center justify-end bg-gradient-to-l from-black/10 to-transparent pr-3 opacity-0 transition-opacity hover:opacity-100 md:flex"
        onMouseEnter={() => { setDirection(1); setIsFast(true); }}
        onMouseLeave={() => setIsFast(false)}
        aria-hidden="true"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
          <ChevronLeft size={25} />
        </span>
      </div>
    </div>
  );
};

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
    <div className="flex min-h-screen max-w-full flex-col overflow-x-clip bg-background text-foreground">
      <Header />
      <main className="relative min-w-0 max-w-full flex-1 overflow-x-clip pt-16 md:pt-20">
        <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="container-wide relative py-12 md:py-28">
          <span className="mb-8 block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
          <h1 className="text-headline">Souvenez-vous</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80">Retrouvez les moments forts de Rennes en Voix, édition après édition.</p>

          <div className="mt-10 grid min-w-0 max-w-full gap-8 md:mt-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
            <nav className="sticky top-16 z-20 -mx-6 self-start border-y border-border bg-background/95 px-4 py-2 shadow-sm backdrop-blur lg:top-28 lg:mx-0 lg:rounded-xl lg:border lg:p-4" aria-label="Éditions de la galerie">
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

                      <ul className="relative z-10 ml-11 hidden border-l border-festival-blue/40 pb-2 pl-4 lg:block">
                        {gallery.groups.map((group) => (
                          <li key={group.name}>
                            <button
                              type="button"
                              onClick={() => scrollToGroup(gallery.year, group.name)}
                              className="relative w-full py-1.5 text-left text-sm leading-tight text-foreground/65 transition-colors hover:text-festival-purple focus-visible:outline-none focus-visible:text-festival-purple"
                            >
                              <span className="absolute -left-[1.18rem] top-3 h-2 w-2 rounded-full bg-festival-orange" aria-hidden="true" />
                              {group.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-2 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label={`Groupes de l'édition ${galleryYears[activeIndex].year}`}>
                {galleryYears[activeIndex].groups.map((group) => (
                  <button
                    key={group.name}
                    type="button"
                    onClick={() => scrollToGroup(galleryYears[activeIndex].year, group.name)}
                    className="shrink-0 rounded-full border border-festival-purple/30 bg-white px-3 py-1.5 text-xs font-semibold text-festival-purple"
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </nav>

            <div className="min-w-0 max-w-full space-y-14 md:space-y-20">
              {galleryYears.map((gallery, yearIndex) => (
                <section
                  key={gallery.year}
                  ref={(element) => { sectionRefs.current[yearIndex] = element; }}
                  id={`gallery-${gallery.year}`}
                  className="min-w-0 max-w-full scroll-mt-28"
                  aria-labelledby={`gallery-title-${gallery.year}`}
                >
                  <span className={`block h-2 w-16 rounded-full ${sectionColors[yearIndex]}`} aria-hidden="true" />
                  <h2 id={`gallery-title-${gallery.year}`} className="mt-6 font-display text-3xl font-bold md:text-4xl">Édition {gallery.year}</h2>
                  <p className="mt-3 max-w-2xl text-foreground/75">{gallery.description}</p>

                  {gallery.videoUrl && (
                    <div className={`mx-auto mt-8 overflow-hidden rounded-2xl border border-border bg-black ${gallery.videoFormat === "portrait" ? "aspect-[9/16] w-48 sm:w-56" : "aspect-video w-full max-w-lg"}`}>
                      <iframe className="h-full w-full" src={gallery.videoUrl} title={`Vidéo Rennes en Voix ${gallery.year}`} loading="lazy" allowFullScreen />
                    </div>
                  )}

                  <div className="mt-8 min-w-0 max-w-full space-y-10 md:mt-10 md:space-y-14">
                    {gallery.groups.map((group) => (
                      <section
                        key={group.name}
                        id={getGroupId(gallery.year, group.name)}
                        className="min-w-0 max-w-full scroll-mt-28 overflow-hidden"
                        aria-labelledby={`${getGroupId(gallery.year, group.name)}-title`}
                      >
                        <div className="mb-3 border-b border-border pb-2 md:mb-5 md:pb-3">
                          <h3 id={`${getGroupId(gallery.year, group.name)}-title`} className="font-display text-xl font-bold md:text-3xl">
                            {group.name}
                          </h3>
                        </div>

                        <ScrollingGallery
                          groupName={group.name}
                          groupPhotos={group.photos}
                          year={gallery.year}
                          yearIndex={yearIndex}
                          yearPhotos={gallery.photos}
                          onSelectPhoto={setSelectedPhoto}
                        />
                      </section>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      {selectedPhoto && selectedGallery && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 px-2 py-16 md:p-4" role="dialog" aria-modal="true" aria-label={`Galerie photo ${selectedGallery.year}`} onClick={() => setSelectedPhoto(null)}>
          <button type="button" onClick={() => setSelectedPhoto(null)} aria-label="Fermer la galerie" className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-black md:right-5 md:top-5"><X size={22} /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Photo précédente" className="absolute bottom-4 left-[calc(50%_-_4rem)] z-10 rounded-full bg-white/90 p-2 text-black md:bottom-auto md:left-8"><ChevronLeft size={26} /></button>
          <img src={selectedGallery.photos[selectedPhoto.photoIndex]} alt={`Rennes en Voix ${selectedGallery.year}, photo ${selectedPhoto.photoIndex + 1}`} className="max-h-full max-w-full object-contain md:max-h-[90vh] md:max-w-[90vw]" onClick={(event) => event.stopPropagation()} />
          <button type="button" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Photo suivante" className="absolute bottom-4 right-[calc(50%_-_4rem)] z-10 rounded-full bg-white/90 p-2 text-black md:bottom-auto md:right-8"><ChevronRight size={26} /></button>
          <span className="absolute bottom-5 rounded-full bg-black/70 px-3 py-1 text-xs text-white">Édition {selectedGallery.year} · {selectedPhoto.photoIndex + 1} / {selectedGallery.photos.length}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MediaPage;
