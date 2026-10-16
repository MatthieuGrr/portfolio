# Portfolio de Matthieu Geörger

Site personnel : électronique embarquée et robotique, en ligne sur **[portfolio.georger.ovh](https://portfolio.georger.ovh)**.

Construit avec [Astro](https://astro.build) : site 100 % statique, images optimisées automatiquement (WebP, tailles adaptées à l’écran), aucun framework JavaScript côté navigateur.

## Lancer le site en local

Prérequis : Node.js 22.22 ou plus récent.

```sh
npm install      # une seule fois
npm run dev      # http://localhost:4321, rechargement automatique
npm run build    # vérifie les types et génère le site dans dist/
```

## Organisation

```
src/
├── content/projects/      Un dossier par projet : index.md + photos
│   └── _modele/           Modèle à copier pour un nouveau projet (ignoré par le site)
├── data/site.ts           Textes de l’accueil : statut, chiffres clés, compétences, expérience, liens
├── assets/                Photo du hero et portrait
├── pages/                 Accueil, page projet générique, 404
├── components/ layouts/   Briques d’interface
└── styles/global.css      Couleurs (clair / sombre), typographie, styles communs
public/                    Fichiers copiés tels quels (CNAME, favicon, CV, redirections)
```

## Ajouter un projet

1. Copier `src/content/projects/_modele/` vers `src/content/projects/<nom-du-projet>/`. Le nom du dossier devient l’adresse `/projets/<nom-du-projet>/`.
2. Déposer les photos dans ce dossier, en JPG ou PNG : le site les compresse lui-même.
3. Remplir l’en-tête de `index.md` (titre, résumé, date, tags, couverture…) puis rédiger la page en Markdown. Chaque champ est expliqué dans le modèle.
4. `npm run dev` pour vérifier, puis commit et push sur `main`.

Si un champ obligatoire manque ou qu’une image est introuvable, `npm run build` le signale avec le nom du fichier.

Le projet apparaît automatiquement sur l’accueil, dans les jalons du parcours et dans la navigation entre projets. `featured: true` le met en grand en haut de la liste.

## Ajouter le CV

Déposer le PDF dans `public/` (par exemple `public/cv-matthieu-georger.pdf`), puis indiquer son chemin dans `src/data/site.ts` :

```ts
cv: '/cv-matthieu-georger.pdf',
```

Les boutons « CV » apparaissent alors dans le hero et dans la section contact.

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit le site et le publie sur GitHub Pages. Les pull requests sont vérifiées par `.github/workflows/check.yml`.

Réglage requis (une seule fois) : **Settings → Pages → Build and deployment → Source : GitHub Actions**. Le domaine personnalisé est défini par `public/CNAME`.

Les anciennes adresses (`pet-feeder.html`, `marianne-makeathon.html`, `cdfr26-pami.html`) redirigent vers les nouvelles pages projet, pour que les liens déjà partagés continuent de fonctionner.
