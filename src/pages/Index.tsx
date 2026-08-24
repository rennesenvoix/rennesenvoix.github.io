import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PastEditions } from "@/components/PastEditions";
import { MapPin, CalendarDays, UtensilsCrossed, Mail, Ticket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import groupeColore from "@/assets/groupe-coloré.png";
import brushHero1 from "@/assets/brush-hero1.png";

const groups = [
  {
    id: "groupe-1",
    name: "Ensemble 1",
    style: "Polyphonies du monde",
    description: "Un répertoire de chants traditionnels revisités en harmonie a cappella.",
    photo: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&auto=format&fit=crop",
    alt: "Chanteurs réunis sur scène pendant un concert",
    tabColor: "data-[state=active]:bg-festival-blue data-[state=active]:text-white",
  },
  {
    id: "groupe-2",
    name: "Ensemble 2",
    style: "Voix contemporaines",
    description: "Des voix qui se répondent dans un programme vivant, libre et généreux.",
    photo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&auto=format&fit=crop",
    alt: "Chanteuse interprétant un morceau devant un public",
    tabColor: "data-[state=active]:bg-festival-red data-[state=active]:text-white",
  },
  {
    id: "groupe-3",
    name: "Ensemble 3",
    style: "Création vocale",
    description: "Une proposition professionnelle pour clôturer le festival avec intensité.",
    photo: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop",
    alt: "Groupe de musique se produisant en plein air",
    tabColor: "data-[state=active]:bg-festival-purple data-[state=active]:text-white",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO */}
        <section id="accueil" className="relative overflow-hidden">
          <img
            src={groupeColore}
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
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
        <section id="programmation" className="relative overflow-hidden">
          <img
            src={brushHero1}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
          />
          <div className="container-wide relative py-20 md:py-28">
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

            <Tabs defaultValue={groups[0].id} className="mt-12">
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 rounded-xl bg-muted p-1">
              {groups.map((group) => (
                <TabsTrigger key={group.id} value={group.id} className={`min-h-12 px-2 text-xs sm:text-sm ${group.tabColor}`}>
                  {group.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {groups.map((group) => (
              <TabsContent key={group.id} value={group.id} className="mt-6">
                <article className="grid overflow-hidden rounded-2xl bg-festival-blue text-white md:grid-cols-2">
                  <img src={group.photo} alt={group.alt} loading="lazy" className="h-64 w-full object-cover md:h-full" />
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/80">Samedi 03 juillet 2027 · Orangerie du château</p>
                    <h3 className="mt-4 font-display text-3xl font-bold">{group.name}</h3>
                    <p className="mt-2 text-lg font-semibold text-white/90">{group.style}</p>
                    <p className="mt-4 leading-relaxed text-white/85">{group.description}</p>
                  </div>
                </article>
              </TabsContent>
            ))}
            </Tabs>
          </div>
        </section>

        {/* ÉDITIONS PASSÉES / GALERIE PHOTO */}
        <section id="editions" className="relative overflow-hidden">
          <img
            src={brushHero1}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
          />
          <div className="container-wide relative py-20 md:py-28">
            <span className="mb-8 block h-2 w-24 rounded-full bg-festival-red" aria-hidden="true" />
            <h2 className="text-headline">Éditions passées</h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-foreground/80">
              Retrouvez les souvenirs et la galerie photo des éditions précédentes.
            </p>

            <PastEditions />
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
                title="Carte Google Maps de l'orangerie du château de Rennes-sur-Loue"
                src="https://www.google.com/maps?q=47.013333%2C5.853583&z=17&output=embed"
                loading="lazy"
                className="h-72 w-full md:h-full"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
};

export default Index;