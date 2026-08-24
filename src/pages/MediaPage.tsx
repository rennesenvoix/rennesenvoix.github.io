import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import brushHero1 from "@/assets/brush-hero1.png";

const photos = [
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f66f4a8c66?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&auto=format&fit=crop",
];

const MediaPage = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <Header />
    <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
      <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10" />
      <div className="container-wide relative py-20 md:py-28">
        <span className="mb-8 block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
        <h1 className="text-headline">Galerie & vidéos</h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/80">Les images et les voix qui racontent Rennes en Voix.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => <img key={photo} src={photo} alt={`Rennes en Voix, moment du festival ${index + 1}`} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />)}
        </div>
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Vidéos</h2>
          <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-border bg-black">
            <iframe className="h-full w-full" src="https://www.youtube.com/embed?listType=user_uploads&list=RennesEnVoix" title="Vidéos Rennes en Voix" loading="lazy" allowFullScreen />
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default MediaPage;
