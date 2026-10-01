import { VideoAccueil } from "@/components/VideoAccueil";
import { BonhommeDecoratif } from "@/components/BonhommeDecoratif";
import { PiedDePage } from "@/components/PiedDePage";
import { Entete } from "@/components/Entete";
import groupeColore from "@/assets/groupe-coloré.png";
import titleLogo from "@/assets/Titre ReV.png";
import festivalVenue from "@/assets/2026/Le Festival/B_L'Orangerie (c) Noé Michaud Arche Production.jpg";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
  "quingey liesle ape",
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

const Accueil = () => {
  const photoDialogRef = useRef<HTMLDialogElement>(null);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  useEffect(() => {
    if (!isPhotoOpen) return;
    const dialog = photoDialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isPhotoOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Entete />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Informations essentielles de la prochaine édition. */}
        <section className="home-snap-section relative overflow-hidden">
          <img src={groupeColore} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10" />
          <div className="container-wide relative w-full pb-8 pt-4 md:py-10">
            <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] md:gap-8 lg:gap-12">
              <h1 className="w-full max-w-[460px] md:max-w-[540px]">
                <img src={titleLogo} alt="Rennes en Voix" className="h-auto w-full" />
              </h1>
              <div>
                <div className="border-l-4 border-festival-orange pl-5 md:pl-7">
                  <p className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-festival-purple sm:text-5xl md:text-5xl lg:text-6xl">
                    Samedi 3 juillet 2027
                  </p>
                  <p className="mt-3 text-base font-medium text-foreground/75 md:text-xl">
                    L’Orangerie · Rennes-sur-Loue
                  </p>
                </div>
                <Link to="/programmation" className="mt-8 inline-flex rounded-full bg-festival-purple px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-festival-purple/20 transition-transform hover:scale-105">
                  Voir la programmation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Présentation courte du festival. */}
        <section className="home-snap-section container-wide py-8 md:py-12">
          <div className="overflow-hidden rounded-3xl border border-festival-blue/40 bg-festival-blue/10 p-4 md:grid md:grid-cols-2 md:items-center md:gap-6 md:p-5 lg:gap-8">
            <VideoAccueil videoId="8eUK53WOZR8" year="2025" credit="Quentin Trigodet" creditUrl="https://www.instagram.com/quentin_trigodet/" />
            <div className="flex h-full flex-col gap-5 px-3 py-5 md:px-0 md:py-4 md:pr-5">
              <div>
                <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">Un festival vocal à Rennes-sur-Loue</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">
                  Des groupes vocaux aux univers variés se retrouvent à l’Orangerie le temps d’une soirée concert dans un cadre atypique et une ambiance conviviale, sans prétention !
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-5">
                  <Link to="/le-festival" className="inline-flex rounded-full border-2 border-festival-purple px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-festival-purple transition-colors hover:bg-festival-purple hover:text-white">
                    Découvrir le festival
                  </Link>
                  <Link to="/medias" className="text-sm font-semibold text-festival-purple underline decoration-festival-purple/40 underline-offset-4 transition-colors hover:decoration-festival-purple">
                    Retour en images →
                  </Link>
                </div>
              </div>
              <figure className="mt-auto">
                <button
                  type="button"
                  onClick={() => setIsPhotoOpen(true)}
                  aria-label="Afficher la photo de l’Orangerie en grand"
                  className="block w-full cursor-zoom-in rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festival-purple focus-visible:ring-offset-2"
                >
                  <img src={festivalVenue} alt="L’Orangerie illuminée pendant le festival" loading="lazy" className="aspect-[9/4] w-full rounded-2xl object-cover object-top shadow-md" />
                </button>
                <figcaption className="mt-1.5 text-right text-[11px] text-foreground/50">
                  Photo © <a href="https://www.archeproduction.com/" target="_blank" rel="noreferrer noopener" className="underline underline-offset-2 hover:opacity-80">Noé Michaud — Arche Production</a>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Défilement des logos des partenaires du festival. */}
        <section className="home-snap-section border-y border-border bg-card/50 py-10 md:py-14">
          <div className="container-wide grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
            <div className="min-w-0">
            <span className="mb-5 block h-2 w-24 rounded-full bg-festival-green" aria-hidden="true" />
            <div className="flex items-center justify-between gap-6">
              <h2 className="text-headline">Nos partenaires</h2>
              <BonhommeDecoratif emplacement={0} miroir tousEcrans />
            </div>
            <div className="mt-8">
              <PartnerLogos />
            </div>
            <div className="mt-8 text-center">
              <Link to="/soutien" className="inline-flex rounded-full border-2 border-festival-purple px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-festival-purple transition-colors hover:bg-festival-purple hover:text-white">
                Devenir partenaire
              </Link>
            </div>
            </div>
            <div className="mx-auto w-full max-w-[260px]">
              <VideoAccueil videoId="n21b2hTy0OQ" year="2026" credit="Louise Guyon" portrait />
            </div>
          </div>
        </section>

      </main>
      <PiedDePage />
      <dialog
        ref={photoDialogRef}
        aria-label="Photo de l’Orangerie en grand"
        onClose={() => setIsPhotoOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) setIsPhotoOpen(false); }}
        className="fixed inset-0 m-auto max-h-[100dvh] max-w-[100vw] overflow-auto border-0 bg-transparent p-4 text-white backdrop:bg-black/90 sm:p-8"
      >
        {isPhotoOpen && (
          <div className="relative">
            <button
              type="button"
              autoFocus
              onClick={() => setIsPhotoOpen(false)}
              aria-label="Fermer la photo"
              className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <X size={24} />
            </button>
            <img src={festivalVenue} alt="L’Orangerie illuminée pendant le festival, vue complète" className="mx-auto max-h-[80dvh] max-w-full object-contain" />
            <p className="mt-3 text-center text-[11px] text-white/50">Photo © <a href="https://www.archeproduction.com/" target="_blank" rel="noreferrer noopener" className="underline underline-offset-2 hover:opacity-80">Noé Michaud — Arche Production</a></p>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default Accueil;
