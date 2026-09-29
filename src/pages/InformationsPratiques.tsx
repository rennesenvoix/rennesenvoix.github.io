import { PiedDePage } from "@/components/PiedDePage";
import { Entete } from "@/components/Entete";
import { BoutonCopier } from "@/components/BoutonCopier";
import { Car, CircleHelp, MapPin } from "lucide-react";
import brushHero1 from "@/assets/brush-hero1.png";

const InformationsPratiques = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Entete />

      <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
        <img
          src={brushHero1}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="container-wide relative py-10 md:py-8">
          <span className="mb-4 block h-2 w-24 rounded-full bg-festival-red" aria-hidden="true" />
          <h1 className="text-headline">Infos Pratiques</h1>

          {/* Informations pratiques et localisation du festival. */}
          <div className="mt-6 space-y-6">
            <section className="rounded-2xl border border-festival-purple/25 bg-background/80 p-5 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <CircleHelp className="shrink-0 text-festival-purple" size={24} aria-hidden="true" />
                <h2 className="font-display text-xl font-bold">Sur place</h2>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl bg-festival-purple/10 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-festival-purple">Accès</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                    <li>Entrée libre</li>
                    <li>Sortie au chapeau</li>
                    <li>De 18 h à minuit</li>
                  </ul>
                </div>

                <div className="rounded-xl bg-festival-green/10 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/80">À boire et à manger</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                    <li>Petite restauration locale</li>
                    <li>Glaces et gaufres artisanales</li>
                    <li>Buvette</li>
                  </ul>
                </div>

                <div className="rounded-xl bg-festival-blue/10 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-festival-blue">Pratique</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                    <li>Carte bancaire et espèces</li>
                    <li>Toilettes sèches</li>
                    <li>Animaux acceptés en laisse</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] lg:items-stretch">
              <div className="order-2 min-h-72 overflow-hidden rounded-2xl border border-border bg-background shadow-sm lg:order-1 lg:min-h-0">
                <iframe
                  title="Carte Google Maps de Rennes en Voix"
                  src="https://www.google.com/maps?q=47.013333%2C5.853583&z=17&output=embed"
                  loading="lazy"
                  className="h-full min-h-72 w-full"
                />
              </div>

              <div className="order-1 space-y-6 lg:order-2">
                <section className="rounded-2xl border border-festival-orange/30 bg-background/80 p-5 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <Car className="shrink-0 text-festival-orange" size={24} aria-hidden="true" />
                    <h2 className="font-display text-xl font-bold">Venir au festival</h2>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/80 marker:text-festival-orange">
                    <li>Parking dans le village</li>
                    <li><strong className="font-semibold text-foreground">Gare de Mouchard</strong> · 4 minutes</li>
                    <li><strong className="font-semibold text-foreground">Arbois</strong> · 15 minutes</li>
                    <li><strong className="font-semibold text-foreground">Besançon</strong> · 30 minutes</li>
                    <li><strong className="font-semibold text-foreground">Dole</strong> · 40 minutes</li>
                  </ul>
                </section>

                <section className="rounded-2xl border border-festival-blue/30 bg-background/80 p-5 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="shrink-0 text-festival-blue" size={24} aria-hidden="true" />
                    <h2 className="font-display text-xl font-bold">Adresse</h2>
                  </div>
                  <div className="mt-4 flex items-start gap-2">
                    <p className="text-foreground/80">10 rue du Pont<br />25440 Rennes-sur-Loue</p>
                    <BoutonCopier value="10 rue du Pont, 25440 Rennes-sur-Loue" label="Copier l’adresse du festival" successMessage="Adresse du festival copiée !" />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PiedDePage />
    </div>
  );
};

export default InformationsPratiques;
