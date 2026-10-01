import turquoise from "@/assets/bonhommes/cheveux-turquoise.png";
import orange from "@/assets/bonhommes/chignons-orange-v2.png";
import violet from "@/assets/bonhommes/crete-violette-v2.png";
import rose from "@/assets/bonhommes/boucles-roses-v2.png";
import jaune from "@/assets/bonhommes/meche-jaune-v2.png";
import fleur from "@/assets/bonhommes/fleur-orange-v2.png";

// Les emplacements partagent les six personnages dans un ordre prédéfini.
// Ordre fixe : la répartition reste identique après chaque rechargement.
const personnages = [turquoise, orange, violet, rose, jaune, fleur];

export function BonhommeDecoratif({ emplacement, miroir = false, petit = false, mobile = false, tousEcrans = false }: {
  emplacement: number;
  miroir?: boolean;
  petit?: boolean;
  mobile?: boolean;
  tousEcrans?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none shrink-0 select-none ${tousEcrans ? "block w-[72px] lg:w-28 xl:w-32" : mobile ? "block w-20 lg:hidden" : `hidden lg:block ${petit ? "w-20" : "w-28 xl:w-32"}`}`}
    >
      <picture className="block">
      <source media={tousEcrans ? undefined : mobile ? "(max-width: 1023px)" : "(min-width: 1024px)"} srcSet={personnages[emplacement % personnages.length]} />
      <img
        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        alt=""
        width={1213}
        height={1297}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`h-auto w-full object-contain ${miroir ? "-scale-x-100" : ""}`}
      />
      </picture>
    </span>
  );
}
