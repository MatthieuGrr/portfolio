// ==========================================
// Theme Toggle
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Charger le thème depuis localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ==========================================
// Navigation Mobile
// ==========================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Fermer le menu mobile au clic sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ==========================================
// Navigation Active State
// ==========================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    // Navbar shadow on scroll
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// ==========================================
// Projects Loading & Filtering
// ==========================================
let allProjects = [];

// Charger les projets depuis le fichier JSON
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error('Impossible de charger les projets');
        }
        allProjects = await response.json();
        displayProjects(allProjects);
    } catch (error) {
        console.error('Erreur:', error);
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-info-circle"></i>
                <p>Aucun projet disponible pour le moment.</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">
                    Ajoutez vos projets dans le fichier <code>projects.json</code>
                </p>
            </div>
        `;
    }
}

// Afficher les projets
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');

    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-folder-open"></i> Aucun projet trouvé
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = projects.map(project => `
        <article class="project-card" data-category="${project.category}" ${project.link ? `data-link="${project.link}"` : ''}>
            <div class="project-image">
                ${project.image ?
                    `<img src="${project.image}" alt="${project.title}">` :
                    `<i class="${getCategoryIcon(project.category)}"></i>`
                }
            </div>
            <div class="project-content">
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${project.title}</h3>
                        <span class="project-date">${project.date}</span>
                    </div>
                    <span class="project-category">${getCategoryLabel(project.category)}</span>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech =>
                        `<span class="project-tag">${tech}</span>`
                    ).join('')}
                </div>
                ${project.link ?
                    `<a href="${project.link}" class="project-link" ${project.link.startsWith('http') ? 'target="_blank"' : ''}>
                        Voir le projet <i class="fas fa-arrow-right"></i>
                    </a>` :
                    ''
                }
            </div>
        </article>
    `).join('');

    // Ajouter les gestionnaires de clic sur les cartes de projet
    document.querySelectorAll('.project-card[data-link]').forEach(card => {
        card.addEventListener('click', (e) => {
            // Empêcher la double navigation si on clique sur le lien
            if (e.target.closest('.project-link')) return;

            const link = card.getAttribute('data-link');
            if (link) {
                if (link.startsWith('http')) {
                    window.open(link, '_blank');
                } else {
                    window.location.href = link;
                }
            }
        });
    });
}

// Filtrer les projets
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Mettre à jour l'état actif
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filtrer les projets
        const filter = btn.dataset.filter;
        const filteredProjects = filter === 'all'
            ? allProjects
            : allProjects.filter(project => project.category === filter);

        displayProjects(filteredProjects);
    });
});

// Helpers pour les catégories
function getCategoryIcon(category) {
    const icons = {
        'electronique': 'fas fa-microchip',
        'robotique': 'fas fa-robot',
        'programmation': 'fas fa-code',
        'iot': 'fas fa-wifi'
    };
    return icons[category] || 'fas fa-project-diagram';
}

function getCategoryLabel(category) {
    const labels = {
        'electronique': 'Électronique',
        'robotique': 'Robotique',
        'programmation': 'Programmation',
        'iot': 'IoT'
    };
    return labels[category] || category;
}

// ==========================================
// Smooth Scroll pour les ancres
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Hauteur de la navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Animations au scroll (Intersection Observer)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de projet, compétences, etc.
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.project-card, .tech-group, .contact-item, .highlight-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// ==========================================
// Initialisation
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Ne charger les projets que si la grille existe (page index)
    if (document.getElementById('projects-grid')) {
        loadProjects();
    }
});

// ==========================================
// Gestion des erreurs d'images
// ==========================================
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        const parent = e.target.parentElement;
        if (parent.classList.contains('project-image')) {
            parent.innerHTML = '<i class="fas fa-image"></i>';
        }
    }
}, true);
