import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import groupeColore from "@/assets/groupe-coloré.png";

const festivalDate = new Date("2027-07-03T19:00:00+02:00");
const partners = ["Comité des fêtes", "Rennes-sur-Loue", "Partenaire local", "Culture & patrimoine", "Soutien associatif", "Avec vous"];

const Index = () => {
  const [remaining, setRemaining] = useState(() => Math.max(0, festivalDate.getTime() - Date.now()));

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, festivalDate.getTime() - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <section className="relative overflow-hidden">
          <img src={groupeColore} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45" />
          <div className="container-wide relative py-20 md:py-28">
            <p className="text-label">Prochaine édition</p>
            <h1 className="mt-5 text-display">Rennes en Voix</h1>
            <p className="mt-6 max-w-2xl text-xl font-display font-semibold md:text-2xl">Le festival vocal a capella à Rennes-sur-Loue.</p>
            <div className="mt-10 grid max-w-2xl grid-cols-4 gap-3 md:gap-5" aria-label="Compte à rebours avant le festival">
              {[ [days, "jours"], [hours, "heures"], [minutes, "minutes"], [seconds, "secondes"] ].map(([value, label]) => (
                <div key={label} className="rounded-xl bg-background/85 p-4 text-center backdrop-blur-sm md:p-6">
                  <strong className="block font-display text-3xl md:text-5xl">{String(value).padStart(2, "0")}</strong>
                  <span className="mt-1 block text-xs uppercase tracking-widest text-foreground/65">{label}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm uppercase tracking-widest text-foreground/70">Samedi 03 juillet 2027 · Orangerie du château</p>
          </div>
        </section>

        <section className="container-wide py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-sm border border-border bg-card shadow-xl">
              <img src={groupeColore} alt="Affiche du festival Rennes en Voix" className="aspect-[1/1.414] w-full object-cover" />
            </div>
            <div>
              <span className="mb-8 block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
              <h2 className="text-headline">L’affiche 2027</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/75">Un rendez-vous consacré aux ensembles polyphoniques, aux voix partagées et à la convivialité.</p>
              <a href="/programmation" className="mt-8 inline-flex rounded-full bg-festival-purple px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white">Voir la programmation</a>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/50 py-16 md:py-20">
          <div className="container-wide">
            <span className="mb-8 block h-2 w-24 rounded-full bg-festival-green" aria-hidden="true" />
            <h2 className="text-headline">Nos partenaires</h2>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {partners.map((partner, index) => <div key={partner} className={`flex min-h-28 items-center justify-center p-4 text-center font-display text-sm font-bold ${index % 2 ? "bg-festival-orange" : "bg-festival-blue"} ${index % 2 ? "text-black" : "text-white"}`}>{partner}</div>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
