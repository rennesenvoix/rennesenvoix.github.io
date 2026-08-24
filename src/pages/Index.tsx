import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GalleryModal } from "@/components/GalleryModal";
import { MapPin, CalendarDays, UtensilsCrossed, Mail, Ticket, Images } from "lucide-react";
import brushHero from "@/assets/brush-hero.png";

const concerts = [
  {
    date: "Samedi",
    time: "19h",
    place: "Orangerie du château",
    title: "Soirée d'ouverture",
    description: "Polyphonies et chants du monde pour lancer le festival en beauté.",
    color: "bg-festival-blue",
  },
  {
    date: "Samedi 15 août",
    time: "20h",
    place: "Orangerie du château",
    title: "Concert de chorales amateures",
    description: "Rencontre de groupes vocaux de la région, dans un esprit libre et non dirigé.",
    color: "bg-festival-red",
  },
  {
    date: "Samedi 15 août",
    time: "22h",
    place: "Parc du château",
    title: "Veillée vocale",
    description: "Chants partagés à la nuit tombée, ouverts à toutes et tous.",
    color: "bg-festival-purple",
  },
  {
    date: "Dimanche 16 août",
    time: "17h",
    place: "Orangerie du château",
    title: "Soirée vocale professionnelle",
    description: "Un ensemble invité clôture l'édition 2026 avec un répertoire exigeant.",
    color: "bg-festival-green",
  },
];

const editionsPasses = [
  { year: "2025", title: "Édition 2025", count: 12, color: "border-festival-blue" },
  { year: "2024", title: "Édition 2024", count: 12, color: "border-festival-orange" },
];

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = (year: string) => {
    setSelectedYear(year);
    setIsGalleryOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section id="accueil" className="relative overflow-hidden">
          <img
            src={brushHero}
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="container-wide relative py-20 md:py-32">
            <div className="max-w-3xl animate-fade-in-up">
              <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/80">
                SAMEDI 03 JUILLET 2027
              </p>
              <h1 className="text-display">RENNES EN VOIX</h1>
              <p className="mt-6 text-xl md:text-2xl font-display font-semibold leading-snug">
                Le festival qui fait résonner l'orangerie de Rennes-sur-Loue.
              </p>
              <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/80">
                Organisé par le comité des fêtes de Rennes-sur-Loue, Rennes en Voix est un festival dédié aux ensembles polyphoniques a cappella, amateurs et professionnels. Chaque été, les pierres de l'orangerie du château vibrent au son de répertoires variés dans un cadre chaleureux.
              </p>
              <a
                href="#programmation"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-festival-orange px-8 py-4 text-sm font-semibold uppercase tracking-widest text-black transition-transform duration-300 hover:scale-105"
              >
                Découvrir la programmation
              </a>
            </div>
          </div>
        </section>

        {/* LE FESTIVAL */}
        <section id="festival" className="container-wide py-20 md:py-28">
          <span className="mb-8 block h-2 w-24 rounded-full bg-festival-purple" aria-hidden="true" />
          <h2 className="text-headline">Le Festival</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-14">
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              Rennes en Voix met en avant les pratiques vocales non dirigées, offrant une alternative aux concerts de chorales. Porté par des partenariats locaux, le festival a pour objectif, en plus de partager le chant polyphonique, de faire vivre la culture et le patrimoine local dans un esprit de convivialité.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              Une petite restauration est proposée sur place tout au long de la soirée, permettant à chacun de venir vivre un moment convivial avant, pendant et après les concerts.
            </p>
          </div>
        </section>

        {/* PROGRAMMATION */}
        <section id="programmation" className="container-wide py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-8 block h-2 w-24 rounded-full bg-festival-blue" aria-hidden="true" />
              <h2 className="text-headline">Programmation 2026</h2>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:rennesenvoix@gmail.com?subject=Réservation%20Rennes%20en%20Voix%202026"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-festival-orange px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-black transition-transform duration-300 hover:scale-105"
              >
                <Ticket size={18} aria-hidden="true" />
                Réserver par email
              </a>
              <p className="text-xs text-foreground/60">
                Ouvre votre application de messagerie vers rennesenvoix@gmail.com
              </p>
            </div>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {concerts.map((concert) => (
              <li
                key={concert.title}
                className={`${concert.color} rounded-2xl p-7 text-white transition-transform duration-300 hover:-translate-y-1.5`}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-white/90">
                  {concert.date} · {concert.time} · {concert.place}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold text-white">{concert.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/90">{concert.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ÉDITIONS PASSÉES / GALERIE PHOTO */}
        <section id="editions" className="container-wide py-20 md:py-28">
          <span className="mb-8 block h-2 w-24 rounded-full bg-festival-red" aria-hidden="true" />
          <h2 className="text-headline">Éditions passées</h2>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-foreground/80">
            Retrouvez les souvenirs et la galerie photo des éditions précédentes.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {editionsPasses.map((item) => (
              <div
                key={item.year}
                className={`group relative overflow-hidden rounded-2xl border-2 ${item.color} bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
              >
                <h3 className="font-display text-3xl font-bold">{item.year}</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Revivez les moments forts du festival en photos.
                </p>
                <button
                  onClick={() => openGallery(item.year)}
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-festival-orange group-hover:underline"
                >
                  <Images size={18} />
                  Voir les photos ↗
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* INFOS PRATIQUES */}
        <section id="infos" className="container-wide py-20 md:py-28">
          <span className="mb-8 block h-2 w-24 rounded-full bg-festival-green" aria-hidden="true" />
          <h2 className="text-headline">Informations pratiques</h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <ul className="space-y-8">
              <li className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-festival-blue" size={24} aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg font-bold">Lieu</h3>
                  <p className="mt-1 text-foreground/80">
                    Orangerie du château de Rennes-sur-Loue
                    <br />
                    25440 Rennes-sur-Loue, France
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <CalendarDays className="mt-1 shrink-0 text-festival-purple" size={24} aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg font-bold">Accès</h3>
                  <p className="mt-1 text-foreground/80">
                    Entrée libre et sortie au château.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <UtensilsCrossed className="mt-1 shrink-0 text-festival-green" size={24} aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg font-bold">Restauration</h3>
                  <p className="mt-1 text-foreground/80">Petite restauration sur place.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 shrink-0 text-festival-red" size={24} aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg font-bold">Contact</h3>
                  <p className="mt-1 text-foreground/80">
                    <a href="mailto:rennesenvoix@gmail.com" className="link-underline">
                      rennesenvoix@gmail.com
                    </a>
                  </p>
                  <p className="mt-1 text-foreground/80">
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer noopener" className="link-underline">
                      Instagram
                    </a>
                  </p>
                </div>
              </li>
            </ul>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Carte du château de Rennes-sur-Loue"
                src="https://www.openstreetmap.org/export/embed.html?bbox=5.8%2C46.98%2C5.88%2C47.03&layer=mapnik"
                loading="lazy"
                className="h-72 w-full md:h-full"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* GALERIE MODALE */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        year={selectedYear}
      />
    </div>
  );
};

export default Index;