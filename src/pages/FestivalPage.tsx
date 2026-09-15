import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const FestivalPage = () => (
  <div className="flex min-h-screen flex-col bg-background text-foreground">
    <Header />
    <main className="flex-1 px-6 pb-10 pt-20 text-center md:pb-10 md:pt-20 lg:text-left">
      <div className="container-wide lg:grid lg:grid-cols-[minmax(220px,0.32fr)_minmax(0,0.68fr)] lg:items-center lg:gap-8">
        <div>
          <span className="mx-auto mb-3 block h-2 w-24 rounded-full bg-festival-purple lg:mx-0" aria-hidden="true" />
          <h1 className="text-headline">Le festival</h1>
          <p className="mx-auto mt-2 max-w-2xl text-lg leading-relaxed text-foreground/70 lg:mx-0">
            La page est encore en construction. En attendant, replongez dans l’ambiance des deux dernières éditions.
          </p>
        </div>

        <div className="mt-4 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-center md:gap-5 lg:mt-0">
          <article className="rounded-2xl border border-festival-purple/20 bg-card p-2 shadow-sm">
            <h2 className="mb-1 font-display text-xl font-bold text-festival-purple">Édition 2026</h2>
            <div className="mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-xl bg-black shadow-lg md:h-[340px] md:w-auto lg:h-[380px]">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/n21b2hTy0OQ?controls=1&fs=1&rel=0&playsinline=1"
                title="Vidéo récapitulative de Rennes en Voix 2026"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mx-auto mt-2 max-w-[260px] text-right text-xs text-foreground/55">Vidéo © Louise Guyon</p>
          </article>

          <article className="w-full rounded-2xl border border-festival-orange/30 bg-card p-2 shadow-sm md:w-auto">
            <h2 className="mb-1 font-display text-xl font-bold text-festival-purple">Édition 2025</h2>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg md:h-[255px] md:w-auto lg:h-[285px]">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/8eUK53WOZR8?controls=1&fs=1&rel=0&playsinline=1"
                title="Vidéo récapitulative de Rennes en Voix 2025"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-2 text-right text-xs text-foreground/55">Vidéo © Quentin Trigodet</p>
          </article>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default FestivalPage;
