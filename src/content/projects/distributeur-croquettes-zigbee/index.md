---
title: Distributeur de croquettes connecté
summary: Boîte à croquettes déverrouillable à distance via Zigbee et Home Assistant. Firmware ESP-IDF, mécanisme à élastiques, moins de 20 € de matériel.
date: 2025-12-01
category: Électronique
tags: [ESP-IDF, Zigbee, Home Assistant, Onshape, Impression 3D]
cover: ./cover.jpg
coverAlt: Deux chats mangeant dans le distributeur imprimé en 3D, couvercle ouvert
order: 3
context:
  equipe: Projet personnel
  duree: environ 10 h
stats:
  - { value: '< 20 €', label: 'de matériel' }
  - { value: '50+', label: 'cycles sans défaillance' }
  - { value: '< 300 ms', label: 'de latence' }
  - { value: '< 10 s', label: 'de reconnexion' }
links:
  - { label: 'Code source', url: 'https://github.com/MatthieuGrr/Cat-feeder', kind: code }
  - { label: 'Fichiers STL (Cults3D)', url: 'https://cults3d.com/fr/mod%C3%A8le-3d/maison/boite-a-croquettes-intelligente-distributeur-d-urgence-deverrouillable-a-dista', kind: files }
gallery:
  - { src: ./vue-eclatee.png, alt: 'Vue éclatée CAO du distributeur', caption: 'Vue éclatée sous Onshape : base, couvercle, verrou' }
  - { src: ./charniere.jpg, alt: 'Charnière sur tige M3 et élastiques de rappel', caption: 'Charnière M3 et élastiques pré-tendus' }
  - { src: ./ferme.jpg, alt: 'Distributeur assemblé, couvercle fermé et verrouillé' }
  - { src: ./ouvert.jpg, alt: 'Distributeur ouvert, croquettes visibles' }
  - { src: ./reseau-zigbee.png, alt: 'Graphe du réseau Zigbee dans Home Assistant, le distributeur en vert', caption: 'Le distributeur (en vert) dans le maillage Zigbee' }
---

## Le besoin

Pouvoir nourrir mes chats en cas d’absence imprévue. Les distributeurs du commerce sont soit rigides (horaires programmés), soit liés à une application propriétaire. Je voulais une solution simple, fiable et intégrée à ma domotique existante.

**Contraintes fixées** : fiabilité totale (aucun blocage possible), intégration Home Assistant par un protocole standard, fabrication 100 % impression 3D FDM, moins de 20 € de composants.

## Le mécanisme

Plutôt qu’un système motorisé, j’ai choisi une approche **mécanique-élastique** : le servo SG90 ne fait que libérer un verrou, et ce sont des élastiques pré-tendus qui ouvrent le couvercle.

- **Verrouillé (0°)** : le palonnier du servo bloque une encoche du couvercle.
- **Déverrouillage (90°)** : le palonnier se dégage, les élastiques ouvrent le couvercle autour de sa charnière M3.

Les élastiques exercent une force **radiale** sur le palonnier et non une opposition frontale : le couple demandé au servo reste faible. Leur nombre (2 ou 3) a été réglé par essais successifs. Résultat : peu de pièces mobiles, un servo actif 2 à 3 secondes seulement, une ouverture franche même avec des frottements.

La CAO, paramétrique sous Onshape, intègre les règles de la fabrication additive : pas de porte-à-faux au-delà de 45°, jeux de 0,2 à 0,5 mm sur les pièces mobiles, parois de 3 mm minimum, sollicitations orientées selon le plan de dépose. Version finale en **PETG**.

## Électronique

L’architecture est volontairement minimale : un **ESP32-H2 SuperMini** et le servo, trois connexions.

- 5 V USB vers l’ESP32 et le servo (le servo ne passe pas par le régulateur 3,3 V)
- masse commune
- une GPIO en PWM vers le servo, qui accepte directement la logique 3,3 V

Le choix de l’ESP32-H2 tient à sa **radio IEEE 802.15.4 intégrée** : Zigbee natif sans module externe, pour environ 5 €.

## Firmware

Firmware en C sur **ESP-IDF 5.4**, en modules séparés : pile Zigbee (`esp_zb_feeder`), driver servo (`servo_driver`), configuration CMake avec dépendances verrouillées pour des builds reproductibles.

Le servo est piloté par le périphérique **MCPWM** : base de temps à 1 MHz, période de 20 ms, impulsions de 500 à 2 500 µs.

```c
static inline uint32_t angle_to_pulse_width(uint32_t angle) {
    return SERVO_PULSE_WIDTH_MIN_US +
           (angle * (SERVO_PULSE_WIDTH_MAX_US - SERVO_PULSE_WIDTH_MIN_US)) / 180;
}
```

L’appareil s’annonce comme **Zigbee End Device** avec le profil standard *On/Off Light*. Home Assistant (ZHA ou Zigbee2MQTT) le détecte et crée automatiquement un interrupteur, sans aucun développement côté coordinateur. Il devient alors utilisable dans n’importe quelle automatisation : notification en cas d’absence prolongée, déverrouillage depuis l’application mobile, historique des ouvertures.

## Validation

- **50 cycles** de verrouillage et déverrouillage consécutifs, puis 50 ouvertures en conditions réelles : 100 % de réussite.
- **Élastiques** : aucune perte de force après une semaine sous tension.
- **Charge** : couvercle lesté à 200 g (un chat curieux), le verrou tient.
- **Radio** : liaison stable à 15 m à travers deux murs (−65 dBm), moins de 300 ms entre la commande et le mouvement.
- **Coupure secteur** : reconnexion automatique au réseau en moins de 10 s ; 72 h de fonctionnement continu sans déconnexion.

## Pistes pour une V2

Un micro-rupteur pour confirmer mécaniquement l’ouverture, une LED d’état, et un condensateur de 100 µF sur le rail 5 V pour lisser les appels de courant du servo, observés à l’oscilloscope.
