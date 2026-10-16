// Informations générales du site. Modifie ce fichier pour mettre à jour
// le texte de la page d'accueil sans toucher au code.

export const site = {
  name: 'Matthieu Geörger',
  role: 'Électronique embarquée & robotique',
  url: 'https://portfolio.georger.ovh',
  description:
    'Roboticien autodidacte : PCB, firmware embarqué et mécanique. 1re place à l’ARES Makeathon 2025 (Agence européenne de défense), 17e sur 89 à la Coupe de France de Robotique 2026.',
  status: 'Ouvert aux opportunités en robotique',
  email: 'matthieu.georger@gmail.com',
  github: 'https://github.com/MatthieuGrr',
  linkedin: 'https://www.linkedin.com/in/matthieu-ge%C3%B6rger-4433a1242/',
  // Chemin du CV une fois déposé dans public/ (ex. '/cv-matthieu-georger.pdf').
  // Tant que la valeur est null, le bouton « CV » n'est pas affiché.
  cv: null as string | null,
  // Statistiques Umami (auto-hébergé)
  analytics: {
    src: 'https://stats.georger.ovh/script.js',
    websiteId: '24a9eae3-d07f-470d-a832-768021c89b85',
  },
};

export const keyFigures = [
  { value: '1re place', label: 'ARES Makeathon 2025', detail: 'Agence européenne de défense' },
  { value: '17e / 89', label: 'Coupe de France de Robotique 2026', detail: '77e l’année précédente' },
  { value: 'Open source', label: 'PAMI ESP32-S3', detail: 'Firmware, PCB et outils publiés' },
];

export const skills = [
  {
    domain: 'Électronique',
    items: [
      'Conception de PCB sous KiCad',
      'Bus CAN, I2C, SPI, UART',
      'PWM, ADC, commande moteurs',
      'Capteurs : IMU, ToF, GNSS RTK',
      'Radio : Zigbee, BLE, LoRa, ELRS',
    ],
    proof: ['pami-cdfr-2026', 'marianne-ugv-ares-makeathon'],
  },
  {
    domain: 'Logiciel embarqué',
    items: [
      'C / C++',
      'ESP-IDF et FreeRTOS',
      'ESP32, RP2350 (PIO), STM32, Teensy',
      'MicroPython',
      'REST, WebSocket, MQTT, OTA',
    ],
    proof: ['alidade-robot-ros2', 'pami-cdfr-2026', 'distributeur-croquettes-zigbee'],
  },
  {
    domain: 'Robotique',
    items: [
      'ROS 2 : ros2_control, Nav2, slam_toolbox',
      'Odométrie et fusion IMU',
      'SLAM, navigation, exploration autonome',
      'Vision : ArUco, OpenCV, YOLO',
      'Simulation : Gazebo, RViz',
    ],
    proof: ['alidade-robot-ros2', 'marianne-ugv-ares-makeathon', 'pami-cdfr-2026'],
  },
  {
    domain: 'Mécanique & fabrication',
    items: [
      'CAO paramétrique : Onshape, Fusion 360, SolidWorks',
      'Impression 3D (PLA, PETG)',
      'Usinage CNC et G-code',
      'Découpe laser',
      'Conception pour la fabrication',
    ],
    proof: ['marianne-ugv-ares-makeathon', 'pami-cdfr-2026', 'distributeur-croquettes-zigbee'],
  },
];

export const experience = {
  title: 'Technicien avionique',
  org: 'Aéronautique militaire',
  period: 'Actuellement',
  text: 'Maintenance et diagnostic de systèmes avioniques, titulaire des licences Rafale et NH90. Un métier qui m’a appris la rigueur des procédures, la recherche de panne méthodique et l’exigence de fiabilité propre aux systèmes critiques.',
};
