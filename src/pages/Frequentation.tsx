import { useEffect } from "react";
import { BonhommeDecoratif } from "@/components/BonhommeDecoratif";
import brushHero1 from "@/assets/brush-hero1.png";
import { CarteFrequentation } from "@/components/CarteFrequentation";
import { PiedDePage } from "@/components/PiedDePage";
import { Entete } from "@/components/Entete";

const departmentAttendance = [
  ["Doubs", 181],
  ["Jura", 62],
  ["Haute-Saône", 4],
] as const;
const otherDepartmentsTotal = 53;
const totalVisitors = 300;
const percent = (visitors: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format((visitors / totalVisitors) * 100);

const Frequentation = () => {
  useEffect(() => {
    const existing = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previous = existing?.getAttribute("content");
    const meta = existing ?? document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    if (!existing) document.head.appendChild(meta);
    return () => {
      if (!existing) meta.remove();
      else if (previous === null) meta.removeAttribute("content");
      else if (previous !== undefined) meta.content = previous;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
    <Entete />
    <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
      <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="container-wide relative py-20 md:py-28">
        <span className="mb-8 block h-2 w-24 rounded-full bg-festival-blue" aria-hidden="true" />
        <div className="flex items-center justify-between gap-6">
              <h1 className="text-headline">D’où viennent nos festivaliers ?</h1>
              <BonhommeDecoratif emplacement={2} miroir />
            </div>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/80">
          Cette carte de Franche-Comté met en lumière les codes postaux représentés parmi l’ensemble des {totalVisitors} visiteurs recensés.
        </p>

        <section className="mx-auto mt-14 max-w-5xl rounded-2xl border border-border bg-card/90 p-4 shadow-lg sm:p-8" aria-labelledby="map-title">
          <div>
            <div>
              <h2 id="map-title" className="font-display text-2xl font-bold">Fréquentation par codes postaux et départements en 2026</h2>
            </div>
          </div>

          <div className="attendance-map-layout mt-5">
            <div className="attendance-map-panel relative overflow-hidden rounded-xl">
              <CarteFrequentation />
            </div>
            <aside className="attendance-map-legend rounded-xl border border-border bg-background/70 p-4" aria-label="Légende de la carte">
              <p className="text-label">Légende</p>
              <div className="mt-3 space-y-2 text-xs">
                <p className="flex items-center gap-2"><svg className="h-3 w-8 shrink-0" viewBox="0 0 32 12" aria-hidden="true"><path d="M1 6H31" stroke="hsl(145 63% 35%)" strokeWidth="2.4" strokeLinecap="round" /></svg> CC Loue-Lison</p>
                <p className="flex items-center gap-2"><svg className="h-3 w-8 shrink-0" viewBox="0 0 32 12" aria-hidden="true"><path d="M1 6H31" stroke="hsl(205 85% 40%)" strokeWidth="2.4" strokeLinecap="round" /></svg> CC du Val d’Amour</p>
                <p className="flex items-center gap-2"><span className="relative h-4 w-4 shrink-0 rounded-full border-[3px] border-white bg-festival-red shadow-sm" aria-hidden="true"><span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" /></span> Rennes-sur-Loue</p>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-label">Répartition par département</p>
                <ul className="mt-3 space-y-1.5 text-xs leading-snug">
                  {departmentAttendance.map(([department, visitors]) => (
                    <li key={department} className="flex items-baseline justify-between gap-2">
                      <span>{department}</span>
                      <span className="shrink-0 font-bold">{percent(visitors)} %</span>
                    </li>
                  ))}
                  <li className="flex items-baseline justify-between gap-2 border-t border-border pt-1.5">
                    <span>Autres (Bourgogne, Auvergne-Rhône-Alpes, Île-de-France, Grand Est, Suisse ... )</span>
                    <span className="shrink-0 font-bold">{percent(otherDepartmentsTotal)} %</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <div className="mt-5 border-t border-border pt-4 text-center text-xs text-foreground/70">
            <p className="font-semibold text-foreground/75">Sources de données</p>
            <p className="mt-1">
              Codes postaux : <a className="underline underline-offset-2 hover:text-foreground" href="https://www.data.gouv.fr/datasets/codes-postaux-de-france-metropolitaine" target="_blank" rel="noreferrer">fond de carte ouvert</a>
              <span className="mx-2" aria-hidden="true">·</span>
              Limites administratives : <a className="underline underline-offset-2 hover:text-foreground" href="https://www.data.gouv.fr/dataservices/api-decoupage-administratif-api-geo" target="_blank" rel="noreferrer">API Géo</a>
              <span className="mx-2" aria-hidden="true">·</span>
              Fréquentation : données Rennes en Voix
            </p>
          </div>
        </section>
      </div>

      </main>
    <PiedDePage />
    </div>
  );
};

export default Frequentation;
