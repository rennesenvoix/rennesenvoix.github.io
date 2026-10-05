import { useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import map from "@/assets/bourgogne-franche-comte-postcodes.svg?raw";

const initial = map.match(/viewBox="([^"]+)"/)![1].split(/\s+/).map(Number);
const [left, top, width, height] = initial;

export function CarteFrequentation() {
  const container = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const [view, setView] = useState({ x: left, y: top, zoom: 1 });
  const zoom = (factor: number) => setView(previous => {
    const next = Math.min(6, Math.max(1, previous.zoom * factor));
    return constrain(previous.x + width / previous.zoom / 2 - width / next / 2, previous.y + height / previous.zoom / 2 - height / next / 2, next);
  });
  function constrain(x: number, y: number, scale: number) {
    return { x: Math.max(left, Math.min(left + width - width / scale, x)), y: Math.max(top, Math.min(top + height - height / scale, y)), zoom: scale };
  }
  useEffect(() => {
    const svg = container.current?.querySelector("svg");
    svg?.setAttribute("viewBox", `${view.x} ${view.y} ${width / view.zoom} ${height / view.zoom}`);
    // Compense le zoom pour conserver la taille du repère et de son liseré.
    const marker = svg?.querySelector(".rennes-marker-outer");
    marker?.setAttribute("r", String(8 / view.zoom));
    marker?.setAttribute("stroke-width", String(3 / view.zoom));
    svg?.querySelector(".rennes-marker-center")?.setAttribute("r", String(2 / view.zoom));
  }, [view]);
  const button = "inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/95 hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-festival-purple disabled:opacity-40";
  return <>
    <div className="absolute right-3 top-3 z-10 flex gap-1" role="group" aria-label="Zoom de la carte">
      <button type="button" className={button} aria-label="Agrandir la carte" disabled={view.zoom >= 6} onClick={() => zoom(1.5)}><Plus size={18} /></button>
      <button type="button" className={button} aria-label="Réduire la carte" disabled={view.zoom <= 1} onClick={() => zoom(1 / 1.5)}><Minus size={18} /></button>
      <button type="button" className={button} aria-label="Réinitialiser la carte" onClick={() => setView({ x: left, y: top, zoom: 1 })}><RotateCcw size={18} /></button>
    </div>
    <div ref={container} role="group" aria-label="Carte de fréquentation. Contours vert : Loue-Lison ; bleu : Val d’Amour. Utilisez les boutons pour zoomer, puis faites glisser la carte ou utilisez les flèches du clavier."
      tabIndex={0}
      className="attendance-map-graphic mx-auto w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-festival-purple"
      style={{ touchAction: view.zoom > 1 ? "none" : "pan-y", cursor: view.zoom > 1 ? "grab" : "default" }}
      onPointerDown={event => {
        if (view.zoom <= 1 || event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
      }}
      onPointerMove={event => {
        const previous = drag.current;
        const matrix = container.current?.querySelector("svg")?.getScreenCTM();
        if (!previous || previous.id !== event.pointerId || !matrix) return;
        const dx = (event.clientX - previous.x) / matrix.a;
        const dy = (event.clientY - previous.y) / matrix.d;
        drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
        setView(v => constrain(v.x - dx, v.y - dy, v.zoom));
      }}
      onPointerUp={() => { drag.current = null; }}
      onPointerCancel={() => { drag.current = null; }}
      onLostPointerCapture={() => { drag.current = null; }}
      onKeyDown={event => {
        const directions: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
        const direction = directions[event.key];
        if (!direction || view.zoom <= 1) return;
        event.preventDefault();
        setView(v => constrain(v.x + direction[0] * width / v.zoom / 10, v.y + direction[1] * height / v.zoom / 10, v.zoom));
      }}
      dangerouslySetInnerHTML={{ __html: map }}
    />
  </>;
}
