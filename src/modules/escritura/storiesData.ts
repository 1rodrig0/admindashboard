export const stories = [
  {
    id: "h-001",
    title: "El Castillo sobre la Niebla",
    cover: "/covers/castillo.jpg",
    description:
      "Una academia militar en La Paz oculta un archivo de leyendas. A medida que los cadetes investigan, antiguos pactos despiertan.",
    author: "G. Lavadenz",
    genres: ["Fantasía", "Misterio"],
    tags: ["EMI", "La Paz", "lore andino", "castillo"],
    createdAt: "2025-10-20",
    updatedAt: "2025-11-03",
    chapters: [
      {
        id: "c-001",
        number: 1,
        title: "Niebla sobre Aranjuez",
        summary:
          "Presentación del campus y del símbolo del castillo. Aparece el primer mapa con símbolos.",
        isPublished: true,
        publishedAt: "2025-10-22",
      },
      {
        id: "c-002",
        number: 2,
        title: "El Archivo de Piedra",
        summary:
          "Un pasadizo conecta la biblioteca con una cámara sellada. Encuentran una urna con un sello quebrado.",
        isPublished: true,
        publishedAt: "2025-10-28",
      },
      {
        id: "c-003",
        number: 3,
        title: "Juramento de Sombras",
        summary:
          "La urna revela un contrato antiguo. El grupo debe decidir si romperlo o renovarlo.",
        isPublished: false,
      },
    ],
  },
  {
    id: "h-002",
    title: "Bitácora Kolla",
    description:
      "Crónicas de autores y lectores que construyen una comunidad digital con sabor paceño.",
    author: "R. Bautista",
    genres: ["Contemporáneo"],
    tags: ["comunidad", "tecnología", "lectura"],
    createdAt: "2025-10-10",
    updatedAt: "2025-11-01",
    chapters: [
      {
        id: "c-101",
        number: 1,
        title: "Primer Post",
        summary: "Presentación del proyecto y objetivos.",
        isPublished: true,
        publishedAt: "2025-10-12",
      },
      {
        id: "c-102",
        number: 2,
        title: "Diseño de la Biblioteca",
        summary: "Exploración de UI/UX, filtros y accesibilidad.",
        isPublished: false,
      },
    ],
  },
];
