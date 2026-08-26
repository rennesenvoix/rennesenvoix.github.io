import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import groupeColore from "@/assets/groupe-coloré.png";
import titleLogo from "@/assets/Titre ReV.png";
import brushHero1 from "@/assets/brush-hero1.png";
import { Link } from "react-router-dom";

// Compte à rebours temporairement désactivé — à réactiver pour la prochaine édition.
// import { useEffect, useState } from "react";
// const festivalDate = new Date("2027-07-03T18:00:00+02:00");
const partners = [
  "Communauté de Communes Loue-Lison",
  "Commune de Rennes-sur-Loue",
  "Au Golden Gourmand",
  "Intermarché Quingey",
  "Coop Bio Val de Loue",
  "Vous !",
  "et bien d'autres...",
];
const partnerBrushes = [
  { rotation: "-rotate-2", viewBox: "0 20 650 500" },
  { rotation: "rotate-1", viewBox: "730 30 720 390" },
  { rotation: "-rotate-1", viewBox: "500 290 650 470" },
  { rotation: "rotate-2", viewBox: "0 570 850 430" },
  { rotation: "-rotate-3", viewBox: "1020 390 500 620" },
] as const;

const WatercolorStroke = ({ rotation, viewBox }: { rotation: string; viewBox: string }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute h-20 w-[122%] overflow-hidden rounded-[48%_52%_45%_55%] ${rotation}`}
    style={{
      maskImage: "radial-gradient(ellipse at center, black 56%, transparent 100%)",
      WebkitMaskImage: "radial-gradient(ellipse at center, black 56%, transparent 100%)",
    }}
  >
    <svg viewBox={viewBox} preserveAspectRatio="none" className="h-full w-full scale-105 blur-[0.7px] mix-blend-multiply">
      <image href={brushHero1} width="1536" height="1024" />
    </svg>
  </span>
);

/* const countdownUnits = [
  { label: "jours", className: "bg-festival-blue text-white" },
  { label: "heures", className: "bg-festival-orange text-black" },
  { label: "minutes", className: "bg-festival-purple text-white" },
  { label: "secondes", className: "bg-festival-green text-black" },
] as const;
*/

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Annonce de la prochaine édition et compte à rebours. */}
        <section className="relative overflow-hidden">
          <img src={groupeColore} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10" />
          <div className="container-wide relative py-20 md:py-28">
            <h1 className="mt-5 max-w-[600px]">
              <img src={titleLogo} alt="Rennes en Voix" className="h-auto w-full" />
            </h1>
            {/*
              Compte à rebours temporairement désactivé — à réactiver pour la prochaine édition.

              <p className="mt-6 max-w-2xl font-display text-xl font-semibold md:text-2xl">Prochaine édition dans :</p>
              <div className="mt-5 grid max-w-2xl grid-cols-4 gap-3 md:gap-5" aria-label="Compte à rebours avant le festival">
                {[days, hours, minutes, seconds].map((value, index) => {
                  const unit = countdownUnits[index];

                  return (
                    <div key={unit.label} className={`rounded-xl p-4 text-center backdrop-blur-sm md:p-6 ${unit.className}`}>
                      <strong className="block font-display text-3xl md:text-5xl">{String(value).padStart(2, "0")}</strong>
                      <span className="mt-1 block text-[9px] uppercase tracking-widest opacity-80">{unit.label}</span>
                    </div>
                  );
                })}
              </div>
            */}
            <p className="mt-10 text-xl uppercase tracking-widest text-foreground/70">Le Samedi 03 juillet 2027 · à l'Orangerie de Rennes sur Loue</p>
          </div>
        </section>

        {/* Présentation de l'affiche et lien vers la programmation. */}
        <section className="container-wide py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-sm border border-border bg-card shadow-xl">
              <img src={groupeColore} alt="Affiche du festival Rennes en Voix" className="aspect-[1/1.414] w-full object-cover" />
            </div>
            <div>
              <span className="mb-8 block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
              <h2 className="text-headline">L’affiche 2027</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/75">Un rendez-vous consacré aux ensembles polyphoniques, aux voix partagées et à la convivialité.</p>
              <Link to="/programmation" className="mt-8 inline-flex rounded-full bg-festival-purple px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white">Voir la programmation</Link>
            </div>
          </div>
        </section>

        {/* Mosaïque des partenaires du festival. */}
        <section className="border-y border-border bg-card/50 py-16 md:py-20">
          <div className="container-wide">
            <span className="mb-8 block h-2 w-24 rounded-full bg-festival-green" aria-hidden="true" />
            <h2 className="text-headline">Nos partenaires</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
              {partners.map((partner, index) => {
                const brush = partnerBrushes[index % partnerBrushes.length];

                return (
                  <div key={partner} className="relative flex min-h-24 items-center justify-center px-3 text-center">
                    <WatercolorStroke rotation={brush.rotation} viewBox={brush.viewBox} />
                    <span className="relative font-display text-base font-bold leading-tight tracking-wide text-black sm:text-md">{partner}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
