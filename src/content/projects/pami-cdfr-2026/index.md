---
title: PAMI, robot mobile open source sur ESP32-S3
summary: Firmware FreeRTOS, PCB KiCad et outils de supervision Python pour les robots secondaires de la Coupe de France de Robotique 2026.
date: 2026-05-16
category: Robotique
tags: [ESP32-S3, ESP-IDF, FreeRTOS, KiCad 9, Python, Onshape]
cover: ./cover.jpg
coverAlt: Le PAMI assemblé, châssis imprimé en 3D noir
featured: true
order: 3
context:
  lieu: La Roche-sur-Yon
  equipe: FIPATECH
  role: 'Projet mené seul : CAO, PCB, firmware, outils Python'
stats:
  - { value: '17e / 89', label: 'classement de l’équipe' }
  - { value: '10 Hz', label: 'télémétrie WebSocket' }
  - { value: '6', label: 'robots adressables' }
  - { value: '100 %', label: 'open source' }
links:
  - { label: 'Code source', url: 'https://github.com/FIPATECH/CDFR26_PAMI', kind: code }
  - { label: 'CAO Onshape', url: 'https://cad.onshape.com/documents/61ace0f923b7d0711b02489a/w/a848013f17f87ac1439f2348/e/84637fd52d4c4f08dcf050f5', kind: cad }
gallery:
  - { src: ./pcb.jpg, alt: 'PCB du PAMI avec ESP32-S3, driver moteur et écran OLED', caption: 'PCB KiCad 9 assemblé' }
  - { src: ./table.jpg, alt: 'Table de jeu de la Coupe de France de Robotique 2026', caption: 'Table de jeu « Winter is Coming »' }
  - { src: ./oled.jpg, alt: 'Écran OLED de débogage monté sur le PCB' }
  - { src: ./motoreducteur.jpg, alt: 'Servomoteur modifié en motoréducteur à encodeur' }
  - { src: ./batterie.jpg, alt: 'Logement des batteries 18650 dans le châssis' }
  - { src: ./roues.jpg, alt: 'Roues imprimées en 3D sur le plateau de l’imprimante' }
---

## Contexte

La Coupe de France de Robotique est la plus grande compétition de robotique amateur d’Europe. Le thème 2026, *Winter is Coming*, transformait les robots en écureuils chargés de récupérer des noisettes et de les cacher. Les **PAMI** (Petits Actionneurs Mobiles Indépendants) sont des robots secondaires qui s’élancent en fin de match pour marquer des points supplémentaires.

L’objectif : un robot compact, entièrement autonome, supervisable à distance, et publié en open source pour que d’autres équipes puissent le réutiliser.

J’ai mené ce projet **seul, de bout en bout** : mécanique, PCB, firmware, outils de supervision et documentation.

## Matériel

Le PCB, conçu sous **KiCad 9**, intègre tout le robot sur une carte unique. Le projet est autonome : empreintes et symboles non standard sont inclus, il s’ouvre directement sans dépendance externe.

- **ESP32-S3-DevKitC** monté sur connecteurs
- **DRV8833** : double pont en H pour deux motoréducteurs à encodeurs quadrature (80 impulsions par tour)
- **ICM-20948** : IMU 9 axes en I2C, fusion réalisée par son DMP
- **VL53L0X** : capteur de distance temps de vol, détection d’obstacles et de bord de table
- **SSD1306** : écran OLED 128 × 64 pour le débogage en direct
- **Servo SG90** pour les actions de jeu, trois boutons pour le choix d’équipe et le départ

La mécanique est modélisée sous **Onshape** en paramétrique : châssis imprimé en 3D, deux roues motrices, une roue folle, et un accès direct au PCB pour la maintenance.

## Firmware

Le firmware **ESP-IDF / FreeRTOS** est découpé en modules indépendants qui communiquent par queues et sémaphores : `motion`, `localization`, `drivers`, `sensors`, `net`, `ws`, `mission`, `config` (NVS) et `ota`.

### Navigation par waypoints

Le robot suit une liste de points (x, y). La loi de commande est un **contrôleur à point décalé** : on asservit un point virtuel situé 50 mm devant le robot, puis on en déduit (v, ω) par inversion cinématique. Les trajectoires restent fluides, sans oscillation, même en enchaînant les waypoints à vitesse maximale.

```c
#define WHEEL_DIAMETER_MM          65.1f
#define WHEEL_BASE_MM              106.8f
#define MOTOR_DEAD_ZONE            145
#define TOF_OBSTACLE_THRESHOLD_MM  150
```

L’odométrie est corrigée par le cap de l’IMU. La mission se met en pause automatiquement si un obstacle est détecté à moins de 150 mm.

### Réseau et supervision

Chaque robot rejoint le Wi-Fi avec une IP statique dérivée de son identifiant (jusqu’à six robots sur le même réseau) et expose :

- une **API REST** : vitesse, missions, capteurs, configuration ;
- un **WebSocket** de télémétrie à 10 Hz et un miroir des logs ESP-IDF, pour déboguer sans câble ;
- une **mise à jour OTA** en HTTP, indispensable pour corriger vite entre deux matchs.

## Outils Python

- **`robot_gui.py`** : interface de contrôle (position, vitesses, capteurs, commandes manuelles, lancement de mission).
- **`waypoint_editor.py`** : éditeur visuel de trajectoires sur le plan de la table ; les points sont injectés dans le code de mission.
- **`robot_client.py`** : bibliothèque cliente REST/WebSocket partagée par la GUI et les scripts de test.

## Résultats

À La Roche-sur-Yon, du 13 au 16 mai 2026, l’équipe FIPATECH termine **17e sur 89**, contre 77e l’année précédente. Les PAMI ont atteint leurs zones cibles en fin de match : la navigation autonome est validée en conditions réelles.

## Open source

Firmware, PCB, outils Python, CAO et documentation sont publiés, avec un *dev container* Docker pour disposer d’un environnement ESP-IDF reproductible en une commande.
