export interface Dish {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: string;
  requiere_complemento?: boolean;
  complementos?: {
    id: string;
    nombre: string;
    precio: number;
  }[];
}

export interface Category {
  id: string;
  nombre: string;
  items: Dish[];
}

export const DEFAULT_MENU_DATA: Category[] = [
  {
    id: "para-comenzar",
    nombre: "Para comenzar",
    items: [
      {
        nombre: "Alitas",
        precio: "S/22.00",
        descripcion: "8 unidades."
      },
      {
        nombre: "Chicharrón de pollo",
        precio: "S/20.00",
        descripcion: ""
      },
      {
        nombre: "Salchipapa",
        precio: "S/15.00",
        descripcion: ""
      },
      {
        nombre: "Tequeños Bravazas",
        precio: "S/16.00",
        descripcion: "8 unidades."
      }
    ]
  },
  {
    id: "criollos",
    nombre: "Criollos",
    items: [
      {
        nombre: "Lomo saltado",
        precio: "S/28.00",
        descripcion: ""
      },
      {
        nombre: "Pollo saltado",
        precio: "S/22.00",
        descripcion: ""
      },
      {
        nombre: "Tallarín saltado de pollo",
        precio: "S/25.00",
        descripcion: ""
      },
      {
        nombre: "Tallarín saltado de carne",
        precio: "S/28.00",
        descripcion: ""
      },
      {
        nombre: "Lomo saltado a lo pobre",
        precio: "S/32.00",
        descripcion: ""
      },
      {
        nombre: "Churrasco a lo pobre",
        precio: "S/30.00",
        descripcion: ""
      },
      {
        nombre: "Pechuga a lo pobre",
        precio: "S/27.00",
        descripcion: ""
      },
      {
        nombre: "Chaufa de pollo",
        precio: "S/20.00",
        descripcion: "",
        imagen: "/images/chaufa_pollo.png"
      },
      {
        nombre: "Chaufa de carne",
        precio: "S/25.00",
        descripcion: "",
        imagen: "/images/chaufa_carne.png"
      },
      {
        nombre: "Chaufa mixto",
        precio: "S/28.00",
        descripcion: ""
      },
      {
        nombre: "Aeropuerto especial",
        precio: "S/28.00",
        descripcion: "",
        imagen: "/images/aeropuerto.jpg"
      }
    ]
  },
  {
    id: "pastas-bravazas",
    nombre: "Pastas Bravazas",
    items: [
      {
        nombre: "Brasa en pasta",
        precio: "S/25.00",
        descripcion: "Salsa a elección: pesto, huancaína o Alfredo.",
        requiere_complemento: true,
        complementos: [
          { id: "pesto", nombre: "Salsa Pesto", precio: 0 },
          { id: "huancaina", nombre: "Salsa Huancaína", precio: 0 },
          { id: "alfredo", nombre: "Salsa Alfredo", precio: 0 }
        ]
      },
      {
        nombre: "Churrasco en pasta",
        precio: "S/31.00",
        descripcion: "Salsa a elección: pesto, huancaína o Alfredo.",
        requiere_complemento: true,
        complementos: [
          { id: "pesto", nombre: "Salsa Pesto", precio: 0 },
          { id: "huancaina", nombre: "Salsa Huancaína", precio: 0 },
          { id: "alfredo", nombre: "Salsa Alfredo", precio: 0 }
        ]
      },
      {
        nombre: "Pechuga en pasta",
        precio: "S/27.00",
        descripcion: "Salsa a elección: pesto, huancaína o Alfredo.",
        requiere_complemento: true,
        complementos: [
          { id: "pesto", nombre: "Salsa Pesto", precio: 0 },
          { id: "huancaina", nombre: "Salsa Huancaína", precio: 0 },
          { id: "alfredo", nombre: "Salsa Alfredo", precio: 0 }
        ]
      },
      {
        nombre: "Lomo en pasta",
        precio: "S/30.00",
        descripcion: "Salsa a elección: pesto, huancaína o Alfredo.",
        requiere_complemento: true,
        complementos: [
          { id: "pesto", nombre: "Salsa Pesto", precio: 0 },
          { id: "huancaina", nombre: "Salsa Huancaína", precio: 0 },
          { id: "alfredo", nombre: "Salsa Alfredo", precio: 0 }
        ]
      }
    ]
  },
  {
    id: "del-horno-a-tu-mesa",
    nombre: "Del horno a tu mesa",
    items: [
      {
        nombre: "1/4 pollo + papas + ensalada",
        precio: "S/18.00",
        descripcion: "",
        imagen: "/images/pollo_1_4.jpg"
      },
      {
        nombre: "1/4 chaufero",
        precio: "S/24.00",
        descripcion: "1/4 de pollo, chaufa, papas, ensalada y cremas."
      },
      {
        nombre: "1/4 parrillero",
        precio: "S/22.00",
        descripcion: "1/4 de pollo, chorizo, papas, ensalada y cremas."
      },
      {
        nombre: "1/4 anticuchero",
        precio: "S/24.00",
        descripcion: "1/4 de pollo, anticuchos, papas, ensalada y cremas."
      },
      {
        nombre: "1/2 pollo + papas + ensalada",
        precio: "S/34.00",
        descripcion: "",
        imagen: "/images/pollo_1_2.jpg"
      },
      {
        nombre: "1 pollo + papas + ensalada",
        precio: "S/60.00",
        descripcion: "",
        imagen: "/images/pollo_1.png"
      }
    ]
  },
  {
    id: "para-los-engreídos",
    nombre: "Para los engreídos",
    items: [
      {
        nombre: "1/8 pollo + papas + ensalada + chicha",
        precio: "S/14.00",
        descripcion: "",
        imagen: "/images/pollo_1_8.jpg"
      },
      {
        nombre: "8 nuggets + papas + chicha",
        precio: "S/14.00",
        descripcion: "",
        imagen: "/images/nuggets_redondos.jpg"
      }
    ]
  },
  {
    id: "caldos",
    nombre: "Caldos",
    items: [
      {
        nombre: "Caldo de gallina",
        precio: "S/15.00",
        descripcion: "",
        imagen: "/images/caldo_gallina.jpg"
      },
      {
        nombre: "Dieta de pollo",
        precio: "S/15.00",
        descripcion: "",
        imagen: "/images/dieta_pollo.jpg"
      }
    ]
  },
  {
    id: "guarniciones",
    nombre: "Guarniciones",
    items: [
      {
        nombre: "Porción de papas",
        precio: "S/14.00",
        descripcion: "",
        imagen: "/images/papas_fritas.png"
      },
      {
        nombre: "1/2 porción de papas",
        precio: "S/8.00",
        descripcion: ""
      },
      {
        nombre: "Porción de arroz blanco",
        precio: "S/5.50",
        descripcion: "",
        imagen: "/images/arroz_blanco.jpg"
      },
      {
        nombre: "Plátano frito",
        precio: "S/5.00",
        descripcion: ""
      },
      {
        nombre: "Huevo frito",
        precio: "S/3.00",
        descripcion: ""
      },
      {
        nombre: "Ensalada Bravaza",
        precio: "S/10.00",
        descripcion: ""
      }
    ]
  },
  {
    id: "entradas-parrilleras-y-cortes",
    nombre: "Entradas parrilleras y cortes",
    items: [
      {
        nombre: "Anticuchos",
        precio: "S/24.00",
        descripcion: "Acompañados de papas sancochadas y choclo."
      },
      {
        nombre: "Mollejitas 250 gr",
        precio: "S/20.00",
        descripcion: "Acompañadas de papas fritas and ensalada."
      },
      {
        nombre: "Chorizo finas hierbas",
        precio: "S/18.00",
        descripcion: "Acompañado de papas fritas."
      },
      {
        nombre: "Pechuga 250 gr",
        precio: "S/24.00",
        descripcion: "Acompañada de papas fritas y ensalada."
      },
      {
        nombre: "Pechuga rellena",
        precio: "S/30.00",
        descripcion: "Rellena de tocino, jamón y queso; acompañada de papas y ensalada."
      },
      {
        nombre: "Pechuga light",
        precio: "S/25.00",
        descripcion: "Acompañada de verduras frescas y palta."
      },
      {
        nombre: "Chuleta 250 gr",
        precio: "S/24.00",
        descripcion: "Acompañada de papas fritas y ensalada con palta."
      },
      {
        nombre: "Churrasco 250 gr",
        precio: "S/26.00",
        descripcion: "Acompañado de papas fritas y ensalada con palta."
      },
      {
        nombre: "Bife ancho 300 gr",
        precio: "S/43.00",
        descripcion: "Acompañado de papas fritas y ensalada con palta."
      },
      {
        nombre: "Bife angosto 300 gr",
        precio: "S/43.00",
        descripcion: "Acompañado de papas fritas y ensalada con palta."
      },
      {
        nombre: "Picaña 300 gr",
        precio: "S/46.00",
        descripcion: "Acompañada de papas fritas y ensalada con palta."
      }
    ]
  },
  {
    id: "parrillas-familiares",
    nombre: "Parrillas familiares",
    items: [
      {
        nombre: "Parrilla Pareja",
        precio: "S/80.00",
        descripcion: "Incluye 1/4 de pollo, 1 churrasco, 1 chuleta, 1 molleja, 1 porción de anticuchos, 1 chorizo finas hierbas, papas y ensalada con palta."
      },
      {
        nombre: "Parrilla Bravaza",
        precio: "S/130.00",
        descripcion: "Incluye 1/2 pollo, 1 churrasco, 1 chuleta, 1 pechuga, 1 molleja, 1 anticucho, 2 chorizos finas hierbas, papas y ensalada con palta."
      },
      {
        nombre: "Parrilla Premium",
        precio: "S/140.00",
        descripcion: "Incluye 1 bife ancho, 1 bife angosto, 1 picaña, 3 chorizos finas hierbas, vino, papas y ensalada de palta."
      }
    ]
  },
  {
    id: "cocteles-happy-day",
    nombre: "Cócteles / Happy Day",
    items: [
      {
        nombre: "Pisco sour clásico",
        precio: "S/18.00",
        descripcion: ""
      },
      {
        nombre: "Pisco sour de maracuyá",
        precio: "S/18.00",
        descripcion: ""
      },
      {
        nombre: "Chilcano clásico",
        precio: "S/18.00",
        descripcion: ""
      },
      {
        nombre: "Chilcano de maracuyá",
        precio: "S/18.00",
        descripcion: ""
      },
      {
        nombre: "Piña colada",
        precio: "S/20.00",
        descripcion: ""
      },
      {
        nombre: "Algarrobina",
        precio: "S/20.00",
        descripcion: ""
      },
      {
        nombre: "Daiquiri de durazno",
        precio: "S/18.00",
        descripcion: ""
      },
      {
        nombre: "Mojito",
        precio: "S/19.00",
        descripcion: ""
      },
      {
        nombre: "Cuba libre",
        precio: "S/18.00",
        descripcion: ""
      },
      {
        nombre: "Sangría 1 litro",
        precio: "S/30.00",
        descripcion: ""
      }
    ]
  },
  {
    id: "vinos-y-cervezas",
    nombre: "Vinos y cervezas",
    items: [
      {
        nombre: "Tacama Rose Semi Seco",
        precio: "S/40.00",
        descripcion: ""
      },
      {
        nombre: "Tacama Amore de Ica",
        precio: "S/45.00",
        descripcion: ""
      },
      {
        nombre: "Tabernero Vittoria Rose",
        precio: "S/45.00",
        descripcion: ""
      },
      {
        nombre: "Casillero del Diablo Carmenere",
        precio: "S/60.00",
        descripcion: ""
      },
      {
        nombre: "Tacama Gran Tinto",
        precio: "S/50.00",
        descripcion: ""
      },
      {
        nombre: "Queirolo Borgoña",
        precio: "S/35.00",
        descripcion: ""
      },
      {
        nombre: "Queirolo Rose",
        precio: "S/35.00",
        descripcion: ""
      },
      {
        nombre: "Corona / Heineken",
        precio: "S/10.00",
        descripcion: ""
      },
      {
        nombre: "Cusqueña Trigo",
        precio: "S/10.00",
        descripcion: ""
      },
      {
        nombre: "Cusqueña Negra",
        precio: "S/11.00",
        descripcion: ""
      },
      {
        nombre: "Pilsen",
        precio: "S/9.00",
        descripcion: ""
      },
      {
        nombre: "Pilsen lata",
        precio: "S/7.50",
        descripcion: ""
      }
    ]
  },
  {
    id: "gaseosas",
    nombre: "Gaseosas",
    items: [
      {
        nombre: "Gaseosa personal 192 ml",
        precio: "S/2.50",
        descripcion: ""
      },
      {
        nombre: "Gaseosa 600 ml",
        precio: "S/6.00",
        descripcion: "",
        imagen: "/images/gaseosa_600ml.png"
      },
      {
        nombre: "Gaseosa 1 1/2 L",
        precio: "S/12.00",
        descripcion: "",
        imagen: "/images/gaseosa_1_5l.jpg"
      },
      {
        nombre: "Agua mineral",
        precio: "S/3.50",
        descripcion: "",
        imagen: "/images/agua_personal.png"
      }
    ]
  },
  {
    id: "bebidas-naturales",
    nombre: "Bebidas naturales",
    items: [
      {
        nombre: "Limonada",
        precio: "S/7.00",
        descripcion: "Presentación en vaso.",
        imagen: "/images/limonada.png"
      },
      {
        nombre: "Limonada",
        precio: "S/15.00",
        descripcion: "Presentación en jarra.",
        imagen: "/images/limonada.png"
      },
      {
        nombre: "Chicha",
        precio: "S/7.00",
        descripcion: "Presentación en vaso.",
        imagen: "/images/chicha.png"
      },
      {
        nombre: "Chicha",
        precio: "S/15.00",
        descripcion: "Presentación en jarra.",
        imagen: "/images/chicha.png"
      },
      {
        nombre: "Maracuyá",
        precio: "S/7.00",
        descripcion: "Presentación en vaso.",
        imagen: "/images/maracuya.png"
      },
      {
        nombre: "Maracuyá",
        precio: "S/15.00",
        descripcion: "Presentación en jarra.",
        imagen: "/images/maracuya.png"
      },
      {
        nombre: "Naranjada",
        precio: "S/7.00",
        descripcion: "Presentación en vaso."
      },
      {
        nombre: "Naranjada",
        precio: "S/15.00",
        descripcion: "Presentación en jarra."
      }
    ]
  },
  {
    id: "frozen",
    nombre: "Frozen",
    items: [
      {
        nombre: "Frutos rojos",
        precio: "S/10.00",
        descripcion: ""
      },
      {
        nombre: "Chicha",
        precio: "S/10.00",
        descripcion: ""
      },
      {
        nombre: "Maracuyá",
        precio: "S/10.00",
        descripcion: ""
      },
      {
        nombre: "Limón",
        precio: "S/10.00",
        descripcion: ""
      }
    ]
  }
];
