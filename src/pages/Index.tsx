import { useEffect, useRef } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import groupeColore from "@/assets/groupe-coloré.png";
import titleLogo from "@/assets/Titre ReV.png";
import { Link } from "react-router-dom";

// Compte à rebours temporairement désactivé — à réactiver pour la prochaine édition.
// import { useEffect, useState } from "react";
// const festivalDate = new Date("2027-07-03T18:00:00+02:00");
const partners = [
  "🔑 Les propriétaires\nde l'Orangerie",
  "🏘️ ComCom\nLoue-Lison",
  "🏡 Commune de\nRennes sur Loue",
  "🏛️ Saline royale\nd’Arc et Senans",
  "🎬 Noé Michaud\nArche Production",
  "🍽️ Au Golden Gourmand",
  "🍦 Aux Petits Pépins",
  "🌱 Gamm Vert Liesle",
  "🚜 Terre Comtoise",
  "🧀 Fruitière Bio\nVal de Loue",
  "🪚 MCF",
  "🛒 Intermarché\nQuingey",
  "🎒 APE – Liesle et Quingey",
  "🐄 GAEC des\nPrés de Rennes",
  "🙌 Vous !",
  "✨ Et bien d’autres…",
];
const partnerColors = [
  "bg-festival-blue",
  "bg-festival-orange",
  "bg-festival-purple",
  "bg-festival-green",
  "bg-festival-red",
] as const;
const partnerColorOrder = [2, 0, 4, 1, 3, 1, 4, 0, 3, 2, 4, 2, 1, 0, 3, 0, 3, 2, 4, 1] as const;
const partnerRotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-3"] as const;
const partnerBrushes = ["partner-brush-1", "partner-brush-2", "partner-brush-3", "partner-brush-4", "partner-brush-5"] as const;

const FestivalBrush = ({ color, rotation, variant }: { color: string; rotation: string; variant: number }) => (
  <span aria-hidden="true" className={`partner-brush ${partnerBrushes[variant - 1]} pointer-events-none absolute h-28 w-[104%] max-w-[340px] sm:h-36 sm:w-[116%] sm:max-w-none ${color} ${rotation}`} />
);

const PartnerCloud = () => {
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("partner-card-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -4%" },
    );

    const cards = cloud.querySelectorAll(".partner-card");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cloudRef} className="grid grid-cols-1 justify-items-center gap-y-0 sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" role="list" aria-label="Partenaires du festival">
      {partners.map((partner, index) => {
        const color = partnerColors[partnerColorOrder[index % partnerColorOrder.length]];
        const rotation = partnerRotations[(index * 3 + 1) % partnerRotations.length];
        const brushVariant = ((index * 2 + Math.floor(index / partnerColors.length)) % 5) + 1;
        const separatorIndex = partner.indexOf(" ");
        const emoji = partner.slice(0, separatorIndex);
        const partnerName = partner.slice(separatorIndex + 1);

        return (
          <div
            key={partner}
            role="listitem"
            className="partner-card relative flex h-24 w-full items-center justify-center px-3 text-center sm:h-32"
            style={{ animationDelay: `${(index % 3) * 65}ms` }}
          >
            <FestivalBrush color={color} rotation={rotation} variant={brushVariant} />
            <span className="partner-name relative z-10 max-w-[78%] whitespace-pre-line break-words font-sans text-base font-bold leading-[1.15] text-black sm:max-w-[74%] lg:max-w-[95%]">
              <span aria-hidden="true" className="partner-emoji">{emoji}</span>{" "}
              <span>{partnerName}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

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
            <div className="mt-12">
              <PartnerCloud />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
