---
# ─────────────────────────────────────────────────────────────────────────────
# MODÈLE DE FICHE PROJET : ce dossier est ignoré par le site (son nom commence par « _ »).
#
# Pour ajouter un projet :
#   1. Copie ce dossier et renomme-le, par ex. src/content/projects/bras-robotique-6-axes/
#      (le nom du dossier devient l'adresse : /projets/bras-robotique-6-axes/)
#   2. Dépose tes photos dans ce nouveau dossier (JPG ou PNG, le site les optimise lui-même)
#   3. Remplis les champs ci-dessous, puis écris la page en Markdown sous les « --- »
#   4. Vérifie en local avec `npm run dev`, puis commit et push : le site se met à jour seul
# ─────────────────────────────────────────────────────────────────────────────

title: Titre court du projet
summary: Une phrase qui dit ce que c'est et ce qui le rend remarquable (affichée sur la carte).
date: 2026-01-31                 # AAAA-MM-JJ, sert au tri et à l'affichage « Janvier 2026 »
category: Robotique              # Robotique | Électronique | Logiciel embarqué | Mécanique
tags: [ESP32, KiCad, ROS 2]      # 3 à 6 technologies principales (8 maximum)
cover: ./cover.jpg               # image principale, de préférence au format paysage
coverAlt: Description de la photo de couverture pour les lecteurs d'écran
featured: false                  # true = grande carte en haut de la page d'accueil
# order: 5                       # optionnel : force la position (1 = premier)
# draft: true                    # optionnel : masque le projet du site

context:                         # tout est optionnel ; mets entre guillemets un texte contenant « : »
  lieu: Paris
  equipe: Projet personnel
  role: Conception électronique et firmware
  duree: 3 mois

stats:                           # optionnel, 4 maximum : les chiffres qui parlent
  - { value: '< 20 €', label: 'de matériel' }
  - { value: '100 %', label: 'de réussite sur 50 essais' }

links:                           # kind : code | cad | article | site | files | video
  - { label: 'Code source', url: 'https://github.com/MatthieuGrr/mon-projet', kind: code }

gallery:                         # optionnel : photos affichées en bas de page
  - { src: ./photo-1.jpg, alt: 'Ce que montre la photo', caption: 'Légende facultative' }
---

## Le besoin

Quel problème ? Quelles contraintes (budget, taille, délai, fiabilité) ?

## La solution

Architecture, choix techniques et **pourquoi** ces choix.

## Validation

Comment tu as testé, avec des chiffres.

## Ce que j'en retiens

Ce qui a marché, ce que tu ferais autrement.
