# Portfolio - Électronique, Robotique & Programmation

Portfolio professionnel pour présenter vos projets d'électronique, robotique et programmation. Site moderne, responsive et optimisé pour GitHub Pages.

## 🎨 Fonctionnalités

- ✅ Design moderne et professionnel
- ✅ Mode sombre/clair avec sauvegarde de préférence
- ✅ Système de blog/projets avec filtres
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Animations fluides au scroll
- ✅ Navigation dynamique
- ✅ Optimisé pour GitHub Pages
- ✅ Pas de frameworks lourds (HTML/CSS/JS vanilla)

## 📁 Structure du projet

```
portfolio/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # JavaScript
├── projects.json       # Données des projets
└── README.md          # Documentation
```

## 🚀 Déploiement sur GitHub Pages

### 1. Créer le repository GitHub

1. Allez sur [GitHub](https://github.com) et connectez-vous
2. Cliquez sur **New repository**
3. Nommez-le `portfolio` (ou `votre-username.github.io` pour un site principal)
4. Cochez "Public"
5. Cliquez sur **Create repository**

### 2. Pousser le code

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Portfolio"

# Ajouter le remote GitHub (remplacez par votre URL)
git remote add origin https://github.com/votre-username/portfolio.git

# Pousser sur GitHub
git branch -M main
git push -u origin main
```

### 3. Activer GitHub Pages

1. Sur GitHub, allez dans **Settings** de votre repository
2. Dans le menu latéral, cliquez sur **Pages**
3. Sous "Source", sélectionnez la branche **main** et le dossier **/ (root)**
4. Cliquez sur **Save**
5. Attendez quelques minutes
6. Votre site sera disponible à : `https://votre-username.github.io/portfolio/`

## ✏️ Comment ajouter un projet

### Méthode simple (recommandée)

1. Ouvrez le fichier `projects.json`
2. Ajoutez votre projet en suivant ce modèle :

```json
{
    "title": "Nom de votre projet",
    "category": "electronique",
    "date": "Janvier 2025",
    "description": "Description détaillée de votre projet en 2-3 phrases. Expliquez le contexte, les objectifs et les résultats.",
    "technologies": ["ESP32", "C++", "KiCad", "MQTT"],
    "image": "",
    "link": "https://github.com/votre-username/projet"
}
```

### Catégories disponibles

- `electronique` - Pour les projets de conception électronique, PCB, etc.
- `robotique` - Pour les robots, systèmes automatisés, etc.
- `programmation` - Pour les bibliothèques, scripts, applications, etc.
- `iot` - Pour les objets connectés, domotique, etc.

### Ajouter une image à un projet

Deux options :

**Option 1 : Images externes (recommandé pour GitHub Pages)**

Uploadez votre image sur un service comme :
- [Imgur](https://imgur.com)
- [GitHub Issues](https://github.com) (uploadez dans un issue, copiez le lien)
- Un autre CDN d'images

Puis ajoutez le lien dans `"image": "https://..."`

**Option 2 : Images locales**

1. Créez un dossier `images/` à la racine
2. Ajoutez vos images dedans
3. Référencez-les : `"image": "images/mon-projet.jpg"`

### Exemple complet

```json
{
    "title": "Drone quadricoptère FPV",
    "category": "robotique",
    "date": "Janvier 2025",
    "description": "Construction d'un drone FPV de course avec contrôleur de vol personnalisé. Implémentation d'algorithmes PID pour la stabilisation et télémétrie en temps réel.",
    "technologies": ["STM32", "C", "PID", "FPV", "Betaflight"],
    "image": "https://i.imgur.com/exemple.jpg",
    "link": "https://github.com/username/drone-project"
}
```

## 🎨 Personnalisation

### Modifier les informations personnelles

Éditez le fichier `index.html` :

1. **Titre et meta description** (lignes 5-6)
```html
<meta name="description" content="Votre description">
<title>Votre Nom - Portfolio</title>
```

2. **Section Hero** (lignes 35-50)
```html
<h1 class="hero-title">
    Votre titre professionnel
</h1>
<p class="hero-description">
    Votre description personnelle
</p>
```

3. **Section À propos** (lignes 60-80)
Modifiez le texte selon votre parcours

4. **Section Contact** (lignes 180-200)
```html
<a href="mailto:votre@email.com">votre@email.com</a>
<a href="https://github.com/votre-username">github.com/votre-username</a>
```

### Modifier les compétences

Dans `index.html`, section "Compétences" (lignes 140-170), modifiez les tags :

```html
<span class="skill-tag">Votre compétence</span>
```

### Changer les couleurs

Éditez `styles.css` et modifiez les variables CSS (lignes 5-15) :

```css
:root {
    --primary-color: #2563eb;     /* Bleu principal */
    --secondary-color: #7c3aed;   /* Violet secondaire */
    --accent-color: #06b6d4;      /* Cyan accent */
}
```

Testez d'autres palettes :
- Vert tech : `#10b981`, `#059669`, `#14b8a6`
- Orange : `#f97316`, `#ea580c`, `#fb923c`
- Rose : `#ec4899`, `#db2777`, `#f472b6`

## 📱 Test en local

Pour tester votre site localement :

### Option 1 : Extension VS Code (recommandé)

1. Installez l'extension "Live Server" dans VS Code
2. Clic droit sur `index.html`
3. Sélectionnez "Open with Live Server"

### Option 2 : Python

```bash
# Python 3
python -m http.server 8000

# Puis ouvrez : http://localhost:8000
```

### Option 3 : Node.js

```bash
npx serve .
```

## 🔄 Mettre à jour le site

Après avoir modifié vos fichiers :

```bash
git add .
git commit -m "Description de vos changements"
git push
```

GitHub Pages mettra à jour automatiquement votre site en quelques minutes.

## 📝 Conseils pour un bon portfolio

### Rédaction de projets

- **Titre** : Court et descriptif
- **Description** :
  - Contexte et problème résolu
  - Technologies et approche technique
  - Résultats et apprentissages
- **Technologies** : Listez les plus pertinentes (max 5-6)
- **Liens** : GitHub, vidéo démo, article de blog

### Organisation

- Mettez vos **meilleurs projets en premier** (éditez l'ordre dans `projects.json`)
- Variez les catégories pour montrer votre polyvalence
- Privilégiez la qualité à la quantité (6-12 projets suffisent)
- Ajoutez des images pour rendre le portfolio plus visuel

### Images de projets

- Format : JPG ou PNG
- Taille recommandée : 800x600px minimum
- Poids : < 500KB pour de bonnes performances
- Contenu : Photo du projet, schéma, capture d'écran

## 🛠️ Améliorations futures possibles

- [ ] Ajout de pages dédiées par projet
- [ ] Système de tags avancé
- [ ] Section blog avec articles
- [ ] Formulaire de contact
- [ ] Analytics (Google Analytics)
- [ ] SEO amélioré avec meta tags Open Graph

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez que tous les fichiers sont bien commités
2. Vérifiez que GitHub Pages est activé
3. Attendez 5-10 minutes après un push
4. Videz le cache de votre navigateur (Ctrl+F5)

## 📄 Licence

Ce template est libre d'utilisation pour vos projets personnels.

---

**Bon courage pour votre recherche d'emploi ! 🚀**
