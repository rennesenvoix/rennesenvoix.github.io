import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { VideoAccueil } from "@/components/VideoAccueil";
import { BonhommeDecoratif } from "@/components/BonhommeDecoratif";
import { PiedDePage } from "@/components/PiedDePage";
import { Entete } from "@/components/Entete";

const Festival = () => {
  const videosRef = useRef<HTMLDivElement>(null);
  const landscapeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = landscapeRef.current?.querySelector<HTMLElement>("[data-video-frame]");
    if (!frame) return;
    const updateHeight = () => videosRef.current?.style.setProperty("--festival-video-height", `${frame.getBoundingClientRect().height}px`);
    const observer = new ResizeObserver(updateHeight);
    observer.observe(frame);
    updateHeight();
    return () => observer.disconnect();
  }, []);

  return (
  <div className="flex min-h-screen flex-col bg-background text-foreground">
    <Entete />
    <main className="flex-1 px-6 pb-10 pt-20 text-center md:pb-10 md:pt-20 lg:text-left">
      <div className="container-wide lg:grid lg:grid-cols-[minmax(220px,0.32fr)_minmax(0,0.68fr)] lg:items-center lg:gap-8">
        <div>
          <span className="mx-auto mb-3 block h-2 w-24 rounded-full bg-festival-purple lg:mx-0" aria-hidden="true" />
          <h1 className="text-headline">Le festival</h1>
          <p className="mx-auto mt-2 max-w-2xl text-lg leading-relaxed text-foreground/70 lg:mx-0">
            La page est encore en construction. En attendant, replongez dans l’ambiance des dernières éditions.
          </p>
          <Link to="/medias" className="mt-5 inline-flex rounded-full border-2 border-festival-purple px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-festival-purple transition-colors hover:bg-festival-purple hover:text-white">
            Galerie photo
          </Link>
          <div className="hidden lg:mt-6 lg:flex justify-start">
            <BonhommeDecoratif emplacement={3} />
          </div>
        </div>

        <div ref={videosRef} className="mt-6 grid min-w-0 items-center gap-6 md:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.2fr)] lg:mt-0 lg:items-start">
          <article className="mx-auto w-full max-w-[280px] rounded-2xl border border-festival-purple/20 bg-card p-2 shadow-sm">
            <h2 className="mb-2 font-display text-xl font-bold text-festival-purple">Édition 2026</h2>
            <VideoAccueil fullscreen autoplay={false} videoId="n21b2hTy0OQ" year="2026" credit="Louise Guyon" portrait matchDesktopHeight />
          </article>
          <article ref={landscapeRef} className="min-w-0 w-full rounded-2xl border border-festival-orange/30 bg-card p-2 shadow-sm">
            <h2 className="mb-2 font-display text-xl font-bold text-festival-purple">Édition 2025</h2>
            <VideoAccueil fullscreen autoplay={false} videoId="8eUK53WOZR8" year="2025" credit="Quentin Trigodet" creditUrl="https://www.instagram.com/quentin_trigodet/" />
          </article>
        </div>
      </div>

      </main>
    <PiedDePage />
  </div>
);
};

export default Festival;
