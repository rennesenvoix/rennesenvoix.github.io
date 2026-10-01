import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, RotateCw, RotateCcw, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";

type Player = {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  destroy(): void;
  getIframe(): HTMLIFrameElement;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getOptions?(): string[];
  unloadModule?(module: string): void;
};
// Fonction facultative du lecteur : ne pas bloquer la lecture si YouTube la retire.
function disableCaptions(player: Player) {
  if (player.getOptions?.().includes("captions")) player.unloadModule?.("captions");
}
type PlayerEvent = { target: Player; data: number };
type Youtube = { Player: new (element: HTMLElement, options: Record<string, unknown>) => Player };
const youtubeWindow = window as typeof window & { YT?: Youtube; onYouTubeIframeAPIReady?: () => void };
let apiPromise: Promise<Youtube> | undefined;
function loadApi() {
  if (youtubeWindow.YT?.Player) return Promise.resolve(youtubeWindow.YT);
  if (!apiPromise) apiPromise = new Promise<Youtube>((resolve, reject) => {
    const previous = youtubeWindow.onYouTubeIframeAPIReady;
    youtubeWindow.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(youtubeWindow.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => { apiPromise = undefined; script.remove(); reject(new Error("YouTube indisponible")); };
    document.head.append(script);
  });
  return apiPromise;
}

// Couper les autres lecteurs avant d'activer le son du lecteur choisi.
const players = new Map<Player, () => void>();

export function VideoAccueil({ videoId, year, credit, creditUrl, portrait = false, autoplay = true, matchDesktopHeight = false, fullscreen = false }: {
  videoId: string; year: string; credit: string; creditUrl?: string; portrait?: boolean; autoplay?: boolean; matchDesktopHeight?: boolean; fullscreen?: boolean;
}) {
  const figure = useRef<HTMLElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const update = () => setIsFullscreen(document.fullscreenElement === figure.current);
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  const toggleFullscreen = async () => {
    setFullscreenError(false);
    try {
      if (document.fullscreenElement === figure.current) await document.exitFullscreen();
      else if (figure.current?.requestFullscreen) await figure.current.requestFullscreen();
      else setFullscreenError(true);
    } catch {
      setFullscreenError(true);
    }
  };

  useEffect(() => {
    const host = container.current;
    if (!host) return;
    let cancelled = false;
    let instance: Player | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      loadApi().then((api) => {
        if (cancelled) return;
        const mount = document.createElement("div");
        host.append(mount);
        instance = new api.Player(mount, {
          host: "https://www.youtube-nocookie.com",
          width: "100%", height: "100%", videoId,
          playerVars: { autoplay: autoplay ? 1 : 0, mute: 1, controls: 0, cc_load_policy: 0, disablekb: 1, playsinline: 1, rel: 0, loop: 1, playlist: videoId, origin: window.location.origin },
          events: {
            onReady: ({ target }: PlayerEvent) => {
              if (cancelled) return;
              player.current = target;
              players.set(target, () => { target.mute(); setMuted(true); });
              const iframe = target.getIframe();
              iframe.title = `Vidéo récapitulative de Rennes en Voix ${year}`;
              iframe.tabIndex = -1;
              target.mute();
              disableCaptions(target);
              setReady(true);
              if (autoplay) target.playVideo();
            },
            onStateChange: ({ data, target }: PlayerEvent) => {
              if (cancelled) return;
              setPlaying(data === 1);
              if (data === 1) disableCaptions(target);
            },
            onApiChange: ({ target }: PlayerEvent) => { if (!cancelled) disableCaptions(target); },
            onAutoplayBlocked: () => { if (!cancelled) setPlaying(false); },
            onError: () => { if (!cancelled) { setFailed(true); setReady(false); } },
          },
        });
      }).catch(() => { if (!cancelled) setFailed(true); });
    }, { threshold: 0.2 });
    observer.observe(host);
    return () => {
      cancelled = true;
      observer.disconnect();
      if (instance) { players.delete(instance); instance.destroy(); }
      player.current = null;
      host.replaceChildren();
    };
  }, [videoId, year, autoplay]);

  const toggleMute = () => {
    const current = player.current;
    if (!current) return;
    if (muted) {
      players.forEach((mute, other) => { if (other !== current) mute(); });
      current.unMute();
    } else current.mute();
    setMuted(!muted);
  };
  const buttonClass = "video-control inline-flex h-11 min-w-0 items-center justify-center rounded-md text-festival-purple/80 transition-colors hover:bg-festival-purple/10 hover:text-festival-purple active:bg-festival-purple/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-festival-purple disabled:cursor-wait disabled:opacity-35";
  return (
    <figure ref={figure} data-portrait={portrait} className="festival-video relative w-full lg:pr-5">
      <div ref={container} data-video-frame className={`${portrait ? "aspect-[9/16]" : "aspect-video"} ${matchDesktopHeight ? "lg:mx-auto lg:h-[var(--festival-video-height)] lg:w-auto" : ""} overflow-hidden rounded-2xl border border-white/70 bg-black shadow-lg [&_iframe]:pointer-events-none [&_iframe]:h-full [&_iframe]:w-full`} />
      <figcaption className="mt-1.5 text-right text-[11px] text-foreground/50 lg:absolute lg:right-0 lg:top-1 lg:mt-0 lg:whitespace-nowrap lg:[writing-mode:vertical-rl]">Vidéo © {creditUrl ? <a href={creditUrl} target="_blank" rel="noreferrer noopener" className="underline underline-offset-2 hover:text-foreground/80">{credit}</a> : credit}</figcaption>
      <div role="group" aria-label={`Commandes de la vidéo ${year}`} className={`video-controls mx-auto mt-3 grid w-full max-w-[320px] gap-0.5 rounded-lg border border-festival-purple/15 bg-festival-purple/5 p-0.5 ${fullscreen ? "grid-cols-6" : "grid-cols-5"}`}>
        <button type="button" disabled={!ready} onClick={() => player.current?.seekTo(0, true)} className={buttonClass} aria-label={`Revenir au début de la vidéo ${year}`} title="Retour au début">
          <SkipBack size={16} />
        </button>
        <button type="button" disabled={!ready} onClick={() => {
          const current = player.current;
          if (current) current.seekTo(Math.max(0, current.getCurrentTime() - 5), true);
        }} className={buttonClass} aria-label={`Reculer de 5 secondes dans la vidéo ${year}`} title="Reculer de 5 secondes">
          <span className="relative flex h-6 w-6 items-center justify-center"><RotateCcw size={23} /><span className="absolute text-[8px] font-bold">5</span></span>
        </button>
        <button type="button" disabled={!ready} onClick={() => playing ? player.current?.pauseVideo() : player.current?.playVideo()} className={buttonClass} aria-label={`${playing ? "Mettre en pause" : "Lire"} la vidéo ${year}`} title={playing ? "Pause" : "Lecture"}>
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button type="button" disabled={!ready} onClick={() => {
          const current = player.current;
          if (current) current.seekTo(Math.min(current.getCurrentTime() + 5, current.getDuration()), true);
        }} className={buttonClass} aria-label={`Avancer de 5 secondes dans la vidéo ${year}`} title="Avancer de 5 secondes">
          <span className="relative flex h-6 w-6 items-center justify-center"><RotateCw size={23} /><span className="absolute text-[8px] font-bold">5</span></span>
        </button>
        <button type="button" disabled={!ready} onClick={toggleMute} className={buttonClass} aria-label={`${muted ? "Activer" : "Couper"} le son de la vidéo ${year}`} aria-pressed={!muted} title={muted ? "Activer le son" : "Couper le son"}>
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        {fullscreen && <button type="button" disabled={!ready} onClick={toggleFullscreen} className={buttonClass} aria-label={isFullscreen ? "Quitter le plein écran" : `Afficher la vidéo ${year} en plein écran`} title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}>
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>}
      </div>
      {fullscreenError && <p role="status" className="mt-2 text-sm">Le plein écran n’est pas disponible dans ce navigateur. <a className="underline" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer noopener">Ouvrir sur YouTube</a></p>}
      {failed && <p className="mt-2 text-sm">Vidéo indisponible. <a className="underline" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer noopener">Voir sur YouTube</a></p>}
    </figure>
  );
}
