import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import brushHero1 from "@/assets/brush-hero1.png";
import { Link } from "react-router-dom";

const SupportPage = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <Header />
    <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
      <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="container-wide relative flex min-h-[60vh] items-center justify-center py-20 text-center md:py-28">
        <div className="max-w-2xl">
          <span className="mx-auto mb-8 block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
          <h1 className="text-headline">Soutenir le festival</h1>
          <p className="mt-5 text-xl font-semibold text-foreground/75">Bientôt disponible</p>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            Nous préparons cette page avec soin. Si vous êtes déjà impatient de nous donner un coup de pouce, pas besoin d’attendre : écrivez-nous, nous serons ravis d’échanger avec vous !
          </p>
          <Link to="/contact" className="mt-8 inline-flex rounded-full bg-festival-purple px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-transform duration-300 hover:scale-105">
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default SupportPage;
