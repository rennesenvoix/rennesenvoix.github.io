import { useEffect, useRef, type PointerEvent } from "react";
import { BonhommeDecoratif } from "@/components/BonhommeDecoratif";
import { PiedDePage } from "@/components/PiedDePage";
import { Entete } from "@/components/Entete";
import { useSectionsChronologiques } from "@/hooks/use-sections-chronologiques";
import brushHero1 from "@/assets/brush-hero1.png";
import { Globe2, Instagram, Youtube } from "lucide-react";
import { type ProgramArtist, yearPrograms } from "@/data/programmation";

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

const resetCardTilt = (event: PointerEvent<HTMLDivElement>) => {
  event.currentTarget.style.setProperty("--card-x", "0deg");
  event.currentTarget.style.setProperty("--card-y", "0deg");
};

const tiltCard = (event: PointerEvent<HTMLDivElement>) => {
  if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
  const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
  event.currentTarget.style.setProperty("--card-x", `${-y * 6}deg`);
  event.currentTarget.style.setProperty("--card-y", `${x * 6}deg`);
};

// Carte verticale réutilisée pour les artistes à venir et les artistes des éditions passées.
const ArtistCard = ({ group, accent }: { group: ProgramArtist; accent: (typeof cardAccents)[number] }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    // Les cartes hautes doivent pouvoir être lues entièrement avant de rester en place.
    const measure = () => card.style.setProperty("--card-height", `${card.offsetHeight}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="program-card-tilt relative h-full min-w-0" onPointerMove={tiltCard} onPointerLeave={resetCardTilt} onPointerCancel={resetCardTilt}>
    <article className={`program-card-relief group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 bg-card shadow-lg ${accent.border}`}>
      <span className={`absolute -right-5 -top-5 h-16 w-16 rotate-45 ${accent.surface}`} aria-hidden="true" />
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-inherit">
        {group.comingSoon ? (
          <div className={`relative flex h-full items-center justify-center overflow-hidden bg-current/10 ${accent.text}`} aria-label="Artiste mystère">
            <span className="absolute -left-10 top-5 h-28 w-44 -rotate-12 rounded-[50%] bg-current/10" aria-hidden="true" />
            <span className="absolute -right-8 bottom-2 h-24 w-40 rotate-12 rounded-[50%] bg-current/15" aria-hidden="true" />
            <span className="relative -rotate-6 font-display text-8xl font-black leading-none drop-shadow-[4px_4px_0_rgba(255,255,255,0.9)] md:text-9xl" aria-hidden="true">?</span>
          </div>
        ) : isValidPhoto(group.photo) ? (
          <img
            src={group.photo}
            alt={`Photo de ${group.name}`}
            loading="lazy"
            className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${group.photoFit === "contain" ? "bg-white object-contain p-3 sm:p-4" : "object-cover"}`}
          />
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
    </div>
  );
};

const Programmation = () => {
  const { activeIndex, scrollToSection, sectionRefs } = useSectionsChronologiques(yearPrograms.length);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Entete />
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
                  className="scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-0"
                  aria-labelledby={`program-title-${program.year}`}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div>
                  <span className={`block h-2 w-16 rounded-full ${programColors[yearIndex]}`} aria-hidden="true" />
                  <h2 id={`program-title-${program.year}`} className="mt-2 font-display text-2xl font-bold md:text-3xl">{program.label}</h2>
                  <p className="mt-3 text-foreground/75">
                    {program.date} · {program.location}
                  </p>
                    </div>
                    <BonhommeDecoratif emplacement={5 + yearIndex} miroir={yearIndex % 2 === 0} petit />
                  </div>
                  <div className={`program-card-stack mt-8 grid gap-6 lg:grid-cols-3 ${program.year === "2027" ? "program-card-stack-upcoming" : ""}`}>
                    {program.groups
                      .map((group, index) => ({ group, index }))
                      .sort((first, second) =>
                        (first.group.displayOrder ?? (first.group.professional ? 0 : 1)) - (second.group.displayOrder ?? (second.group.professional ? 0 : 1)))
                      .map(({ group, index }) => (
                      <ArtistCard key={`${program.year}-${group.name}-${index}`} group={group} accent={cardAccents[index % cardAccents.length]} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

      </main>
      <PiedDePage />
    </div>
  );
};

export default Programmation;
