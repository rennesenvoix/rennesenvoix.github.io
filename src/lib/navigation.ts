export const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Le festival", href: "/le-festival" },
  { label: "Programmation", href: "/programmation" },
  { label: "Soutenir", href: "/soutien" },
  { label: "Galerie & vidéos", href: "/medias" },
] as const;

export const footerNavigationItems = [
  ...navigationItems,
  { label: "Infos", href: "/contact" },
] as const;
