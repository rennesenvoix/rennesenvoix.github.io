import brushHero1 from "@/assets/brush-hero1.png";
import bfcPostcodeMap from "@/assets/bourgogne-franche-comte-postcodes.svg?raw";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const departmentAttendance = [
  ["Doubs", 181],
  ["Jura", 62],
  ["Côte-d’Or", 12],
  ["Rhône", 9],
  ["Haute-Saône", 4],
] as const;
const otherDepartmentsTotal = 32;
const totalVisitors = 300;
const percent = (visitors: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format((visitors / totalVisitors) * 100);

const AttendancePage = () => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapGraphic = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  const boundPan = (nextPan: { x: number; y: number }, nextZoom = zoom) => {
    const bounds = mapContainer.current?.getBoundingClientRect();
    if (!bounds || nextZoom === 1) return { x: 0, y: 0 };
    const maxX = (bounds.width * (nextZoom - 1)) / 2;
    const maxY = (bounds.height * (nextZoom - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, nextPan.x)),
      y: Math.max(-maxY, Math.min(maxY, nextPan.y)),
    };
  };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (zoom === 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
    setIsDragging(true);
  };

  const drag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    setPan(boundPan({ x: dragStart.current.panX + event.clientX - dragStart.current.x, y: dragStart.current.panY + event.clientY - dragStart.current.y }));
  };

  const stopDrag = () => {
    dragStart.current = null;
    setIsDragging(false);
  };

  const changeZoom = (amount: number) => {
    setZoom((value) => {
      const nextValue = Math.min(4, Math.max(1, Number((value + amount).toFixed(1))));
      setPan((currentPan) => boundPan(currentPan, nextValue));
      return nextValue;
    });
  };

  useEffect(() => {
    const svg = mapGraphic.current?.querySelector("svg");
    if (!svg) return;
    const setAttribute = (selector: string, attribute: string, value: number) => svg.querySelectorAll(selector).forEach((element) => element.setAttribute(attribute, String(value / zoom)));
    setAttribute(".postcode-lines", "stroke-width", 0.55);
    setAttribute(".department-border", "stroke-width", 2.4);
    setAttribute(".loue-lison-border", "stroke-width", 6);
    setAttribute(".rennes-marker-outer", "r", 8);
    setAttribute(".rennes-marker-center", "r", 2);
    setAttribute(".city-marker-outer", "r", 5);
    setAttribute(".city-marker-center", "r", 1.2);
    svg.querySelectorAll(".rennes-marker-outer").forEach((element) => element.setAttribute("stroke-width", String(3 / zoom)));
    svg.querySelectorAll(".city-marker-outer").forEach((element) => element.setAttribute("stroke-width", String(2 / zoom)));
  }, [zoom]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
    <Header />
    <main className="relative flex-1 overflow-hidden pt-16 md:pt-20">
      <img src={brushHero1} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="container-wide relative py-20 md:py-28">
        <span className="mb-8 block h-2 w-24 rounded-full bg-festival-blue" aria-hidden="true" />
        <h1 className="text-headline">D’où viennent nos festivaliers ?</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/80">
          Cette carte de Franche-Comté et de Côte-d’Or met en lumière les codes postaux représentés parmi l’ensemble des {totalVisitors} visiteurs recensés.
        </p>

        <section className="mx-auto mt-14 max-w-5xl rounded-2xl border border-border bg-card/90 p-4 shadow-lg sm:p-8" aria-labelledby="map-title">
          <div>
            <div>
              <h2 id="map-title" className="font-display text-2xl font-bold">Fréquentation par codes postaux et départements en 2026</h2>
            </div>
          </div>

          <div className="attendance-map-layout mt-5">
            <div
              className={`attendance-map-panel relative overflow-hidden rounded-xl ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
              ref={mapContainer}
              onPointerDown={startDrag}
              onPointerMove={drag}
              onPointerUp={stopDrag}
              onPointerCancel={stopDrag}
            >
              <div
                ref={mapGraphic}
                role="img"
                aria-label="Carte de la Franche-Comté et de la Côte-d’Or découpée par code postal. Les zones colorées correspondent aux codes postaux représentés."
                className={`attendance-map-graphic pointer-events-none mx-auto w-full origin-center ${isDragging ? "transition-none" : "transition-transform duration-100"}`}
                style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})` }}
                dangerouslySetInnerHTML={{ __html: bfcPostcodeMap }}
              />
              <div className="absolute right-3 top-3 flex overflow-hidden rounded-lg border border-border bg-background shadow-sm">
                <button type="button" className="grid h-9 w-9 place-items-center text-lg font-bold hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40" onPointerDown={(event) => event.stopPropagation()} onClick={() => changeZoom(-0.2)} disabled={zoom === 1} aria-label="Réduire le zoom">−</button>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.1"
                  value={zoom}
                  onPointerDown={(event) => event.stopPropagation()}
                  onChange={(event) => {
                    const nextZoom = Number(event.target.value);
                    setZoom(nextZoom);
                    setPan((currentPan) => boundPan(currentPan, nextZoom));
                  }}
                  className="mx-2 w-20"
                  style={{ accentColor: "hsl(33 100% 60%)" }}
                  aria-label="Niveau de zoom"
                />
                <button type="button" className="grid h-9 w-9 place-items-center border-l border-border text-lg font-bold hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40" onPointerDown={(event) => event.stopPropagation()} onClick={() => changeZoom(0.2)} disabled={zoom === 4} aria-label="Agrandir la carte">+</button>
              </div>
            </div>
            <aside className="attendance-map-legend rounded-xl border border-border bg-background/70 p-4" aria-label="Légende de la carte">
              <p className="text-label">Légende</p>
              <div className="mt-3 space-y-2 text-xs">
                <p className="flex items-center gap-2"><svg className="h-3 w-8 shrink-0" viewBox="0 0 32 12" aria-hidden="true"><path d="M1 6H31" stroke="hsl(145 63% 35%)" strokeWidth="5" strokeLinecap="round" /></svg> CC Loue-Lison</p>
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

          <div className="mt-5 border-t border-border pt-4 text-center text-xs text-foreground/50">
            <p className="font-semibold text-foreground/65">Sources de données</p>
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
    <Footer />
    </div>
  );
};

export default AttendancePage;
