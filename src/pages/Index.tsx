import { useEffect, useRef } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import groupeColore from "@/assets/groupe-coloré.png";
import titleLogo from "@/assets/Titre ReV.png";
import { Link } from "react-router-dom";

// Compte à rebours temporairement désactivé — à réactiver pour la prochaine édition.
// import { useEffect, useState } from "react";
// const festivalDate = new Date("2027-07-03T18:00:00+02:00");
const partners = [
  "Communauté de Communes Loue-Lison",
  "Commune de\nRennes sur Loue",
  "Au Golden Gourmand",
  "Intermarché\nQuingey",
  "Coop Bio Val de Loue",
  "Vous !",
  "et bien d'autres...",
  "Les propriétaires des lieux",
  "Aux Petits Pépins",
  "Atomix",
  "APE – Liesle et Quingey",
  "La Bonne Cave",
  "Boucherie\nFabien Humbert",
  "Crédit Agricole\nQuingey",
  "Fruitière du Val de Loue",
  "GAEC des Prés de Rennes",
  "Gamm Vert\nLiesle",
  "Terre Comtoise",
  "Saline royale\nd’Arc et Senans",
];
const partnerTags = [
  { color: "bg-festival-blue", text: "text-white", rotation: "-rotate-2" },
  { color: "bg-festival-orange", text: "text-black", rotation: "rotate-1" },
  { color: "bg-festival-purple", text: "text-white", rotation: "-rotate-1" },
  { color: "bg-festival-green", text: "text-black", rotation: "rotate-2" },
  { color: "bg-festival-red", text: "text-white", rotation: "-rotate-3" },
] as const;

const FestivalTag = ({ color, rotation }: { color: string; rotation: string }) => (
  <span aria-hidden="true" className={`pointer-events-none absolute h-16 w-[86%] rounded-lg border-2 border-black/80 shadow-md ${color} ${rotation}`}>
    <span className="absolute -left-1.5 top-4 h-3 w-3 rounded-full bg-background" />
    <span className="absolute -left-1.5 bottom-4 h-3 w-3 rounded-full bg-background" />
    <span className="absolute left-5 top-2 bottom-2 border-l border-dashed border-black/35" />
    <span className="absolute right-3 top-3 h-2 w-2 rounded-full border border-black/30" />
  </span>
);

type PartnerNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  targetScale: number;
};

const PartnerCloud = () => {
  const cloudRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nodesRef = useRef<PartnerNode[]>([]);

  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return;

    let frameId = 0;

    const initialize = () => {
      const { width: cloudWidth, height: cloudHeight } = cloud.getBoundingClientRect();
      const itemWidth = Math.min(window.innerWidth < 640 ? 150 : 190, cloudWidth * (window.innerWidth < 640 ? 0.46 : 0.2));
      const itemHeight = 96;
      const columns = Math.ceil(Math.sqrt(partners.length * (cloudWidth / cloudHeight)));

      nodesRef.current = partners.map((_, index) => ({
        x: Math.min(cloudWidth - itemWidth, 12 + (index % columns) * ((cloudWidth - itemWidth - 24) / Math.max(1, columns - 1))),
        y: Math.min(cloudHeight - itemHeight, 12 + Math.floor(index / columns) * (itemHeight + 22)),
        vx: ((index * 13) % 35 - 17) / 22,
        vy: ((index * 19) % 31 - 15) / 24,
        width: itemWidth,
        height: itemHeight,
        rotation: ((index * 7) % 9) - 4,
        scale: 1,
        targetScale: 1,
      }));
    };

    const animate = () => {
      const { width: cloudWidth, height: cloudHeight } = cloud.getBoundingClientRect();
      const nodes = nodesRef.current;

      nodes.forEach((node) => {
        node.scale += (node.targetScale - node.scale) * 0.16;
        node.x += node.vx;
        node.y += node.vy;

        const renderedWidth = node.width * node.scale;
        const renderedHeight = node.height * node.scale;
        if (node.x <= 0 || node.x + renderedWidth >= cloudWidth) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(node.x, cloudWidth - renderedWidth));
        }
        if (node.y <= 0 || node.y + renderedHeight >= cloudHeight) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(node.y, cloudHeight - renderedHeight));
        }
      });

      for (let firstIndex = 0; firstIndex < nodes.length; firstIndex += 1) {
        for (let secondIndex = firstIndex + 1; secondIndex < nodes.length; secondIndex += 1) {
          const first = nodes[firstIndex];
          const second = nodes[secondIndex];
          const dx = second.x + second.width / 2 - (first.x + first.width / 2);
          const dy = second.y + second.height / 2 - (first.y + first.height / 2);
          const distance = Math.hypot(dx, dy) || 1;
          const minimumDistance = (first.width * first.scale + second.width * second.scale) * 0.44;

          if (distance < minimumDistance) {
            const normalX = dx / distance;
            const normalY = dy / distance;
            const overlap = (minimumDistance - distance) / 2;
            first.x -= normalX * overlap;
            first.y -= normalY * overlap;
            second.x += normalX * overlap;
            second.y += normalY * overlap;
            first.vx -= normalX * 0.08;
            first.vy -= normalY * 0.08;
            second.vx += normalX * 0.08;
            second.vy += normalY * 0.08;
          }
        }
      }

      nodes.forEach((node, index) => {
        const element = itemRefs.current[index];
        if (!element) return;

        element.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) rotate(${node.rotation}deg) scale(${node.scale})`;
        element.style.width = `${node.width}px`;
        element.style.height = `${node.height}px`;
      });

      frameId = window.requestAnimationFrame(animate);
    };

    initialize();
    animate();
    window.addEventListener("resize", initialize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", initialize);
    };
  }, []);

  const energizePartner = (activeIndex: number) => {
    const activeNode = nodesRef.current[activeIndex];
    if (!activeNode) return;

    activeNode.targetScale = 1.16;
    nodesRef.current.forEach((node, index) => {
      if (index === activeIndex) return;

      const dx = node.x + node.width / 2 - (activeNode.x + activeNode.width / 2);
      const dy = node.y + node.height / 2 - (activeNode.y + activeNode.height / 2);
      const distance = Math.hypot(dx, dy) || 1;
      if (distance < 240) {
        const strength = (240 - distance) / 240;
        node.vx += (dx / distance) * strength * 3;
        node.vy += (dy / distance) * strength * 3;
      }
    });
  };

  return (
    <div ref={cloudRef} className="relative h-[520px] overflow-hidden rounded-2xl border border-border/60 bg-white/40 sm:h-[440px] lg:h-[390px]" role="list" aria-label="Partenaires du festival">
      {partners.map((partner, index) => {
        const tag = partnerTags[index % partnerTags.length];

        return (
          <div
            key={partner}
            ref={(element) => { itemRefs.current[index] = element; }}
            role="listitem"
            onMouseEnter={() => energizePartner(index)}
            onMouseLeave={() => { if (nodesRef.current[index]) nodesRef.current[index].targetScale = 1; }}
            className="absolute left-0 top-0 flex items-center justify-center px-3 text-center will-change-transform"
          >
            <FestivalTag color={tag.color} rotation={tag.rotation} />
            <span className={`relative max-w-[86%] whitespace-pre-line break-words font-playful text-sm leading-[1.05] ${tag.text} sm:text-base`}>{partner}</span>
          </div>
        );
      })}
    </div>
  );
};

/* const countdownUnits = [
  { label: "jours", className: "bg-festival-blue text-white" },
  { label: "heures", className: "bg-festival-orange text-black" },
  { label: "minutes", className: "bg-festival-purple text-white" },
  { label: "secondes", className: "bg-festival-green text-black" },
] as const;
*/

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Annonce de la prochaine édition et compte à rebours. */}
        <section className="relative overflow-hidden">
          <img src={groupeColore} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10" />
          <div className="container-wide relative py-20 md:py-28">
            <h1 className="mt-5 max-w-[600px]">
              <img src={titleLogo} alt="Rennes en Voix" className="h-auto w-full" />
            </h1>
            {/*
              Compte à rebours temporairement désactivé — à réactiver pour la prochaine édition.

              <p className="mt-6 max-w-2xl font-display text-xl font-semibold md:text-2xl">Prochaine édition dans :</p>
              <div className="mt-5 grid max-w-2xl grid-cols-4 gap-3 md:gap-5" aria-label="Compte à rebours avant le festival">
                {[days, hours, minutes, seconds].map((value, index) => {
                  const unit = countdownUnits[index];

                  return (
                    <div key={unit.label} className={`rounded-xl p-4 text-center backdrop-blur-sm md:p-6 ${unit.className}`}>
                      <strong className="block font-display text-3xl md:text-5xl">{String(value).padStart(2, "0")}</strong>
                      <span className="mt-1 block text-[9px] uppercase tracking-widest opacity-80">{unit.label}</span>
                    </div>
                  );
                })}
              </div>
            */}
            <p className="mt-10 text-xl uppercase tracking-widest text-foreground/70">Le Samedi 03 juillet 2027 · à l'Orangerie de Rennes sur Loue</p>
          </div>
        </section>

        {/* Présentation de l'affiche et lien vers la programmation. */}
        <section className="container-wide py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-sm border border-border bg-card shadow-xl">
              <img src={groupeColore} alt="Affiche du festival Rennes en Voix" className="aspect-[1/1.414] w-full object-cover" />
            </div>
            <div>
              <span className="mb-8 block h-2 w-24 rounded-full bg-festival-orange" aria-hidden="true" />
              <h2 className="text-headline">L’affiche 2027</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/75">Un rendez-vous consacré aux ensembles polyphoniques, aux voix partagées et à la convivialité.</p>
              <Link to="/programmation" className="mt-8 inline-flex rounded-full bg-festival-purple px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white">Voir la programmation</Link>
            </div>
          </div>
        </section>

        {/* Mosaïque des partenaires du festival. */}
        <section className="border-y border-border bg-card/50 py-16 md:py-20">
          <div className="container-wide">
            <span className="mb-8 block h-2 w-24 rounded-full bg-festival-green" aria-hidden="true" />
            <h2 className="text-headline">Nos partenaires</h2>
            <div className="mt-12">
              <PartnerCloud />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
