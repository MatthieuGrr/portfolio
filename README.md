# 🎨 Portfolio Moderne - Architecture & Design

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=flat-square)](https://matthieugrr.github.io/portfolio/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)]()

> Portfolio one-page moderne développé en JavaScript vanilla avec architecture modulaire et performances optimisées.

## 🎯 Objectifs du projet

Ce portfolio a été conçu avec les priorités suivantes :
- **Performance** : Chargement ultra-rapide sans frameworks lourds
- **Accessibilité** : Navigation intuitive et responsive
- **Maintenabilité** : Code propre, commenté et modulaire
- **UX/UI moderne** : Animations fluides et design épuré

## 🏗️ Architecture technique

### Stack technologique
```
Frontend Pure
├── HTML5 sémantique
├── CSS3 (variables, flexbox, grid)
├── JavaScript ES6+ vanilla
└── Font Awesome 6.5.1 (icônes)
```

### Structure des fichiers
```
portfolio/
├── index.html          # Structure HTML sémantique
├── styles.css          # Styles avec variables CSS
├── script.js           # Logique applicative
├── projects.json       # Base de données des projets
├── images/             # Assets optimisés
│   ├── profil.jpg
│   ├── IMG_2212.JPG
│   └── CDFR2026/
└── README.md
```

## ✨ Fonctionnalités techniques

### 🎨 Design System

#### Variables CSS
Le projet utilise un système de variables CSS pour une personnalisation facile :
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --accent-color: #06b6d4;
    --bg-color: #ffffff;
    --text-color: #1e293b;
}
```

#### Mode sombre automatique
- Détection et sauvegarde des préférences utilisateur
- Toggle manuel avec icône animée
- Transition fluide entre les modes
- Persistence avec `localStorage`

### 📱 Responsive Design

Breakpoints optimisés :
- **Desktop** : 1200px+ (3 colonnes de projets)
- **Tablette** : 768px-1199px (2 colonnes)
- **Mobile** : <768px (1 colonne, menu caché)

```css
@media (max-width: 768px) {
    .navbar { background-color: transparent; }
    .tech-items { grid-template-columns: 1fr; }
}
```

### ⚡ Optimisations de performance

#### Chargement différé
```javascript
// Intersection Observer pour animations au scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});
```

#### Lazy loading des projets
- Chargement JSON asynchrone avec `fetch()`
- Rendu dynamique des cartes
- Filtrage côté client sans rechargement

### 🎭 Animations & Interactions

#### Effets CSS
- **Transform** : Scale, translateY pour les hover
- **Transitions** : 0.3s ease pour fluidité
- **Keyframes** : Gradient animé, typing effect, bounce

#### JavaScript dynamique
```javascript
// Typing effect du hero
const texts = [
    { text: "Explorateur de ", highlight: "Technologies" },
    { text: "Créateur de ", highlight: "Projets" },
    { text: "Chercheur d'", highlight: "Idées ingénieuses" }
];
```

### 🎯 Navigation dynamique

- **Smooth scroll** vers les sections
- **Active state** automatique selon la position
- **Sticky navbar** avec effet au scroll
- **Scroll indicator** animé sur le hero

## 🎨 Design patterns utilisés

### 1. **CSS BEM-like Naming**
```css
.tech-group
.tech-group-title
.tech-item
.tech-item:hover
```

### 2. **Progressive Enhancement**
- Fonctionne sans JavaScript (navigation basique)
- Améliorations progressives (animations, filtres)

### 3. **Mobile-First Approach**
```css
.tech-items {
    grid-template-columns: 1fr; /* Mobile par défaut */
}

@media (min-width: 768px) {
    .tech-items {
        grid-template-columns: repeat(2, 1fr); /* Desktop */
    }
}
```

### 4. **DRY (Don't Repeat Yourself)**
- Variables CSS réutilisables
- Classes utilitaires (`.section-title`, `.btn`)
- Fonctions JavaScript modulaires

## 📊 Métriques de performance

### Lighthouse Score (objectifs)
- ⚡ **Performance** : 95+
- ♿ **Accessibility** : 90+
- 🎯 **Best Practices** : 95+
- 🔍 **SEO** : 90+

### Optimisations appliquées
- ✅ Minification CSS/JS potentielle
- ✅ Images optimisées (< 500KB)
- ✅ Utilisation de `object-fit: cover`
- ✅ Lazy loading des images projets
- ✅ Pas de frameworks lourds (React, Vue, etc.)
- ✅ CSS critique inline potentiel

## 🎨 Composants UI

### Hero Section
- Background image avec overlay
- Typing effect animé
- CTA buttons avec hover effects
- Scroll indicator bounce animation

### Project Cards
```css
.project-card {
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}
```

### Tech Stack Items
```css
.tech-item:hover {
    background: linear-gradient(135deg,
                var(--primary-color),
                var(--secondary-color));
    transform: scale(1.05);
}
```

### Système de filtres
```javascript
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterProjects(filter);
    });
});
```

## 🔧 Configuration & Personnalisation

### Modifier les couleurs
Dans `styles.css`, lignes 4-23 :
```css
:root {
    --primary-color: #2563eb;     /* Couleur principale */
    --secondary-color: #7c3aed;   /* Couleur secondaire */
    --accent-color: #06b6d4;      /* Accent */
    --border-radius: 12px;         /* Rayon des bordures */
}
```

### Ajouter un projet
Dans `projects.json` :
```json
{
    "title": "Nom du projet",
    "category": "electronique | robotique | programmation",
    "date": "Mois AAAA",
    "description": "Description détaillée",
    "technologies": ["Tech1", "Tech2"],
    "image": "chemin/image.jpg",
    "link": "https://github.com/..."
}
```

### Modifier les sections
Structure HTML modulaire dans `index.html` :
```html
<section id="nom-section" class="nom-classe">
    <div class="container">
        <h2 class="section-title">Titre</h2>
        <!-- Contenu -->
    </div>
</section>
```

## 🚀 Déploiement

### GitHub Pages
1. Push sur la branche `main`
2. Settings → Pages → Source: main / root
3. Site disponible à : `username.github.io/portfolio/`

## 📈 Évolutions possibles

### Améliorations techniques
- [ ] Service Worker pour offline support
- [ ] WebP avec fallback pour images
- [ ] Critical CSS inline
- [ ] Preload des fonts
- [ ] Schema.org markup pour SEO

### Nouvelles fonctionnalités
- [ ] Formulaire de contact avec validation
- [ ] Blog avec Markdown
- [ ] Recherche full-text dans projets
- [ ] i18n (multi-langues)
- [ ] Analytics privacy-friendly

## 🛠️ Développement local

### Serveur de développement

**Option 1 : Live Server (VS Code)**
```bash
# Extension: ritwickdey.liveserver
Right-click index.html → Open with Live Server
```

**Option 2 : Python**
```bash
python -m http.server 8000
# → http://localhost:8000
```

**Option 3 : Node.js**
```bash
npx serve .
# → http://localhost:3000
```

### Tests de responsive
- Chrome DevTools (F12)
- Firefox Responsive Design Mode (Ctrl+Shift+M)
- BrowserStack pour tests réels

## 📝 Bonnes pratiques appliquées

### HTML
- ✅ Sémantique (header, nav, section, article)
- ✅ Attributs alt sur images
- ✅ Meta description et Open Graph
- ✅ Aria labels sur boutons

### CSS
- ✅ Variables CSS pour maintenabilité
- ✅ Mobile-first media queries
- ✅ Transitions sur interactions
- ✅ Pas de !important (sauf exceptions)

### JavaScript
- ✅ ES6+ (const, let, arrow functions)
- ✅ Event delegation
- ✅ Async/await pour fetch
- ✅ Error handling

### Performance
- ✅ Minification potentielle
- ✅ Compression gzip/brotli
- ✅ Caching headers optimaux
- ✅ CDN pour Font Awesome

## 📚 Ressources & Références

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev Performance](https://web.dev/performance/)
- [A11y Project](https://www.a11yproject.com/)

## 📄 Licence

Code disponible sous licence MIT pour consultation et apprentissage.

---

**Développé avec ❤️ en JavaScript vanilla** | Hébergé sur [GitHub Pages](https://pages.github.com/)
