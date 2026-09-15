import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import groupeColore from "@/assets/groupe-coloré.png";
import titleLogo from "@/assets/Titre ReV.png";
import { Volume2, VolumeX } from "lucide-react";
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

const Index = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoIframeRef = useRef<HTMLIFrameElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    const videoContainer = videoContainerRef.current;
    if (!videoContainer) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoadVideo(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(videoContainer);
    return () => observer.disconnect();
  }, []);

  const toggleVideoSound = () => {
    videoIframeRef.current?.contentWindow?.postMessage(JSON.stringify({
      event: "command",
      func: isVideoMuted ? "unMute" : "mute",
      args: [],
    }), "*");
    setIsVideoMuted((muted) => !muted);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Informations essentielles de la prochaine édition. */}
        <section className="relative flex items-start overflow-hidden">
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
        <section className="container-wide py-8 md:py-12">
          <div className="overflow-hidden rounded-3xl border border-festival-blue/40 bg-festival-blue/10 p-4 md:grid md:grid-cols-[0.75fr_1.25fr] md:items-center md:gap-6 md:p-5 lg:gap-8">
            <div className="mx-auto flex w-full max-w-[352px] items-stretch gap-3">
              <div className="min-w-0 flex-1">
                <div ref={videoContainerRef} className="aspect-[9/16] overflow-hidden rounded-2xl border border-white/70 bg-black shadow-xl">
                  {shouldLoadVideo && (
                    <iframe
                      ref={videoIframeRef}
                      className="h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/n21b2hTy0OQ?autoplay=1&mute=1&start=5&loop=1&playlist=n21b2hTy0OQ&controls=0&playsinline=1&rel=0&enablejsapi=1"
                      title="Vidéo récapitulative de Rennes en Voix 2026"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  )}
                </div>
              </div>
              <div className="relative flex w-11 shrink-0 items-center justify-center py-1">
                <p className="absolute left-0 top-1 -translate-x-3 whitespace-nowrap text-xs text-foreground/70 [writing-mode:vertical-rl]">Vidéo © Louise Guyon</p>
                <button
                  type="button"
                  onClick={toggleVideoSound}
                  disabled={!shouldLoadVideo}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-festival-purple text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-wait disabled:opacity-50"
                  aria-label={isVideoMuted ? "Activer le son de la vidéo" : "Couper le son de la vidéo"}
                  title={isVideoMuted ? "Activer le son" : "Couper le son"}
                >
                  {isVideoMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}
                </button>
              </div>
            </div>
            <div className="px-3 py-5 md:px-0 md:py-4 md:pr-5">
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">Un festival vocal à Rennes-sur-Loue</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">
                Des groupes vocaux aux univers variés se retrouvent à l’Orangerie pour une soirée concert dans un cadre atypique et une ambiance sans prétention !
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
          </div>
        </section>

        {/* Défilement des logos des partenaires du festival. */}
        <section className="border-y border-border bg-card/50 py-10 md:py-14">
          <div className="container-wide">
            <span className="mb-5 block h-2 w-24 rounded-full bg-festival-green" aria-hidden="true" />
            <h2 className="text-headline">Nos partenaires</h2>
            <div className="mt-8">
              <PartnerLogos />
            </div>
            <div className="mt-8 text-center">
              <Link to="/soutien" className="inline-flex rounded-full border-2 border-festival-purple px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-festival-purple transition-colors hover:bg-festival-purple hover:text-white">
                Devenir partenaire
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
