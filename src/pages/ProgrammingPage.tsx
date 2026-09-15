import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useTimelineSections } from "@/hooks/use-timeline-sections";
import brushHero1 from "@/assets/brush-hero1.png";
import { Globe2, Instagram, Youtube } from "lucide-react";
import { type ProgramArtist, yearPrograms } from "@/data/programming";

const cardAccents = [
  { border: "border-festival-orange", surface: "bg-festival-orange", text: "text-festival-orange" },
  { border: "border-festival-blue", surface: "bg-festival-blue", text: "text-festival-blue" },
  { border: "border-festival-purple", surface: "bg-festival-purple", text: "text-festival-purple" },
] as const;
const timelinePrograms = yearPrograms.map((program, yearIndex) => ({ program, yearIndex }));
const programColors = ["bg-festival-orange", "bg-festival-blue", "bg-festival-purple", "bg-festival-red"] as const;

const isValidLink = (link: string) => /^https?:\/\//.test(link);
const isValidPhoto = (photo: string) => photo.startsWith("/") || isValidLink(photo);
const linkPillClass = "flex h-7 w-7 items-center justify-center rounded-full border border-current transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festival-orange";
const disabledLinkPillClass = `${linkPillClass} cursor-default opacity-30 hover:scale-100`;

// Carte verticale réutilisée pour les artistes à venir et les artistes des éditions passées.
const ArtistCard = ({ group, accent }: { group: ProgramArtist; accent: (typeof cardAccents)[number] }) => {
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 bg-card shadow-lg transition-transform duration-300 hover:-translate-y-1 ${accent.border}`}>
      <span className={`absolute -right-5 -top-5 h-16 w-16 rotate-45 ${accent.surface}`} aria-hidden="true" />
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-inherit">
        {isValidPhoto(group.photo) ? (
          <img src={group.photo} alt={`Photo de ${group.name}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted px-6 text-center text-sm font-semibold text-muted-foreground">Photo à ajouter</div>
        )}
        <span className={`artist-illumination ${accent.text}`} aria-hidden="true" />
      </div>
      <div className="relative flex flex-1 flex-col p-6">
        <p className={`flex min-h-10 items-start pr-10 text-xs font-bold uppercase tracking-[0.18em] ${accent.text}`}>{group.style}</p>
        <h3 className="mt-3 pr-10 font-display text-2xl font-bold">{group.name}</h3>
        <p className="mt-4 leading-relaxed text-foreground/75">{group.bio}</p>
        <div className={`absolute right-4 top-5 flex flex-col gap-1.5 ${accent.text}`} aria-label={`Liens de ${group.name}`}>
          {isValidLink(group.instagram)
            ? <a href={group.instagram} target="_blank" rel="noreferrer noopener" className={linkPillClass} aria-label={`Instagram de ${group.name}`} title="Instagram"><Instagram size={13} /></a>
            : <span className={disabledLinkPillClass} aria-label="Instagram non renseigné" title="Instagram non renseigné"><Instagram size={13} /></span>}
          {isValidLink(group.youtube)
            ? <a href={group.youtube} target="_blank" rel="noreferrer noopener" className={linkPillClass} aria-label={`YouTube de ${group.name}`} title="YouTube"><Youtube size={14} /></a>
            : <span className={disabledLinkPillClass} aria-label="YouTube non renseigné" title="YouTube non renseigné"><Youtube size={14} /></span>}
          {isValidLink(group.website)
            ? <a href={group.website} target="_blank" rel="noreferrer noopener" className={linkPillClass} aria-label={`Site internet de ${group.name}`} title="Site internet"><Globe2 size={13} /></a>
            : <span className={disabledLinkPillClass} aria-label="Site internet non renseigné" title="Site internet non renseigné"><Globe2 size={13} /></span>}
        </div>
      </div>
    </article>
  );
};

const ProgrammingPage = () => {
  const { activeIndex, scrollToSection, sectionRefs } = useTimelineSections(yearPrograms.length);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="relative flex-1 pt-16 md:pt-20">
        <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="container-wide relative py-8 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <nav className="sticky top-16 z-20 -mx-6 self-start border-y border-border bg-background/95 px-6 py-2 shadow-sm backdrop-blur lg:top-28 lg:mx-0 lg:rounded-xl lg:border lg:p-4" aria-label="Éditions de la programmation">
              <ol className="relative flex lg:hidden">
                <span className="absolute left-[12.5%] right-[12.5%] top-[15px] h-0.5 bg-festival-blue" aria-hidden="true" />
                {timelinePrograms.map(({ program, yearIndex }) => {
                  const isActive = yearIndex === activeIndex;

                  return (
                    <li key={program.year} className="relative z-10 flex flex-1 justify-center">
                      <button
                        type="button"
                        onClick={() => scrollToSection(yearIndex)}
                        aria-current={isActive ? "true" : undefined}
                        className="flex flex-col items-center gap-2 text-center text-festival-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-festival-orange focus-visible:ring-offset-2"
                      >
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-background ${isActive ? "bg-festival-orange" : "bg-festival-blue"}`} aria-hidden="true">
                          <span className="h-2 w-2 rounded-full bg-white" />
                        </span>
                        <span className={`rounded-lg border border-festival-purple px-3 py-1.5 font-display text-sm font-bold ${isActive ? "bg-festival-purple text-white shadow-md shadow-festival-purple/20" : "bg-background text-festival-purple"}`}>
                          {program.year}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <ol className="relative hidden space-y-1 lg:block">
                <span className="absolute bottom-6 left-7 top-6 w-0.5 bg-festival-blue" aria-hidden="true" />
                {timelinePrograms.map(({ program, yearIndex }) => {
                  const isActive = yearIndex === activeIndex;

                  return (
                    <li key={program.year} className="relative">
                      <button
                        type="button"
                        onClick={() => scrollToSection(yearIndex)}
                        aria-current={isActive ? "true" : undefined}
                        className={`relative z-10 flex w-full items-center gap-3 rounded-lg border border-festival-purple px-3 py-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-festival-orange focus-visible:ring-offset-2 ${isActive ? "bg-festival-purple text-white shadow-md shadow-festival-purple/20" : "bg-transparent text-festival-purple hover:bg-festival-purple/10"}`}
                      >
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-background ${isActive ? "bg-festival-orange" : "bg-festival-blue"}`} aria-hidden="true">
                          <span className="h-2 w-2 rounded-full bg-white" />
                        </span>
                        <span>
                          <span className={`block text-[10px] uppercase tracking-[0.18em] ${isActive ? "text-white/75" : "text-festival-purple/65"}`}>Édition</span>
                          <span className="font-display text-xl font-bold">{program.year}</span>
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
                    {program.date} · {program.location}
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
