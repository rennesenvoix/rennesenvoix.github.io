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
        style: "Style musical",
        bio: "Présentation du groupe",
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "Site internet",
      },
      {
        name: "A Bocca Chiusa",
        style: "Style musical",
        bio: "Présentation du groupe",
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "Site internet",
      },
      {
        name: "2x2 Voix",
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
    year: "2025",
    label: "Programmation 2025",
    date: "Samedi 5 juillet 2025",
    location: "Orangerie du château de Rennes-sur-Loue",
    groups: [
      {
        name: "L'Atelier",
        style: "Style musical",
        bio: "Présentation du groupe",
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "Site internet",
      },
      {
        name: "Nana Sila",
        style: "Style musical",
        bio: "Présentation du groupe",
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "Site internet",
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
        style: "Style musical",
        bio: "Présentation du groupe",
        photo: "Adresse ou import de la photo",
        time: "Horaire",
        instagram: "Lien Instagram",
        youtube: "Lien YouTube",
        website: "Site internet",
      },
      {
        name: "Vocalypso",
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
];
