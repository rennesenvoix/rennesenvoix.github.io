import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PastEditions } from "@/components/PastEditions";
import brushHero1 from "@/assets/brush-hero1.png";

const PastEditionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
        <img
          src={brushHero1}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="container-wide relative py-20 md:py-28">
          <span className="mb-8 block h-2 w-24 rounded-full bg-festival-red" aria-hidden="true" />
          <h1 className="text-headline">Éditions passées</h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-foreground/80">
            Retrouvez les souvenirs et la galerie photo des éditions précédentes.
          </p>
          <PastEditions />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PastEditionsPage;
