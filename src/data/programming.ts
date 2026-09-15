export type ProgramArtist = {
  name: string;
  style: string;
  bio: string;
  photo: string;
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
        name: "Nom du groupe",
        style: "Style musical",
        bio: "Présentation du groupe",
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "Site internet",
      },
      {
        name: "Nom du groupe",
        style: "Style musical",
        bio: "Présentation du groupe",
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "Site internet",
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
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "https://ensemblelatelier.wixsite.com/ensemblevocal",
      },
      {
        name: "Nana Sila",
        style: "Trio vocal féminin — polyphonies des Balkans",
        bio: "Trois voix réunies autour des cultures vocales populaires des Balkans, accompagnées de violon, de percussions et de flûte, entre puissance, poésie et fantaisie.",
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "https://www.cmtra.org/les_acteur/artistes/1253/NanaSila",
      },
      {
        name: "Sikstêt",
        style: "Style musical",
        bio: "Présentation du groupe",
        photo: "Adresse ou import de la photo",
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
        style: "Ensemble vocal — pop, rock, jazz et soul",
        bio: "L’Atelier est l’ancien nom du groupe vocal devenu Over the Pop, un ensemble bisontin consacré aux arrangements vocaux contemporains et au chant collectif.",
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "https://ensemblelatelier.wixsite.com/ensemblevocal",
      },
      {
        name: "Vocalypso",
        style: "Jazz vocal, swing et musiques latines",
        bio: "Vocalypso est un groupe vocal de la région de Besançon qui interprète des standards de jazz et de swing ainsi qu’un répertoire aux influences latines.",
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "Site internet",
      },
    ],
  },
];
import overThePopPhoto from "@/assets/2026/Over the Pop/A_Over The Pop (c) Noé Michaud Arche Production.jpg";
import aBoccaChiusaPhoto from "@/assets/2026/A Bocca Chiusa/A_A Bocca Chiusa (c) Noé Michaud Arche Production.jpg";
import twoByTwoVoixPhoto from "@/assets/2026/2x2 Voix/A_2x2 Voix (c) Noé Michaud Arche Production.jpg";
