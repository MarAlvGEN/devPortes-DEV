export const USE_MOCK = false;

const CANCHAS_KEY = 'canchas_data';

export const canchasIniciales = [
  {
    id: 1,
    titulo: 'Estadio Principal',
    tipo: ['Futbol 11'],
    superficie: 'Grama Natural Pro',
    precio: '$60.000',
    tarifa: 60000,
    capacidad: 22,
    estado: 'Disponible',
    imagen: 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/canchas/futbol-estadio-principal.webp',
    descripcion: 'Nuestra joya del complejo. Una cancha con medidas oficiales optima para partidos grandes...',
    detalles: [
      'Capacidad ideal: 22 jugadores',
      'Graderias laterales para acompanantes',
      'Incluye petos de entrenamiento y balones oficiales',
    ],
  },
  {
    id: 2,
    titulo: 'Coliseo Multi-deporte',
    tipo: ['Futbol Sala', 'Baloncesto'],
    superficie: 'Madera Pulida / PVC',
    precio: '$45.000',
    tarifa: 45000,
    capacidad: 10,
    estado: 'Disponible',
    imagen: 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/canchas/baloncesto-coliseo.webp',
    descripcion: 'Espacio totalmente techado y protegido del clima...',
    detalles: [
      'Tableros de baloncesto hidraulicos ajustables',
      'Excelente ventilacion e iluminacion cenital',
      'Arcos de futsal con mallas reforzadas',
    ],
  },
  {
    id: 3,
    titulo: 'Club de Tenis Las Palmas',
    tipo: ['Tenis'],
    superficie: 'Superficie Sintetica Rapida',
    precio: '$35.000',
    tarifa: 35000,
    capacidad: 4,
    estado: 'Disponible',
    imagen: 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/canchas/tenis-las-palmas.webp',
    descripcion: 'Disenada para amantes de la velocidad y precision...',
    detalles: [
      'Excelente rebote controlado de bola',
      'Entorno libre de ruidos disruptivos',
      'Alquiler disponible de raquetas y tubos de bolas',
    ],
  },
  {
    id: 4,
    titulo: 'Padel Arena Celeste',
    tipo: ['Padel'],
    superficie: 'Vidrio Templado Panoramico',
    precio: '$40.000',
    tarifa: 40000,
    capacidad: 4,
    estado: 'Disponible',
    imagen: 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/canchas/padel-arena.webp',
    descripcion: 'Disfruta del deporte con mayor crecimiento mundial...',
    detalles: [
      'Estructura panoramica de alta visibilidad',
      'Iluminacion LED antideslumbrante orientada al cielo',
      'Zona de descanso integrada para hidratacion',
    ],
  },
  {
    id: 5,
    titulo: 'Zona de Entrenamiento',
    tipo: ['Cancha Indoor'],
    superficie: 'Piso de Concreto',
    precio: '$25.000',
    tarifa: 25000,
    capacidad: 12,
    estado: 'Disponible',
    imagen: 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/canchas/indoor-entrenamiento.webp',
    descripcion: 'Disenada especialmente para sesiones enfocadas en la tecnica...',
    detalles: [
      'Excelente acustica y concentracion',
      'Redes de aro en nylon de alta densidad',
      'Ideal para practicas libres o rutinas fisicas',
    ],
  },
  {
    id: 6,
    titulo: 'La Catedral del Basket',
    tipo: ['Baloncesto', 'Basquetbol 3x3'],
    superficie: 'Madera Deportiva',
    precio: '$30.000',
    tarifa: 30000,
    capacidad: 10,
    estado: 'Disponible',
    imagen: 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/canchas/baloncesto-coliseo.webp',
    descripcion: 'Espacio techado con pista reglamentaria y zona 3x3 para partidos rapidos...',
    detalles: [
      'Tableros homologados con red reglamentaria',
      'Iluminacion LED de alta intensidad',
      'Marcador electronico digital integrado',
    ],
  },
  {
    id: 7,
    titulo: 'Olas del Norte',
    tipo: ['Voley Playa', 'Voley Indoor'],
    superficie: 'Arena Sintetica',
    precio: '$28.000',
    tarifa: 28000,
    capacidad: 12,
    estado: 'Disponible',
    imagen: 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/canchas/padel-arena.webp',
    descripcion: 'Cancha de voley con arena sintetica de alta calidad y red reglamentaria...',
    detalles: [
      'Arena sintetica certificada para competencia',
      'Red ajustable para playa o indoor',
      'Sector de calentamiento lateral',
    ],
  },
  {
    id: 8,
    titulo: 'El Potrero Sintetico',
    tipo: ['Futbol 7', 'Futsal'],
    superficie: 'Cesped Sintetico 4G',
    precio: '$38.000',
    tarifa: 38000,
    capacidad: 14,
    estado: 'Mantenimiento',
    imagen: 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/canchas/futbol-estadio-principal.webp',
    descripcion: 'Cancha sintetica con dimensiones oficiales de futbol 7, en mantenimiento preventivo...',
    detalles: [
      'Cesped sintetico de ultima generacion 4G',
      'Dimensiones reglamentarias FIFA',
      'Actualmente en mantenimiento preventivo del cesped',
    ],
  },
  {
    id: 9,
    titulo: 'Los Cristales Padel Club',
    tipo: ['Padel', 'Padel Cross'],
    superficie: 'Cristal Templado Panoramico',
    precio: '$42.000',
    tarifa: 42000,
    capacidad: 4,
    estado: 'Disponible',
    imagen: 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/canchas/padel-arena.webp',
    descripcion: 'Club de padel con estructura panoramica y zona para padel cross...',
    detalles: [
      'Muro panoramico sin perfiles verticales',
      'Iluminacion cenital homologada',
      'Zona adaptada para padel cross y entrenamiento',
    ],
  },
  {
    id: 10,
    titulo: 'Tierra y Red',
    tipo: ['Tenis', 'Tenis de Mesa'],
    superficie: 'Polvo de Ladrillo',
    precio: '$32.000',
    tarifa: 32000,
    capacidad: 4,
    estado: 'Mantenimiento',
    imagen: 'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/canchas/tenis-las-palmas.webp',
    descripcion: 'Cancha de tenis con superficie de polvo de ladrillo en renovacion...',
    detalles: [
      'Superficie de arcilla roja natural',
      'Red reglamentaria con poste de acero',
      'Actualmente en proceso de nivelacion del court',
    ],
  },
];

export function obtenerCanchasMock() {
  const data = localStorage.getItem(CANCHAS_KEY);
  if (!data) {
    localStorage.setItem(CANCHAS_KEY, JSON.stringify(canchasIniciales));
    return canchasIniciales;
  }
  return JSON.parse(data);
}

export function guardarCanchasMock(canchas) {
  localStorage.setItem(CANCHAS_KEY, JSON.stringify(canchas));
}

const POSTS_KEY = 'galeria_posts_data';

export const postsIniciales = [
  {
    id: 1,
    name: 'Torneo tapitas',
    description: 'Torneo realizado el 2025 de abril a las 18:00 horas donde el campeon fue el equipo "Los Campeones"',
    urlPictures: [
      'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/torneodefutbol.jpg',
    ],
    eventDate: '2025-04-20',
  },
  {
    id: 2,
    name: 'Eliminaciones FutbolClub',
    description: 'En las eliminaciones del FutbolClub se enfrentaron los mejores equipos de la nacion.',
    urlPictures: [
      'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/eliminacionesfutbolclub.jpg',
    ],
    eventDate: '2025-05-12',
  },
  {
    id: 3,
    name: 'Torneo de tenis 2026',
    description: 'El torneo de tenis 2026 se reunieron los mejores jugadores del país y solo un jugador logró la victoria y fue del país de Estados Unidos.',
    urlPictures: [
      'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/torneotenis.jpg',
    ],
    eventDate: '2026-03-10',
  },
  {
    id: 4,
    name: 'Torneo de pádel 2024',
    description: 'Torneo de pádel compitiendo por el primer lugar entre muchos participantes.',
    urlPictures: [
      'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/padeljugando.jpg',
    ],
    eventDate: '2024-11-18',
  },
  {
    id: 5,
    name: 'Zona de Entrenamiento',
    description: 'Prepárate y mejora tus habilidades en nuestras modernas instalaciones.',
    urlPictures: [
      'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/entrenandoengym.jpg',
    ],
    eventDate: '2026-01-15',
  },
  {
    id: 6,
    name: 'Torneo de Baloncesto',
    description: 'En este torneo los mejores deportistas y estrellas del país compitieron en un entorno de alto nivel para ganar su primer lugar y título a nivel nacional.',
    urlPictures: [
      'https://raw.githubusercontent.com/CamiloBermeo/devPortes/refs/heads/main/assets/img/torneodebaloncesto.jpg',
    ],
    eventDate: '2026-04-15',
  },
];

export function obtenerPostsMock() {
  const data = localStorage.getItem(POSTS_KEY);
  if (!data) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(postsIniciales));
    return postsIniciales;
  }
  return JSON.parse(data);
}

export function guardarPostsMock(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

