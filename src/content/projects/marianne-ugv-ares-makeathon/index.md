---
title: Marianne, UGV vainqueur de l’ARES Makeathon
summary: Robot terrestre de 48 kg pour la logistique, la reconnaissance et la détection NRBC. 1re place au Makeathon de l’Agence européenne de défense.
date: 2025-05-15
category: Robotique
tags: [Onshape, Usinage, ROS 2, Bus CAN, ESP32, KiCad, ExpressLRS]
cover: ./cover.jpg
coverAlt: Le robot Marianne sur le terrain, badge « Competition Winner » sur le flanc
featured: true
order: 1
context:
  lieu: Cracovie, Pologne
  equipe: French Touch
  role: 'CAO et architecture, usinage, assemblage, loader, radio de secours'
stats:
  - { value: '1re', label: 'place toutes catégories' }
  - { value: '48 kg', label: 'masse du robot' }
  - { value: '4 × 1 kW', label: 'moteurs brushless' }
  - { value: '3', label: 'missions validées' }
links:
  - { label: 'Publication LinkedIn', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7330958733066280960/', kind: article }
  - { label: 'Annonce de l’Agence de l’innovation de défense', url: 'https://twitter.com/Agence_ID/status/1923302307917082758', kind: article }
gallery:
  - { src: ./podium.jpg, alt: 'L’équipe French Touch sur scène lors de la remise des prix', caption: 'Remise des prix, European Defence Innovation Days' }
  - { src: ./robot-terrain.jpg, alt: 'Marianne sur le terrain d’épreuve' }
  - { src: ./cao-3-4.png, alt: 'Modèle CAO de Marianne avec son bras robotique', caption: 'Modèle CAO complet' }
  - { src: ./cao-loader.png, alt: 'Modèle CAO montrant le système de chargement à tiroirs', caption: 'Système de chargement à 4 tiroirs' }
  - { src: ./pcb-loader.jpg, alt: 'Carte électronique du loader avec deux moteurs pas-à-pas', caption: 'PCB du loader : ESP32, DRV8825, CAN' }
  - { src: ./integration.jpg, alt: 'Intégration de l’électronique dans le châssis' }
  - { src: ./vue-dessus.jpg, alt: 'Vue de dessus du robot sur l’herbe' }
  - { src: ./debug-terrain.jpg, alt: 'Débogage du robot sur le terrain' }
  - { src: ./ceremonie.jpg, alt: 'Photo de groupe lors de la cérémonie du Makeathon' }
---

## Le défi

Le Makeathon ARES 2025, organisé par l’Agence européenne de défense (EDA) dans le cadre des European Defence Innovation Days à Cracovie, réunissait des équipes de toute l’Europe autour d’un objectif : concevoir, fabriquer et programmer un robot terrestre (UGV) capable de réaliser trois missions sur terrain accidenté.

- **Logistique** : transporter quatre caisses et les livrer automatiquement à quatre points différents.
- **Reconnaissance** : explorer une zone inconnue, la cartographier et repérer des points d’intérêt.
- **Détection NRBC** : localiser et identifier des sources de contamination à l’aide de capteurs dédiés.

Avec l’équipe French Touch, nous avons construit Marianne, un UGV de 48 kg, et remporté la **première place toutes catégories**. Tous les checkpoints ont été validés ; face à un terrain difficile, nous avons privilégié le mode téléopéré pour sécuriser les points.

## Ma contribution

- **CAO complète du robot** sous Onshape, en partant des trois missions pour définir l’architecture : implantation des sous-systèmes, répartition des masses, accès pour la maintenance.
- **Plans d’usinage** des pièces et **assemblage** du robot.
- **Sous-système loader de bout en bout** : PCB, motorisation NEMA 17, firmware ESP32, communication CAN et intégration côté ROS 2.
- **Liaison radio de secours** en ExpressLRS, pour reprendre la main à tout moment sur le mode autonome.

## Caractéristiques

| | |
|---|---|
| Dimensions | 80 × 90 × 45 cm |
| Masse | 48 kg |
| Propulsion | 4 moteurs brushless 1 000 W, configuration différentielle |
| Calculateur | LattePanda sous ROS 2 |
| Vision | Caméra stéréo ZED 2i + Jetson Nano |
| Localisation | Centrale inertielle SBG Ellipse-D + GNSS RTK |
| Communication | Bus CAN (TJA1050), téléopération ELRS |
| Manipulateur | Bras AgileX Piper sur bus CAN dédié |

## Conception mécanique

Toute la mécanique a été pensée à partir des missions. Le châssis est modulaire, pour assembler et modifier vite. Les 48 kg sont répartis de façon équilibrée sur les quatre roues. L’électronique sensible est protégée dans des boîtiers, avec des compartiments faciles à ouvrir pour le débogage sur le terrain.

Le système de chargement à quatre tiroirs motorisés est amovible, et la façade accueille des capteurs NRBC optionnels : grâce au bus CAN, en ajouter un se limite à brancher un nœud de plus.

## Architecture électronique

Le robot repose sur une **architecture distribuée autour d’un bus CAN**, robuste en environnement perturbé et facile à étendre : chaque fonction est portée par un nœud ESP32 indépendant.

- **Nœud loader** : pilotage du système de chargement à quatre tiroirs.
- **Nœud mission NRBC** : acquisition des capteurs de contamination.
- **Nœud distance** : capteurs à ultrasons pour l’évitement d’obstacles.
- **Contrôleur moteurs** : les quatre moteurs brushless, avec capteurs Hall pour l’odométrie.
- **LattePanda** (via adaptateur CAN) : calculateur central sous ROS 2.

Le bras robotique est isolé sur son propre bus CAN.

### PCB du système de chargement

J’ai conçu sous KiCad une carte dédiée au loader, cœur de la mission logistique : un ESP32, deux drivers DRV8825 pour les moteurs pas-à-pas NEMA 17, des fins de course pour chaque tiroir, un transceiver CAN TJA1050, la régulation d’alimentation et les protections contre les courts-circuits et surtensions.

Chaque tiroir se déploie indépendamment sur commande CAN. L’ESP32 vérifie la position grâce aux fins de course et renvoie son état, ce qui rend la livraison fiable et reproductible.

## Architecture logicielle

Un **plugin ROS 2** fait le pont entre ROS 2 et tous les nœuds du bus CAN : il traduit les trames en topics et services, gère la priorité des messages critiques (arrêt d’urgence) et surveille l’état de chaque nœud.

Par exemple, pour déployer le tiroir n° 2, un nœud publie sur `/loader/deploy` ; le plugin envoie la trame CAN à l’ESP32 du loader, qui exécute l’action et renvoie son état, republié sur `/loader/status`.

La locomotion fonctionne en **double mode** : commandes autonomes venant de ROS 2 via le CAN, ou pilotage direct par la liaison de secours ExpressLRS, avec bascule à chaud selon le terrain. C’est ce mode téléopéré qui a permis de sécuriser les points sur le terrain le plus difficile. La localisation fusionne la centrale inertielle, le GNSS RTK et l’odométrie moteurs. La vision tourne sur la Jetson, reliée au LattePanda en Ethernet.

Le bras Piper exécute des séquences de prise et de dépose automatisées, et peut être piloté manuellement grâce à un jumeau à l’échelle ½.

## Ce que j’en retiens

- **Intégration multi-systèmes** : faire dialoguer ROS 2, le bus CAN, la vision et la commande moteurs.
- **Délais serrés** : conception, fabrication des PCB, assemblage et tests en deux mois.
- **Débogage terrain** : s’adapter vite aux conditions réelles (terrain, interférences radio).
- **Énergie** : alimenter 4 kW de propulsion et l’électronique embarquée avec une autonomie suffisante.
