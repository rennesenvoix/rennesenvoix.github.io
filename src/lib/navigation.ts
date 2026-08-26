export const navigationItems = [
  { label: "Accueil", href: "/", isCallToAction: false },
  { label: "Programmation", href: "/programmation", isCallToAction: false },
  { label: "Le Festival", href: "/le-festival", isCallToAction: false },
  { label: "Souvenez-vous", href: "/medias", isCallToAction: false },
  { label: "Infos", href: "/contact", isCallToAction: false },
  { label: "Soutenir le festival", href: "/soutien", isCallToAction: true },
] as const;

export const footerNavigationItems = [
  ...navigationItems,
  { label: "Fréquentation", href: "/frequentation", isCallToAction: false },
] as const;
