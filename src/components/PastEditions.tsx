import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PastEdition = {
  year: string;
  groups: { id: string; name: string; src: string; alt: string; tabColor: string }[];
};

const pastEditions: PastEdition[] = [
  {
    year: "2025",
    groups: [
      { id: "2025-1", name: "Groupe 1", src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=900&auto=format&fit=crop", alt: "Concert vocal de l'édition 2025", tabColor: "data-[state=active]:bg-festival-blue data-[state=active]:text-white" },
      { id: "2025-2", name: "Groupe 2", src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&auto=format&fit=crop", alt: "Chanteuse pendant l'édition 2025", tabColor: "data-[state=active]:bg-festival-red data-[state=active]:text-white" },
      { id: "2025-3", name: "Groupe 3", src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop", alt: "Concert en plein air de l'édition 2025", tabColor: "data-[state=active]:bg-festival-purple data-[state=active]:text-white" },
    ],
  },
  {
    year: "2024",
    groups: [
      { id: "2024-1", name: "Groupe 1", src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=900&auto=format&fit=crop", alt: "Concert vocal de l'édition 2024", tabColor: "data-[state=active]:bg-festival-blue data-[state=active]:text-white" },
      { id: "2024-2", name: "Groupe 2", src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&auto=format&fit=crop", alt: "Chanteuse pendant l'édition 2024", tabColor: "data-[state=active]:bg-festival-red data-[state=active]:text-white" },
      { id: "2024-3", name: "Groupe 3", src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop", alt: "Concert en plein air de l'édition 2024", tabColor: "data-[state=active]:bg-festival-purple data-[state=active]:text-white" },
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
            <Tabs defaultValue={edition.groups[0].id}>
              <TabsList className="grid h-auto w-full grid-cols-3 gap-1 rounded-xl bg-muted p-1">
                {edition.groups.map((group) => (
                  <TabsTrigger key={group.id} value={group.id} className={`min-h-11 px-2 text-xs sm:text-sm ${group.tabColor}`}>
                    {group.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {edition.groups.map((group) => (
                <TabsContent key={group.id} value={group.id} className="mt-5">
                  <img src={group.src} alt={group.alt} loading="lazy" className="aspect-[3/2] w-full rounded-xl object-cover" />
                </TabsContent>
              ))}
            </Tabs>
          </article>
        ))}
      </div>
    </div>
  );
};
