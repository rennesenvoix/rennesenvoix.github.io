export type ProgramArtist = {
  name: string;
  style: string;
  bio: string;
  photo: string;
  photoFit?: "cover" | "contain";
  comingSoon?: boolean;
  professional?: boolean;
  displayOrder?: number;
  time: string;
  instagram: string;
  youtube: string;
  website: string;
};

export type YearProgram = {
  year: string;
  label: string;
  date: string;
  location: string;
  groups: ProgramArtist[];
};

export const yearPrograms: YearProgram[] = [
  {
    year: "2027",
    label: "Programmation 2027",
    date: "Samedi 3 juillet 2027",
    location: "Orangerie du château de Rennes-sur-Loue",
    groups: [
      {
        name: "À venir",
        style: "Le suspense continue",
        bio: "Patience, ça arrive !",
        photo: "",
        comingSoon: true,
        time: "",
        instagram: "",
        youtube: "",
        website: "",
      },
      {
        name: "À venir",
        style: "Encore un peu de patience",
        bio: "Suspense, suspense…",
        photo: "",
        comingSoon: true,
        time: "",
        instagram: "",
        youtube: "",
        website: "",
      },
      {
        name: "À venir",
        style: "Secret bien gardé",
        bio: "Motus et bouche cousue !",
        photo: "",
        comingSoon: true,
        time: "",
        instagram: "",
        youtube: "",
        website: "",
      },
    ],
  },
  {
    year: "2026",
    label: "Programmation 2026",
    date: "Samedi 4 juillet 2026",
    location: "Orangerie du château de Rennes-sur-Loue",
    groups: [
      {
        name: "Over the Pop",
        style: "Pop, rock, jazz et soul",
        bio: "Over the Pop revisite un répertoire pop, rock, jazz et soul dans des arrangements vocaux originaux, ponctués de percussions instrumentales et corporelles.",
        photo: overThePopPhoto,
        time: "Horaire",
        instagram: "https://www.instagram.com/overthepop.besancon/",
        youtube: "https://www.youtube.com/@overthepopbesancon",
        website: "https://overthepopbesancon.wixsite.com/groupevocal",
      },
      {
        name: "A Bocca Chiusa",
        professional: true,
        style: "Chansons actuelles et classiques francophones",
        bio: "Dans son spectacle Sans Cible, A Bocca Chiusa porte un répertoire exclusivement francophone, relie les chansons entre elles et construit une narration collective à quatre voix.",
        photo: aBoccaChiusaPhoto,
        time: "Horaire",
        instagram: "https://www.instagram.com/aboccachiusa",
        youtube: "https://www.youtube.com/@ensembleaboccachiusa",
        website: "https://www.ensemble-aboccachiusa.com/",
      },
      {
        name: "2x2 Voix",
        style: "Renaissance, classique et harmonies contemporaines",
        bio: "2x2 Voix propose un voyage dans le temps à travers un répertoire de la Renaissance interprété à quatre voix.",
        photo: twoByTwoVoixPhoto,
        time: "Horaire",
        instagram: "https://www.instagram.com/2x2voix",
        youtube: "https://www.youtube.com/@2x2voix",
        website: "https://www.2x2voix.fr",
      },
    ],
  },
  {
    year: "2025",
    label: "Programmation 2025",
    date: "Samedi 5 juillet 2025",
    location: "Orangerie du château de Rennes-sur-Loue",
    groups: [
      {
        name: "L'Atelier",
        style: "Ensemble vocal — pop, rock, jazz et soul",
        bio: "L’Atelier est l’ancien nom du groupe vocal devenu Over the Pop, un ensemble bisontin consacré aux arrangements vocaux contemporains et au chant collectif.",
        photo: atelier2025Photo,
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "https://ensemblelatelier.wixsite.com/ensemblevocal",
      },
      {
        name: "Nana Sila",
        professional: true,
        style: "Trio vocal féminin — polyphonies des Balkans",
        bio: "Trois voix réunies autour des cultures vocales populaires des Balkans, accompagnées de violon, de percussions et de flûte, entre puissance, poésie et fantaisie.",
        photo: nanaSilaPhoto,
        photoFit: "contain",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "https://www.cmtra.org/les_acteur/artistes/1253/NanaSila",
      },
      {
        name: "Sikstêt",
        style: "Style musical",
        bio: "Né en 2025, SIKSTÊT réunit six voix franc-comtoises autour d’un répertoire polyphonique aux époques, langues et rythmes variés, de Thomas Tallis à Duke Ellington.",
        photo: sikstetPhoto,
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "Site internet",
      },
    ],
  },
  {
    year: "2024",
    label: "Programmation 2024",
    date: "Samedi 15 juin 2024",
    location: "Orangerie du château de Rennes-sur-Loue",
    groups: [
      {
        name: "L'Atelier",
        displayOrder: 1,
        professional: true,
        style: "Ensemble vocal — pop, rock, jazz et soul",
        bio: "­Cet ensemble vocal éclectique interprète des morceaux pop, rock, jazz, soul & gospel dans une version a cappella originale et subtile.",
        photo: atelier2024Photo,
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "https://ensemblelatelier.wixsite.com/ensemblevocal",
      },
      {
        name: "Vocalypso",
        displayOrder: 0,
        style: "Jazz vocal, swing et musiques latines",
        bio: "Un ensemble vocal d'une quinzaine de chanteurs au répertoire jazz, accompagné d'un pianiste.",
        photo: vocalypsoPhoto,
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "Site internet",
      },
    ],
  },
];
import twoByTwoVoixPhoto from "@/assets/Prog/2026 2x2 voix.jpg";
import aBoccaChiusaPhoto from "@/assets/Prog/2026 A bocca chiusa.JPG";
import overThePopPhoto from "@/assets/Prog/2026over the pop.JPG";
import atelier2025Photo from "@/assets/Prog/2025 L'Atelier.JPG";
import nanaSilaPhoto from "@/assets/Prog/2025 Nana Sila.png";
import sikstetPhoto from "@/assets/Prog/2025 SIKSTÊT.jpg";
import atelier2024Photo from "@/assets/Prog/2024 Atelier.png";
import vocalypsoPhoto from "@/assets/Prog/2024 Vocalypso.jpg";
