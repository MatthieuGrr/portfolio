---
title: Quedalle, launcher Android publié sur F-Droid
summary: Un écran d’accueil Android minimaliste, sans internet ni tracking. Développé avec l’IA comme outil, de l’idée jusqu’à la publication, avec des contributeurs externes.
date: 2026-07-31
category: Application
tags: [Kotlin, Jetpack Compose, Android, Développement assisté par IA, GitHub Actions, F-Droid]
cover: ./cover.png
coverAlt: Bannière de Quedalle, quatre tuiles et la mention « Rien de plus. »
order: 4
context:
  equipe: Projet personnel
  role: 'Mené seul : produit, développement, publication'
  duree: Mai à juillet 2026, maintenu
stats:
  - { value: '8', label: 'versions publiées en deux mois' }
  - { value: '0', label: 'permission internet' }
  - { value: '4', label: 'contributions externes intégrées' }
  - { value: 'F-Droid', label: 'publication et mises à jour automatiques' }
links:
  - { label: 'Code source', url: 'https://github.com/MatthieuGrr/quedalle-launcher', kind: code }
  - { label: 'Page F-Droid', url: 'https://f-droid.org/packages/dev.mlg.quedalle/', kind: site }
gallery:
  - { src: ./ecran-accueil.png, alt: 'Écran d’accueil de Quedalle : barre de recherche et grille de tuiles texte, deux tuiles colorées en orange', caption: 'L’écran d’accueil : une grille finie, des tuiles texte' }
---

## Le besoin

> J’en avais assez des launchers qui ressemblent à un tableau de bord d’avion. J’en voulais un qui lance juste des applis.

*Quedalle*, en argot, c’est « rien du tout ». Quedalle en widgets inutiles, en animations, en menus à rallonge. Quedalle en publicité, en tracking, en compte obligatoire, en permission internet. Juste une grille de tuiles et vos applis.

## Le produit

L’écran d’accueil est volontairement **fini** : il contient ce qui tient dans la grille, rien de plus. Pas de pages, pas de tiroir d’applications, pas de widgets.

- Tuiles d’applications en texte seul, renommables, réorganisables par glisser-déposer
- Tuiles vides colorées et séparateurs pour structurer la grille
- Apparence globale et par tuile : couleurs, textures, thème clair ou sombre
- Recherche insensible aux accents, applications masquables, profil professionnel pris en charge
- Sauvegarde et restauration de la disposition en JSON
- Interface en français et en anglais

**Respect de la vie privée** : aucune permission internet, aucun accès aux notifications, aucune statistique. Les seules permissions demandées sont de niveau « normal », accordées sans rien lire. Des droits ont même été **retirés** au fil des versions : l’accès à la liste complète des applications en v1.4, l’écoute des notifications en v2.0.

## La méthode : piloter l’IA

Le code a été écrit en grande partie avec un assistant IA. Je l’assume, parce que c’est justement ce que ce projet m’a appris à faire : utiliser ces outils sans perdre la main sur le résultat.

- **Tenir la vision produit.** L’IA propose volontiers d’ajouter des fonctions ; décider de ce que l’application ne fera *pas* est resté mon travail.
- **Spécifier, tester, renvoyer.** Chaque version a été essayée sur téléphone et les défauts renvoyés jusqu’à disparaître : neuf, puis dix correctifs juste après la première version et avant l’entrée sur F-Droid, une feuille d’édition qui oscillait, une recherche qui cessait de répondre après le lancement d’une application.
- **Garder un code vérifiable.** La logique de la grille, des couleurs, de la recherche et de la sauvegarde est séparée de l’interface et couverte par des tests unitaires, exécutés avec le lint à chaque modification.

## Livrer pour de vrai

- **Intégration continue** : tests, lint et compilation à chaque modification ; une version publiée sur GitHub à chaque tag.
- **Publication sur F-Droid**, le magasin d’applications libres : application compilée par F-Droid depuis les sources, descriptions et captures en deux langues, et mises à jour détectées automatiquement à chaque nouvelle version.
- **Open source sous GPL-3.0** : un contributeur externe a proposé quatre améliorations (correctif du volet de notifications, fenêtre de confirmation, traductions), relues et intégrées dans la v2.2.

## Ce que j’en retiens

L’IA accélère énormément l’écriture du code, mais elle ne remplace ni les choix, ni les tests, ni la rigueur de publication. C’est la même démarche que sur mes robots : définir le besoin, vérifier sur le terrain, livrer quelque chose qui fonctionne.
