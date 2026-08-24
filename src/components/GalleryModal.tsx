import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: string | null;
  totalImages?: number;
}

export const GalleryModal = ({
  isOpen,
  onClose,
  year,
  totalImages = 12,
}: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= totalImages ? 1 : prev + 1));
  }, [totalImages]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 1 ? totalImages : prev - 1));
  }, [totalImages]);

  // Navigation au clavier
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Réinitialiser à la première photo au changement d'année
  useEffect(() => {
    if (isOpen) setCurrentIndex(1);
  }, [year, isOpen]);

  if (!isOpen || !year) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col gap-6 rounded-2xl border border-border bg-background p-6 shadow-2xl">
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Fermer la galerie"
          className="absolute right-4 top-4 rounded-full p-2 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
        >
          <X size={24} />
        </button>

        <h3 className="font-display text-2xl font-bold">
          Édition {year} — En images
        </h3>

        {/* CARROUSEL GRAND FORMAT */}
        <div className="relative flex min-h-[320px] max-h-[50vh] w-full items-center justify-center overflow-hidden rounded-xl bg-black/90 p-2">
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Photo précédente"
            className="absolute left-3 z-10 rounded-full border border-white/20 bg-black/50 p-2 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-festival-orange hover:text-black"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={`/images/${year}/${currentIndex}.jpg`}
            alt={`Festival Rennes en Voix ${year} — Photo ${currentIndex}`}
            className="max-h-[46vh] max-w-full object-contain transition-opacity duration-200"
            onError={(e) => {
              // Image de secours si l'image n'est pas encore présente
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop";
            }}
          />

          <button
            onClick={handleNext}
            type="button"
            aria-label="Photo suivante"
            className="absolute right-3 z-10 rounded-full border border-white/20 bg-black/50 p-2 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-festival-orange hover:text-black"
          >
            <ChevronRight size={24} />
          </button>

          <span className="absolute bottom-3 right-3 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white">
            {currentIndex} / {totalImages}
          </span>
        </div>

        {/* GRILLE DE VIGNETTES */}
        <div className="grid max-h-36 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6 md:grid-cols-8">
          {Array.from({ length: totalImages }).map((_, idx) => {
            const photoNum = idx + 1;
            const isActive = photoNum === currentIndex;

            return (
              <button
                key={photoNum}
                onClick={() => setCurrentIndex(photoNum)}
                type="button"
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  isActive
                    ? "border-festival-orange ring-2 ring-festival-orange/50 opacity-100 scale-95"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={`/images/${year}/${photoNum}.jpg`}
                  alt={`Vignette ${photoNum}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop";
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};