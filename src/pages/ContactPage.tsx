import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CalendarDays, Mail, MapPin, UtensilsCrossed } from "lucide-react";
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
        <div className="container-wide relative py-20 md:py-28">
          <span className="mb-8 block h-2 w-24 rounded-full bg-festival-red" aria-hidden="true" />
          <h1 className="text-headline">Infos</h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-foreground/80">
            Une question sur le festival ou la programmation ? Écrivez-nous.
          </p>

          {/* Coordonnées, informations pratiques et localisation du festival. */}
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div className="flex gap-4">
                <Mail className="mt-1 shrink-0 text-festival-red" size={24} aria-hidden="true" />
                <div>
                  <h2 className="font-display text-xl font-bold">Écrivez-nous</h2>
                  <a href="mailto:rennesenvoix@gmail.com" className="mt-2 inline-block link-underline text-foreground/80">
                    rennesenvoix@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-festival-blue" size={24} aria-hidden="true" />
                <div>
                  <h2 className="font-display text-xl font-bold">Le festival</h2>
                  <p className="mt-2 text-foreground/80">
                    Orangerie du château de Rennes-sur-Loue
                    <br />
                    25440 Rennes-sur-Loue, France
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CalendarDays className="mt-1 shrink-0 text-festival-purple" size={24} aria-hidden="true" />
                <div>
                  <h2 className="font-display text-xl font-bold">Accès</h2>
                  <p className="mt-2 text-foreground/80">Entrée libre et sortie au château.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <UtensilsCrossed className="mt-1 shrink-0 text-festival-green" size={24} aria-hidden="true" />
                <div>
                  <h2 className="font-display text-xl font-bold">Restauration</h2>
                  <p className="mt-2 text-foreground/80">Petite restauration sur place.</p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/rennesenvoix"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block link-underline font-semibold text-festival-purple"
              >
                Instagram
              </a>
            </div>

            <div className="min-h-72 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Carte Google Maps de Rennes en Voix"
                src="https://www.google.com/maps?q=47.013333%2C5.853583&z=17&output=embed"
                loading="lazy"
                className="h-full min-h-72 w-full"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
