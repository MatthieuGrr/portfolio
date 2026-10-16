---
title: Alidade, robot mobile autonome sous ROS 2
summary: Base différentielle conçue de bout en bout, du firmware moteur à l’interface web. SLAM, navigation Nav2 et docking guidé par vision, avec chaque réglage mesuré sur le robot.
date: 2026-10-08
category: Robotique
tags: [ROS 2 Jazzy, ros2_control, Nav2, C / C++, Pico 2, Python, Gazebo, Onshape]
cover: ./cover.jpg
coverAlt: Alidade sur fond orange, avec sa caméra RealSense à l’avant et son LiDAR sur le dessus
featured: true
order: 1
context:
  equipe: Projet personnel
  role: 'Mené seul : CAO, électronique, firmware, ROS 2'
  duree: Depuis septembre 2026, en cours
stats:
  - { value: '7 / 7', label: 'dockings réussis, arrêt à 5 cm' }
  - { value: '0,1 %', label: 'd’erreur d’odométrie après calibration' }
  - { value: '50 Hz', label: 'boucle ros2_control' }
  - { value: '150+', label: 'tests automatisés' }
links:
  - { label: 'Pile ROS 2', url: 'https://github.com/MatthieuGrr/alidade_ros2', kind: code }
  - { label: 'Firmware Pico 2', url: 'https://github.com/MatthieuGrr/diffdrive_pico_firmware', kind: code }
gallery:
  - { src: ./trois-quarts.jpg, alt: 'Alidade vu de trois quarts avant sur un parquet', caption: 'Révision v2 : châssis 250 × 252 mm, roues Ø 100 mm' }
  - { src: ./face.jpg, alt: 'Alidade vu de face, caméra RealSense sur son support' }
  - { src: ./arriere.jpg, alt: 'Arrière d’Alidade avec l’arrêt d’urgence, la batterie et le Raspberry Pi 5', caption: 'Arrêt d’urgence, batterie et Raspberry Pi 5' }
  - { src: ./arret-urgence.jpg, alt: 'Pupitre avec arrêt d’urgence, fusible et interrupteur', caption: 'Arrêt d’urgence, fusible et interrupteur' }
  - { src: ./assemblage.jpg, alt: 'Alidade en cours d’assemblage, avant le montage de la caméra', caption: 'En cours d’assemblage, avant la caméra' }
  - { src: ./rendu-cao.jpg, alt: 'Rendu de la CAO d’Alidade', caption: 'La CAO Onshape, exportée en URDF pour ROS 2' }
---

## Le projet

Une alidade est la règle de visée que le topographe posait sur sa planchette pour relever un azimut et tracer une carte : l’ancêtre du LiDAR rotatif.

Alidade est d’abord un projet d’apprentissage. Je voulais une plateforme simple mais réellement fonctionnelle pour faire de la **vraie robotique** et tester beaucoup de choses, pas un robot Arduino à moteurs jaunes. Elle couvre donc **toute la chaîne d’un robot mobile ROS 2**, sans boîte noire : CAO, électronique, firmware temps réel, intégration `ros2_control`, cartographie, navigation, perception, interface opérateur et déploiement. Le principe directeur : **une valeur se mesure, elle ne se suppose pas**. Chaque constante du robot est mesurée sur le robot réel, datée et justifiée dans le dépôt.

## Architecture

| | |
|---|---|
| Bas niveau | Raspberry Pi Pico 2 (RP2350), firmware C sur pico-sdk |
| Haut niveau | Raspberry Pi 5, ROS 2 Jazzy, CycloneDDS |
| Motorisation | 2 × GA25-370 et DRV8871, encodeurs à effet Hall (1 496 impulsions par tour) |
| Capteurs | LiDAR RPLIDAR C1, caméra RealSense D435i, IMU BNO055 |
| Mécanique | CAO Onshape, châssis 250 × 252 mm, roues Ø 100 mm, roulette arrière |
| Poste | rviz et Gazebo Harmonic dans Docker, interface web sur téléphone |

La frontière entre les deux cartes est nette : **le Pico ne connaît que des impulsions et des impulsions par seconde**. Rayon de roue, entraxe et réduction vivent tous côté Pi, dans un seul fichier de révision matérielle. On peut changer de roues sans reflasher le firmware.

## Firmware temps réel (Pico 2)

- **Décodage quadrature en PIO**, le coprocesseur d’entrées-sorties du RP2350, sans aucune charge pour le CPU.
- **PID de vitesse à 50 Hz** sur timer matériel, avec anticipation et anti-emballement de l’intégrateur.
- **Protocole série ASCII** avec checksum XOR et compteurs **cumulés** : une trame perdue est rattrapée par la suivante.
- **Chien de garde de 300 ms** : si le lien avec le Pi tombe, les moteurs se coupent.
- **Modes de test intégrés** pour valider chaque étage (encodeurs, IMU, boucle ouverte, PID) sans reflasher.

Le PID se règle **automatiquement** : un script identifie le modèle de chaque roue en boucle ouverte, robot au sol et à son poids final, puis durcit les gains d’après le dépassement **mesuré**, jusqu’à convergence. Il produit un rapport HTML de toutes les courbes.

Le firmware est couvert par **79 cas de test** qui tournent sur PC, sans carte : le décodeur PIO y est simulé instruction par instruction, et les 2 001 consignes moteur sont vérifiées dans les deux modes de décroissance du pont en H.

## Intégration ROS 2

L’interface matérielle `ros2_control` est écrite en **C++** : un thread lit les trames à 50 Hz et vérifie leur checksum, puis les convertit en unités SI. Une trame absente depuis 500 ms ou un câble débranché fait passer le composant en erreur : les contrôleurs se désactivent, le processus survit, et l’état du lien remonte dans les diagnostics.

La description du robot part de **l’export URDF d’Onshape**. Un script le corrige à chaque build : masses et inerties réelles, collisions, repères manquants. Il **fait échouer le build** si un repère s’écarte de plus d’un millimètre de la révision matérielle. La simulation Gazebo utilise exactement les mêmes fichiers de configuration que le robot.

## Odométrie : mesurée, pas supposée

La distance vient des roues, le cap du gyromètre. Pour calibrer, j’ai écrit un outil qui prend **le LiDAR pour juge** : corrélation circulaire des scans pour les tours complets, ICP 2D pour les lignes droites. Ce qu’il a révélé :

- le réducteur livré est en **34:1 et non 35:1**, mesuré sur dix tours de roue (une erreur qui coûtait 10° par tour de robot) ;
- le pneu chargé roule 0,3 % plus petit que sa cote CAO, et l’entraxe effectif est 1,7 % plus large ;
- le gyromètre du BNO055 surestime de 2,9 %, dans la tolérance de ±3 % de sa fiche technique.

Après correction, l’odométrie fusionnée tient **à 0,1 % près en rotation** et à 0,3° de cap sur un mètre de ligne droite.

## Autonomie

Un **gestionnaire de modes** orchestre six états : repos, téléopération, cartographie (slam_toolbox), localisation (AMCL sur une carte sauvegardée), exploration autonome et docking. Il pilote les cycles de vie des nœuds ROS 2 et garantit une seule source de localisation à la fois. La téléopération préserve la carte en cours : on reprend la main, puis l’exploration repart où elle en était.

En exploration, le robot va de frontière en frontière, sauvegarde la carte quand il n’y a plus rien à découvrir et revient à son point de départ.

**Sécurité** : toute commande, manuelle ou autonome, passe par la même chaîne de lissage et de moniteur de collision, dans un groupe qui n’est jamais mis en pause. Le moniteur projette l’empreinte du robot le long de la commande : collé à un obstacle, le robot ne peut plus avancer mais peut toujours reculer.

## Docking guidé par vision

Le robot repère un cube de 50 mm portant un marqueur ArUco sur chaque face, puis vient s’arrêter à **5 cm** de la face la plus tournée vers lui.

La difficulté : de loin, l’orientation d’un marqueur plan isolé est ambiguë, et le détecteur se trompait sur 80 % des images, avec des bascules de 60°. Les **positions** des marqueurs, elles, restaient justes au millimètre. J’ai donc calculé le cap du cube à partir des positions de ses faces, en exploitant le fait que le cube est posé au sol. La dispersion est passée de ±52° à 8,6°.

La latence de détection est calibrée (0,15 s) et compensée par l’odométrie. Résultats des campagnes d’essais : **7 dockings sur 7 réussis** depuis 30 cm et ±10°, en 4 à 6 s, à 0 à 5 mm près en latéral. L’arrêt réel mesuré est à **5,1 / 5,1 / 4,9 cm**.

## Exploitation

- **Interface web** servie par le robot (Vizanti) avec un widget sur mesure : modes, cartes, état des capteurs, caméra et docking, depuis un téléphone.
- **Supervision** : température et alimentation du Pi, qualité Wi-Fi et cadence de chaque capteur, agrégées par sous-système.
- **Démarrage automatique** par systemd. La pile s’arrête si le Pico est débranché, ce qui coupe les moteurs, et repart toute seule au rebranchement.
- **Réseau** : CycloneDDS avec pairs déclarés, parce que la découverte multicast se perd sur beaucoup de points d’accès Wi-Fi.

## Diagnostiquer plutôt que deviner

Pendant un mois, le LiDAR refusait de démarrer une fois sur deux. Support mécanique, hub USB, alimentation (une alimentation dédiée achetée), câble, passage en UART direct : tout a été testé et mis hors de cause.

En dialoguant avec le capteur en protocole brut, j’ai montré qu’il fonctionnait parfaitement. La cause était **logicielle** : le pilote publié embarque un SDK ancien qui compare le numéro de firmware du capteur à un seuil prévu pour une autre gamme. Le C1, gamme récente repartie à 1.02, passait sous le seuil. Avec un pilote compilé depuis les sources : 5 démarrages sur 5, en une demi-seconde.

Le [dépôt](https://github.com/MatthieuGrr/alidade_ros2) documente une trentaine de pièges de ce type, chacun avec sa mesure et sa cause.

## Et ensuite

Alidade a dépassé son objectif de départ : je le prépare et le mets à disposition d’une équipe du *Humanoid Defense Robot Hackathon* (Agence de l’innovation de défense et Artefact, Grand Palais, décembre 2026), qui s’en servira de plateforme d’essai pour des **algorithmes de planification par IA**.

La révision v2 du châssis est en cours de calibration. Prochaines étapes : un drapeau de validité IMU et une compensation de zone morte dans le firmware, une empreinte polygonale pour Nav2, et des zones interdites pour les vitres que le LiDAR voit mal.
