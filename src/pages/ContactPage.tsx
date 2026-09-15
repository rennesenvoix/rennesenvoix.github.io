import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CopyButton } from "@/components/CopyButton";
import { Footprints, MapPin, UtensilsCrossed } from "lucide-react";
import brushHero1 from "@/assets/brush-hero1.png";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
        <img
          src={brushHero1}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="container-wide relative py-10 md:py-8">
          <span className="mb-4 block h-2 w-24 rounded-full bg-festival-red" aria-hidden="true" />
          <h1 className="text-headline">Infos</h1>

          {/* Coordonnées, informations pratiques et localisation du festival. */}
          <div className="mt-6 grid gap-y-6 md:grid-cols-2 md:gap-x-12 md:gap-y-5">
            <div className="flex gap-4 md:col-start-1 md:row-start-1">
              <Footprints className="mt-1 shrink-0 text-festival-purple" size={24} aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl font-bold">Accès</h2>
                <p className="mt-2 text-foreground/80">
                  Entrée libre, sortie au chapeau
                  <br />
                  Parking dans le village
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:col-start-1 md:row-start-2">
              <MapPin className="mt-1 shrink-0 text-festival-blue" size={24} aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl font-bold">Adresse</h2>
                <div className="mt-2 flex items-start gap-2">
                  <p className="text-foreground/80">
                    10 Rue du Pont
                    <br />
                    25440 Rennes-sur-Loue
                  </p>
                  <CopyButton
                    value="10 Rue du Pont, 25440 Rennes-sur-Loue"
                    label="Copier l’adresse du festival"
                    successMessage="Adresse du festival copiée !"
                  />
                </div>
              </div>
            </div>

            <div className="min-h-72 overflow-hidden rounded-2xl border border-border md:col-start-2 md:row-span-3 md:row-start-1">
              <iframe
                title="Carte Google Maps de Rennes en Voix"
                src="https://www.google.com/maps?q=47.013333%2C5.853583&z=17&output=embed"
                loading="lazy"
                className="h-full min-h-72 w-full"
              />
            </div>

            <div className="flex gap-4 md:col-start-1 md:row-start-3">
              <UtensilsCrossed className="mt-1 shrink-0 text-festival-green" size={24} aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl font-bold">Petite restauration</h2>
                <p className="mt-2 text-foreground/80">Avant, pendant et après les concerts</p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
