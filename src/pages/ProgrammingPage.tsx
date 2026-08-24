import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import brushHero1 from "@/assets/brush-hero1.png";

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

const ArtistCard = ({ group, reverse = false }: { group: (typeof groups)[number]; reverse?: boolean }) => (
  <article className={`grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[1fr_1.35fr] ${reverse ? "md:[&>div]:order-2 md:[&>img]:order-1" : ""}`}>
    <div className="flex flex-col justify-center p-7 md:p-10">
      <h3 className="font-display text-2xl font-bold md:text-3xl">{group.name}</h3>
      <p className="mt-2 text-lg font-semibold text-foreground/80">{group.style}</p>
      <p className="mt-4 leading-relaxed text-foreground/75">{group.bio}</p>
      <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold uppercase tracking-wider">
        <a href="mailto:rennesenvoix@gmail.com?subject=Réservation" className="link-underline text-festival-orange">Réserver</a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer noopener" className="link-underline">Instagram</a>
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer noopener" className="link-underline">YouTube</a>
        <a href="https://example.com" target="_blank" rel="noreferrer noopener" className="link-underline">Site internet</a>
      </div>
    </div>
    <img src={group.photo} alt={`Photo de ${group.name}`} loading="lazy" className="order-first h-64 w-full object-cover md:order-none md:h-full" />
  </article>
);

const ProgrammingPage = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <Header />
    <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
      <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="container-wide relative py-20 md:py-28">
        <span className="mb-8 block h-2 w-24 rounded-full bg-festival-blue" aria-hidden="true" />
        <h1 className="text-headline">Programmation</h1>
        <div className="mt-14 space-y-20">
          {yearPrograms.map((program, yearIndex) => (
            <section key={program.year}>
              <h2 className="font-display text-2xl font-bold md:text-3xl">{program.label}</h2>
              <p className="mt-3 text-foreground/75">
                {program.date}{program.year === "2027" ? " à l'Orangerie du château de Rennes-sur-Loue." : "."}
              </p>
              <div className="mt-8 space-y-5">
                {program.groups.map((group, index) => (
                  <ArtistCard key={`${program.year}-${group.name}-${index}`} group={group} reverse={yearIndex % 2 === 1} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default ProgrammingPage;
