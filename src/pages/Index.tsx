import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import groupeColore from "@/assets/groupe-coloré.png";
import titleLogo from "@/assets/Titre ReV.png";
import { Link } from "react-router-dom";

// Compte à rebours temporairement désactivé — à réactiver pour la prochaine édition.
// import { useEffect, useState } from "react";
// const festivalDate = new Date("2027-07-03T18:00:00+02:00");
const partnerLogoModules = import.meta.glob<string>("/src/assets/partenaires/Logos/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default",
  query: "?url",
});

const normalizeLogoName = (name: string) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const partnerLogoOrder = [
  "commune de rennes sur loue",
  "arche prod",
  "chateau",
  "au golden gourmand",
  "gammvert",
  "saline royale",
  "intermarche",
  "qingey liesle ape",
  "mcf",
  "gaec",
  "aux ptits pepins",
  "communaute loue lison",
  "val de loue",
  "coquy orange",
] as const;

const partnerLogos = Object.entries(partnerLogoModules).map(([path, src]) => ({
  src,
  name: path
    .split("/")
    .pop()
    ?.replace(/\.[^.]+$/, "")
    .replace(/^A(?=Comm)/, "")
    .replace(/[_-]+/g, " ") ?? "Partenaire",
})).sort((first, second) => (
  partnerLogoOrder.indexOf(normalizeLogoName(first.name) as typeof partnerLogoOrder[number])
  - partnerLogoOrder.indexOf(normalizeLogoName(second.name) as typeof partnerLogoOrder[number])
));

const LogoGroup = ({ logos, duplicate = false }: { logos: typeof partnerLogos; duplicate?: boolean }) => (
  <div className="partner-logo-group" aria-hidden={duplicate || undefined}>
    {logos.map((logo) => (
      <div key={`${duplicate ? "duplicate-" : ""}${logo.src}`} className="partner-logo-item">
        <img src={logo.src} alt={duplicate ? "" : `Logo de ${logo.name}`} loading="eager" decoding="async" />
      </div>
    ))}
  </div>
);

const PartnerLogoRow = ({ logos, reverse = false }: { logos: typeof partnerLogos; reverse?: boolean }) => (
  <div className="partner-logo-viewport">
    <div className={`partner-logo-track ${reverse ? "partner-logo-track-reverse" : ""}`}>
      <LogoGroup logos={logos} />
      <LogoGroup logos={logos} duplicate />
    </div>
  </div>
);

const PartnerLogos = () => {
  const middle = Math.ceil(partnerLogos.length / 2);
  return (
    <div className="space-y-4" aria-label="Logos des partenaires du festival">
      <PartnerLogoRow logos={partnerLogos.slice(0, middle)} />
      <PartnerLogoRow logos={partnerLogos.slice(middle)} reverse />
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

        {/* Défilement des logos des partenaires du festival. */}
        <section className="border-y border-border bg-card/50 py-16 md:py-20">
          <div className="container-wide">
            <span className="mb-8 block h-2 w-24 rounded-full bg-festival-green" aria-hidden="true" />
            <h2 className="text-headline">Nos partenaires</h2>
            <div className="mt-12">
              <PartnerLogos />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
