import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import brushHero1 from "@/assets/brush-hero1.png";

const SupportPage = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <Header />
    <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
      <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="container-wide relative py-20 md:py-28">
        <span className="mb-8 block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
        <h1 className="text-headline">Soutenir le festival</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80">Votre soutien permet de faire vivre la création vocale, l'accueil des ensembles et les rencontres à Rennes-sur-Loue.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-7 md:p-10">
            <h2 className="font-display text-2xl font-bold">Mécénat</h2>
            <p className="mt-4 leading-relaxed text-foreground/75">Associez votre entreprise ou votre structure à un rendez-vous culturel local et participez à son développement.</p>
            <a href="mailto:rennesenvoix@gmail.com?subject=Mécénat Rennes en Voix" className="mt-7 inline-flex rounded-full bg-festival-purple px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white">Parler mécénat</a>
          </article>
          <article className="rounded-2xl border border-border bg-card p-7 md:p-10">
            <h2 className="font-display text-2xl font-bold">Faire un don</h2>
            <p className="mt-4 leading-relaxed text-foreground/75">Chaque contribution aide à financer les artistes, la technique et l'organisation du festival.</p>
            <a href="mailto:rennesenvoix@gmail.com?subject=Don Rennes en Voix" className="mt-7 inline-flex rounded-full bg-festival-orange px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black">Faire un don</a>
          </article>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default SupportPage;
