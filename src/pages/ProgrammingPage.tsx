import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useTimelineSections } from "@/hooks/use-timeline-sections";
import brushHero1 from "@/assets/brush-hero1.png";
import { Sparkles } from "lucide-react";

const groups = [
  { name: "Ensemble 1", style: "Polyphonies du monde", bio: "Un répertoire de chants traditionnels revisités en harmonie a cappella.", photo: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&auto=format&fit=crop" },
  { name: "Ensemble 2", style: "Voix contemporaines", bio: "Des voix qui se répondent dans un programme vivant, libre et généreux.", photo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&auto=format&fit=crop" },
  { name: "Ensemble 3", style: "Création vocale", bio: "Une proposition professionnelle pour clôturer le festival avec intensité.", photo: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop" },
];

const pastGroups = [
  { name: "Artiste invité 1", style: "Ensemble vocal", bio: "Biographie de l'ensemble invité lors d'une précédente édition de Rennes en Voix.", photo: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop" },
  { name: "Artiste invité 2", style: "Polyphonies a cappella", bio: "Biographie de l'ensemble invité lors d'une précédente édition de Rennes en Voix.", photo: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&auto=format&fit=crop" },
  { name: "Artiste invité 3", style: "Création vocale", bio: "Biographie de l'ensemble invité lors d'une précédente édition de Rennes en Voix.", photo: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&auto=format&fit=crop" },
];

const yearPrograms = [
  { year: "2027", label: "À venir", date: "Samedi 03 juillet 2027", groups },
  { year: "2026", label: "Programmation 2026", date: "Édition 2026", groups: pastGroups },
  { year: "2025", label: "Programmation 2025", date: "Édition 2025", groups: pastGroups },
  { year: "2024", label: "Programmation 2024", date: "Première édition", groups: pastGroups },
];

const cardAccents = [
  { border: "border-festival-orange", surface: "bg-festival-orange", text: "text-festival-orange" },
  { border: "border-festival-blue", surface: "bg-festival-blue", text: "text-festival-blue" },
  { border: "border-festival-purple", surface: "bg-festival-purple", text: "text-festival-purple" },
] as const;
const timelinePrograms = yearPrograms.map((program, yearIndex) => ({ program, yearIndex }));
const programColors = ["bg-festival-orange", "bg-festival-blue", "bg-festival-purple", "bg-festival-red"] as const;

// Carte verticale réutilisée pour les artistes à venir et les artistes des éditions passées.
const ArtistCard = ({ group, accent }: { group: (typeof groups)[number]; accent: (typeof cardAccents)[number] }) => (
  <article className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 bg-card shadow-lg transition-transform duration-300 hover:-translate-y-1 ${accent.border}`}>
    <span className={`absolute -right-5 -top-5 h-16 w-16 rotate-45 ${accent.surface}`} aria-hidden="true" />
    <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-inherit">
      <img src={group.photo} alt={`Photo de ${group.name}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <span className={`absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/95 ${accent.text}`} aria-hidden="true">
        <Sparkles size={18} />
      </span>
    </div>
    <div className="relative flex flex-1 flex-col p-6">
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${accent.text}`}>{group.style}</p>
      <h3 className="mt-3 font-display text-2xl font-bold">{group.name}</h3>
      <p className="mt-4 leading-relaxed text-foreground/75">{group.bio}</p>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider">
        <a href="https://www.instagram.com/rennesenvoix" target="_blank" rel="noreferrer noopener" className="link-underline">Instagram</a>
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer noopener" className="link-underline">YouTube</a>
        <a href="https://example.com" target="_blank" rel="noreferrer noopener" className="link-underline">Site internet</a>
      </div>
    </div>
  </article>
);

const ProgrammingPage = () => {
  const { activeIndex, scrollToSection, sectionRefs } = useTimelineSections(yearPrograms.length);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="relative flex-1 pt-16 md:pt-20">
        <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="container-wide relative py-20 md:py-28">
          <span className="block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
          <h1 className="mt-8 text-headline">Programmation</h1>

          <div className="mt-14 grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <nav className="sticky top-16 z-20 -mx-6 self-start border-y border-border bg-background/95 px-6 py-2 shadow-sm backdrop-blur lg:top-28 lg:mx-0 lg:rounded-xl lg:border lg:p-4" aria-label="Éditions de la programmation">
              <ol className="relative flex items-center justify-between lg:block lg:space-y-1">
                <span className="absolute left-4 right-4 top-1.5 h-px bg-festival-blue lg:hidden" aria-hidden="true" />
                <span className="absolute bottom-6 left-7 top-6 hidden w-0.5 bg-festival-blue lg:block" aria-hidden="true" />
                {timelinePrograms.map(({ program, yearIndex }) => {
                  const isActive = yearIndex === activeIndex;

                  return (
                    <li key={program.year} className="relative">
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
                          <span className="font-display text-sm font-bold lg:text-xl">{program.year}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="space-y-20">
              {yearPrograms.map((program, yearIndex) => (
                <section
                  key={program.year}
                  ref={(element) => { sectionRefs.current[yearIndex] = element; }}
                  id={`program-${program.year}`}
                  className="scroll-mt-28"
                  aria-labelledby={`program-title-${program.year}`}
                >
                  <span className={`block h-2 w-16 rounded-full ${programColors[yearIndex]}`} aria-hidden="true" />
                  <h2 id={`program-title-${program.year}`} className="mt-6 font-display text-2xl font-bold md:text-3xl">{program.label}</h2>
                  <p className="mt-3 text-foreground/75">
                    {program.date}{program.year === "2027" ? " à l'Orangerie du château de Rennes-sur-Loue." : "."}
                  </p>
                  <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {program.groups.map((group, index) => (
                      <ArtistCard key={`${program.year}-${group.name}-${index}`} group={group} accent={cardAccents[index % cardAccents.length]} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProgrammingPage;
