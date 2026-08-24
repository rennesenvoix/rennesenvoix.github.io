import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, CalendarDays, UtensilsCrossed, Mail, Ticket, X } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
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
    accent: "bg-festival-blue",
  },
  {
    id: "groupe-2",
    name: "Ensemble 2",
    style: "Voix contemporaines",
    description: "Des voix qui se répondent dans un programme vivant, libre et généreux.",
    photo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&auto=format&fit=crop",
    alt: "Chanteuse interprétant un morceau devant un public",
    tabColor: "data-[state=active]:bg-festival-red data-[state=active]:text-white",
    accent: "bg-festival-red",
  },
  {
    id: "groupe-3",
    name: "Ensemble 3",
    style: "Création vocale",
    description: "Une proposition professionnelle pour clôturer le festival avec intensité.",
    photo: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop",
    alt: "Groupe de musique se produisant en plein air",
    tabColor: "data-[state=active]:bg-festival-purple data-[state=active]:text-white",
    accent: "bg-festival-purple",
  },
];

const festivalImages = [
  {
    src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&auto=format&fit=crop",
    alt: "Ensemble vocal réuni sur scène",
    caption: "Les voix réunies",
  },
  {
    src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&auto=format&fit=crop",
    alt: "Artiste chantant devant le public",
    caption: "Chanter ensemble",
  },
  {
    src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop",
    alt: "Concert en plein air au festival",
    caption: "La musique au grand air",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop",
    alt: "Public réuni devant une scène de festival",
    caption: "Un public à l’unisson",
  },
  {
    src: "https://images.unsplash.com/photo-1501281668745-f7f66f4a8c66?w=1200&auto=format&fit=crop",
    alt: "Micro sur scène pendant un concert",
    caption: "Au cœur du concert",
  },
  {
    src: "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?w=1200&auto=format&fit=crop",
    alt: "Musiciens et chanteurs sur une scène",
    caption: "Les rencontres musicales",
  },
  {
    src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&auto=format&fit=crop",
    alt: "Spectateurs profitant d’un concert",
    caption: "Partager le moment",
  },
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop",
    alt: "Scène éclairée pendant une représentation",
    caption: "La scène en lumière",
  },
  {
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&auto=format&fit=crop",
    alt: "Artiste en concert devant une foule",
    caption: "Vibrations collectives",
  },
  {
    src: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&auto=format&fit=crop",
    alt: "Concert en soirée devant le public",
    caption: "Quand la nuit chante",
  },
  {
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&auto=format&fit=crop",
    alt: "Scène de concert vue depuis le public",
    caption: "Au rythme des voix",
  },
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&auto=format&fit=crop",
    alt: "Chanteur sur scène sous les projecteurs",
    caption: "Une voix en lumière",
  },
  {
    src: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=1200&auto=format&fit=crop",
    alt: "Public attentif pendant une représentation musicale",
    caption: "L’écoute partagée",
  },
  {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop",
    alt: "Foule réunie lors d’un événement musical",
    caption: "Une énergie commune",
  },
  {
    src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&auto=format&fit=crop",
    alt: "Artiste accompagné par des lumières de scène",
    caption: "Le spectacle vivant",
  },
  {
    src: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&auto=format&fit=crop",
    alt: "Scène musicale dans une ambiance chaleureuse",
    caption: "Des souvenirs en musique",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop",
    alt: "Concert extérieur devant un public",
    caption: "Le festival en plein air",
  },
];

const firstGalleryImages = festivalImages.slice(0, 6);
const secondGalleryImages = festivalImages.slice(6, 12);
const thirdGalleryImages = festivalImages.slice(12);

const GalleryCarousel = ({
  images,
  delay,
  title,
  reverse = false,
  onImageClick,
}: {
  images: typeof festivalImages;
  delay: number;
  title: string;
  reverse?: boolean;
  onImageClick: (image: (typeof festivalImages)[number]) => void;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api || isPaused) return;

    const interval = window.setInterval(() => {
      if (reverse) {
        api.scrollPrev();
      } else {
        api.scrollNext();
      }
    }, delay);
    return () => window.clearInterval(interval);
  }, [api, delay, isPaused, reverse]);

  return (
    <div className="mt-10">
      <h3 className="mb-4 font-display text-xl font-bold md:text-2xl">{title}</h3>
      <Carousel
        opts={{ loop: true, duration: 40 }}
        setApi={setApi}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.src} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
              <figure className="group relative overflow-hidden rounded-2xl bg-card">
                <button type="button" onClick={() => onImageClick(image)} className="block w-full cursor-zoom-in">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
                <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wider text-white">
                  © Noé Michaud - Arche production
                </span>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 border-black/10 bg-white/90" />
        <CarouselNext className="right-3 border-black/10 bg-white/90" />
      </Carousel>
    </div>
  );
};

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<(typeof festivalImages)[number] | null>(null);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

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

            <div className="mt-12 space-y-5">
              {groups.map((group) => (
                <article
                  key={group.id}
                  className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-[1fr_1.35fr]"
                >
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <span className={`mb-5 block h-2 w-16 rounded-full ${group.accent}`} aria-hidden="true" />
                    <h3 className="font-display text-2xl font-bold md:text-3xl">{group.name}</h3>
                    <p className="mt-2 text-lg font-semibold text-foreground/80">{group.style}</p>
                    <p className="mt-4 max-w-xl leading-relaxed text-foreground/75">{group.description}</p>
                    <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold uppercase tracking-wider">
                      <a href="mailto:rennesenvoix@gmail.com?subject=Renseignements%20sur%20le%20groupe" className="link-underline text-festival-orange">
                        Réserver
                      </a>
                      <a href="https://www.instagram.com" target="_blank" rel="noreferrer noopener" className="link-underline text-foreground/70">
                        Instagram
                      </a>
                    </div>
                  </div>
                  <img src={group.photo} alt={group.alt} loading="lazy" className="order-first h-64 w-full object-cover md:order-none md:h-full" />
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* LE FESTIVAL EN IMAGE */}
        <section id="galerie" className="container-wide py-20 md:py-28">
          <span className="mb-8 block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
          <h2 className="text-headline">Le festival en image</h2>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-foreground/80">
            Quelques instants de musique, de partage et de convivialité.
          </p>

          <GalleryCarousel images={firstGalleryImages} delay={3000} title="Les voix réunies" onImageClick={setSelectedImage} />
          <GalleryCarousel images={secondGalleryImages} delay={3500} title="Les instants du festival" reverse onImageClick={setSelectedImage} />
          <GalleryCarousel images={thirdGalleryImages} delay={4000} title="La musique au grand air" onImageClick={setSelectedImage} />
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

      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo agrandie"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            aria-label="Fermer la photo agrandie"
            className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-2 text-xl font-bold text-black"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[90vh] max-w-[95vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      <Footer />

    </div>
  );
};

export default Index;