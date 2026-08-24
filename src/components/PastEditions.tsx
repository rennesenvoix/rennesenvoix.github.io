import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import edition2025a from "@/assets/edition-2025-1.jpg";
import edition2025b from "@/assets/edition-2025-2.jpg";
import edition2024a from "@/assets/edition-2024-1.jpg";
import edition2024b from "@/assets/edition-2024-2.jpg";

type PastEdition = {
  year: string;
  title: string;
  description: string;
  accent: string;
  photos: { src: string; alt: string }[];
};

const pastEditions: PastEdition[] = [
  {
    year: "2025",
    title: "Édition 2025",
    description:
      "Trois ensembles a cappella dans l'orangerie et une veillée vocale dans le parc du château.",
    accent: "bg-festival-purple",
    photos: [
      { src: edition2025a, alt: "Ensemble vocal a cappella chantant dans l'orangerie du château, édition 2025" },
      { src: edition2025b, alt: "Concert en plein air dans le parc du château à la tombée de la nuit, édition 2025" },
    ],
  },
  {
    year: "2024",
    title: "Édition 2024",
    description:
      "Une première soirée de polyphonies suivie d'un moment convivial autour de la petite restauration.",
    accent: "bg-festival-red",
    photos: [
      { src: edition2024a, alt: "Public applaudissant dans l'orangerie du château, édition 2024" },
      { src: edition2024b, alt: "Stand de petite restauration en soirée pendant le festival, édition 2024" },
    ],
  },
];

export const PastEditions = () => {
  return (
    <div className="mt-20">
      <h3 className="font-display text-2xl font-bold md:text-3xl">Les éditions passées</h3>
      <p className="mt-3 max-w-2xl text-foreground/70">
        Retour en images sur les précédentes éditions du festival.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {pastEditions.map((edition) => (
          <article key={edition.year} className="rounded-2xl border border-black/10 p-5 md:p-6">
            <div className="flex items-center gap-3">
              <span className={`h-2 w-10 rounded-full ${edition.accent}`} aria-hidden="true" />
              <h4 className="font-display text-lg font-bold">{edition.title}</h4>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">{edition.description}</p>

            <Carousel className="mt-5" opts={{ loop: true }}>
              <CarouselContent>
                {edition.photos.map((photo) => (
                  <CarouselItem key={photo.src}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      width={1280}
                      height={854}
                      className="aspect-[3/2] w-full rounded-xl object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 border-black/10 bg-white/90" />
              <CarouselNext className="right-3 border-black/10 bg-white/90" />
            </Carousel>
          </article>
        ))}
      </div>
    </div>
  );
};
