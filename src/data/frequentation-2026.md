# Fréquentation 2026 — données de référence

`frequentation-2026.json` conserve les 48 lignes initiales transmises par l’organisateur le 6 octobre 2026 : **285 visiteurs** au total.

- Conserver tous les codes, même lorsqu’ils ne figurent pas sur la carte.
- Ne pas extrapoler les effectifs à 300 et ne pas arrondir les effectifs bruts.
- Les pourcentages affichés sont calculés à partir de ces données ; seul leur affichage est arrondi.
- Toute la France continentale est affichée, sans la Corse. Les départements sans données ne présentent ni limites départementales ni découpage postal. Seuls les départements totalisant au moins un visiteur sont découpés par code postal. Les anciens filtres de continuité, de seuil et leurs exceptions ne sont plus appliqués.
- Les codes `69000` (8 visiteurs) et `75000` (3 visiteurs) sont conservés tels que fournis. Ils ne doivent pas être répartis entre arrondissements sans précision de l’organisateur.
- Le script de génération signale les codes conservés mais non représentés : absence de géométrie postale ou département exclu par le filtre.

La page Fréquentation et le générateur `scripts/build-bfc-postcode-map.mjs` utilisent cette même source. Les anciens totaux fixes et l’extrapolation à 300 ont été retirés.


Les limites régionales sont affichées partout, y compris dans les zones sans fréquentation. La correspondance département–région provient de https://geo.api.gouv.fr/departements et est conservée dans `scripts/data/departements-regions.json`.

Données complémentaires fournies, conservées en attente d’intégration : Allemagne 2, Pays-Bas 3, Suisse 3. Leur affichage et leur inclusion dans le total ont été annulés à la demande de l’organisateur.

Exception : les codes postaux du Territoire de Belfort (90) sont affichés dans les deux cartes, même sans fréquentation renseignée. Aucun effectif n’est ajouté.
