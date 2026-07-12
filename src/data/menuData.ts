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
    id: "para-ti",
    nombre: "Para Ti",
    items: [
      {
        nombre: "1/4 Pollo a la Brasa",
        descripcion: "Incluye guarnición clásica mediana y ensalada personal.",
        precio: "S/.18.00",
        imagen: "/images/pollo_1_4.jpg"
      }
    ]
  },
  {
    id: "para-dos",
    nombre: "Para Dos",
    items: [
      {
        nombre: "1/2 Pollo a la Brasa",
        descripcion: "Incluye papas fritas, ensalada mediana y cremas.",
        precio: "S/.33.00",
        imagen: "/images/pollo_1_2.jpg"
      }
    ]
  },
  {
    id: "familiar",
    nombre: "Familiar",
    items: [
      {
        nombre: "1 Pollo a la Brasa",
        descripcion: "Incluye papas fritas, ensalada familiar y cremas.",
        precio: "S/.60.00",
        imagen: "/images/pollo_1.png"
      }
    ]
  },
  {
    id: "super-combos",
    nombre: "Super Combos",
    items: [
      {
        nombre: "Super Combo 1 Pollo",
        descripcion: "1 Pollo entero a la brasa + papas + ensalada + cremas + 1 gaseosa de 1.5 lt.",
        precio: "S/.69.00",
        imagen: "/images/super_combo_1_pollo.png"
      },
      {
        nombre: "Super Combo 1/2 Pollo",
        descripcion: "1/2 Pollo a la brasa + papas + ensalada + cremas + arroz chaufa O gaseosa de 1.5 lt.",
        precio: "Arroz Chaufa: S/.42.00 | Gaseosa 1.5 L: S/.42.00",
        imagen: "/images/super_combo_medio_pollo.jpg"
      },
      {
        nombre: "Super Combo 1 y 1/2 Pollo",
        descripcion: "1 Pollo + 1/2 pollo + papas + ensalada + cremas + arroz chaufa O gaseosa de 1.5 lt.",
        precio: "Arroz Chaufa: S/.99.00 | Gaseosa 1.5 L: S/.99.00",
        imagen: "/images/super_combo_1_y_medio_pollo.jpg"
      }
    ]
  },
  {
    id: "parrillas",
    nombre: "Parrillas",
    items: [
      {
        nombre: "1. La Favorita",
        descripcion: "1 chuleta de cerdo, 1 chorizo ahumado, 1/4 pollo a la brasa, papas fritas, ensalada y gaseosa 450 ml.",
        precio: "S/.51.90",
        imagen: "/images/la_favorita.jpg"
      },
      {
        nombre: "2. Bipersonal",
        descripcion: "1 CHURRASCO + 1 CHORIZO HIERBAS FINAS + 1 CHORIZO PARRILLERO + 1 ANTICUCHO DE RES + PAPAS FRITAS + ENSALADA + 2 GASEOSAS DE 500 ML.",
        precio: "S/.69.90",
        imagen: "/images/bipersonal.jpg"
      },
      {
        nombre: "3. Familiar",
        descripcion: "1 lomo fino, 1 filete de pechuga, 1 chuleta de cerdo, 2 anticuchos de corazón de res, 1 chorizo ahumado, 1 chorizo de pollo, 1/2 pollo a la brasa, papas fritas, ensalada y gaseosa 1.5 L.",
        precio: "S/.120.00",
        imagen: "/images/familiar.jpg"
      },
      {
        nombre: "Chuleta a la parrilla 250 gr",
        descripcion: "Chuleta tierna a la parrilla con papas fritas o sancochadas, ensalada y cremas.",
        precio: "S/.22.00",
        imagen: "/images/chuleta_parrilla_250g.jpg"
      },
      {
        nombre: "Churrasco a la parrilla 250 gr",
        descripcion: "Churrasco a la parrilla jugoso con papas fritas o sancochadas, ensalada y cremas.",
        precio: "S/.24.00",
        imagen: "/images/churrasco_parrilla_250g.png"
      },
      {
        nombre: "Pechuga a la parrilla 250 gr",
        descripcion: "Pechuga de pollo a la parrilla con papas fritas o sancochadas, ensalada y cremas.",
        precio: "S/.21.00",
        imagen: "/images/pechuga_parrilla_250g.png"
      },
      {
        nombre: "Mollejitas a la parrilla 250 gr",
        descripcion: "Mollejitas doradas a la parrilla con papas fritas o sancochadas, ensalada y cremas.",
        precio: "S/.20.00",
        imagen: "/images/mollejitas_parrilla_250g.png"
      },
      {
        nombre: "Anticuchos a la parrilla (2 palitos)",
        descripcion: "Dos palitos de anticuchos de res tiernos con papas fritas o sancochadas, ensalada y cremas.",
        precio: "S/.22.00",
        imagen: "/images/anticuchos_parrilla.png"
      }
    ]
  },
  {
    id: "bravaza-powers",
    nombre: "BravaZa Powers",
    items: [
      {
        nombre: "Mostrito",
        descripcion: "Plato combinado de la casa, de formato personal (chaufa, papas y pollo).",
        precio: "S/.14.00",
        imagen: "/images/mostrito.png"
      },
      {
        nombre: "Mostro",
        descripcion: "Plato combinado más contundente de la casa.",
        precio: "S/.21.00",
        imagen: "/images/mostro.jpg"
      },
      {
        nombre: "Brabaza Parrillera",
        descripcion: "Plato parrillero combinado de la casa. En la carta figura como 'Brabaza Parrillera'.",
        precio: "S/.25.00",
        imagen: "/images/bravaza_parrillera.jpg"
      }
    ]
  },
  {
    id: "especiales-bravaza",
    nombre: "Especiales BravaZa",
    items: [
      {
        nombre: "Chaufa de Pollo",
        descripcion: "Arroz chaufa preparado con trozos de pollo al estilo especial de la casa.",
        precio: "S/.20.00",
        imagen: "/images/chaufa_pollo.png"
      },
      {
        nombre: "Chaufa de Carne",
        descripcion: "Arroz chaufa preparado con tiernos trozos de carne de res.",
        precio: "S/.22.00",
        imagen: "/images/chaufa_carne.png"
      },
      {
        nombre: "Aeropuerto especial",
        descripcion: "Delicioso combinado de arroz chaufa, fideo tallarín saltado y frejolito chino.",
        precio: "S/.23.00",
        imagen: "/images/aeropuerto.jpg"
      }
    ]
  },
  {
    id: "fetuccinis",
    nombre: "Fetuccinis",
    items: [
      {
        nombre: "Fetuccini a la Huancaína",
        descripcion: "Fetuccini bañado en nuestra clásica salsa a la Huancaína. Selecciona tu complemento favorito.",
        precio: "S/.22.00",
        requiere_complemento: true,
        complementos: [
          { id: "cuarto-pollo", nombre: "1/4 de Pollo", precio: 22.00 },
          { id: "pechuga", nombre: "Pechuga", precio: 23.00 },
          { id: "chuleta", nombre: "Chuleta", precio: 24.00 },
          { id: "churrasco", nombre: "Churrasco", precio: 25.00 },
          { id: "lomo-saltado", nombre: "Lomo Saltado", precio: 25.00 }
        ],
        imagen: "/images/fetuccini_huancaina.jpg"
      },
      {
        nombre: "Fetuccini al Pesto",
        descripcion: "Fetuccini bañado en nuestra salsa verde al pesto. Selecciona tu complemento favorito.",
        precio: "S/.22.00",
        requiere_complemento: true,
        complementos: [
          { id: "cuarto-pollo", nombre: "1/4 de Pollo", precio: 22.00 },
          { id: "pechuga", nombre: "Pechuga", precio: 23.00 },
          { id: "chuleta", nombre: "Chuleta", precio: 24.00 },
          { id: "churrasco", nombre: "Churrasco", precio: 25.00 },
          { id: "lomo-saltado", nombre: "Lomo Saltado", precio: 25.00 }
        ],
        imagen: "/images/fetuccini_pesto.jpg"
      },
      {
        nombre: "Fetuccini a lo Alfredo",
        descripcion: "Fetuccini bañado en nuestra cremosa salsa Alfredo. Selecciona tu complemento favorito.",
        precio: "S/.22.00",
        requiere_complemento: true,
        complementos: [
          { id: "cuarto-pollo", nombre: "1/4 de Pollo", precio: 22.00 },
          { id: "pechuga", nombre: "Pechuga", precio: 25.00 },
          { id: "chuleta", nombre: "Chuleta", precio: 26.00 },
          { id: "churrasco", nombre: "Churrasco", precio: 26.00 },
          { id: "lomo-saltado", nombre: "Lomo Saltado", precio: 26.00 },
          { id: "pechuga-americana", nombre: "Pechuga Americana", precio: 26.00 }
        ],
        imagen: "/images/fetuccini_alfredo.png"
      }
    ]
  },
  {
    id: "platos-criollos",
    nombre: "Platos Criollos",
    items: [
      {
        nombre: "Lomo saltado",
        descripcion: "Jugoso lomo saltado con cebolla, tomate, papas fritas y arroz blanco.",
        precio: "S/.23.00",
        imagen: "/images/lomo_saltado.jpg"
      },
      {
        nombre: "Pollo saltado",
        descripcion: "Jugoso pollo saltado con cebolla, tomate, papas fritas y arroz blanco.",
        precio: "S/.20.00",
        imagen: "/images/pollo_saltado.jpg"
      },
      {
        nombre: "Tallarín saltado de pollo",
        descripcion: "Fideos salteados al wok con trozos de pollo y vegetales frescos.",
        precio: "S/.20.00",
        imagen: "/images/tallarin_saltado_pollo.jpg"
      },
      {
        nombre: "Tallarín saltado de carne",
        descripcion: "Fideos salteados al wok con trozos de carne y vegetales frescos.",
        precio: "S/.23.00",
        imagen: "/images/tallarin_saltado_carne.png"
      },
      {
        nombre: "Lomo saltado a la pobre",
        descripcion: "Lomo saltado tradicional acompañado con huevo frito, plátano frito y papas fritas.",
        precio: "S/.25.00",
        imagen: "/images/lomo_saltado_a_lo_pobre.jpg"
      },
      {
        nombre: "Pollo saltado a lo pobre",
        descripcion: "Pollo saltado tradicional acompañado con huevo frito, plátano frito y papas fritas.",
        precio: "S/.23.00",
        imagen: "/images/pollo_saltado_a_lo_pobre.png"
      },
      {
        nombre: "Bistec a lo pobre",
        descripcion: "Bistec a la plancha con arroz blanco, papas fritas, huevo frito y plátano frito.",
        precio: "S/.25.00",
        imagen: "/images/bistec_a_lo_pobre.jpg"
      },
      {
        nombre: "Pechuga a lo pobre",
        descripcion: "Pechuga de pollo a la plancha con arroz blanco, papas fritas, huevo frito y plátano frito.",
        precio: "S/.25.00",
        imagen: "/images/pechuga_a_lo_pobre.png"
      },
      {
        nombre: "Arroz a la cubana",
        descripcion: "Clásico plato de arroz blanco con plátano frito y huevo frito.",
        precio: "S/.15.00",
        imagen: "/images/arroz_cubana.jpg"
      }
    ]
  },
  {
    id: "caldos",
    nombre: "Caldos",
    items: [
      {
        nombre: "Caldo de Gallina",
        descripcion: "Caldo tradicional de gallina.",
        precio: "S/.14.00",
        imagen: "/images/caldo_gallina.jpg"
      },
      {
        nombre: "Dieta de Pollo",
        descripcion: "Sopa ligera de pollo.",
        precio: "S/.15.00",
        imagen: "/images/dieta_pollo.jpg"
      }
    ]
  },
  {
    id: "bravaza-kids",
    nombre: "BravaZa Kids",
    items: [
      {
        nombre: "1/8 Pollo a la Brasa",
        descripcion: "Incluye papas fritas y 1 vaso de chicha.",
        precio: "S/.13.50",
        imagen: "/images/pollo_1_8.jpg"
      },
      {
        nombre: "8 Nuggets Redondos",
        descripcion: "Incluye papas fritas y 1 vaso de chicha.",
        precio: "S/.13.50",
        imagen: "/images/nuggets_redondos.jpg"
      }
    ]
  },
  {
    id: "aperitivos-bravaza",
    nombre: "Aperitivos BravaZa",
    items: [
      {
        nombre: "Tequeños (pollo brasa + queso)",
        descripcion: "Tequeños crujientes rellenos de sabroso pollo a la brasa y queso derretido.",
        precio: "6 Unidades: S/.12.00 | 12 Unidades: S/.20.00",
        imagen: "/images/tequenos.png"
      },
      {
        nombre: "Salchipapas",
        descripcion: "Salchipapa clásica con hot dog y porción generosa de papas fritas crocantes.",
        precio: "S/.15.00",
        imagen: "/images/salchipapas.png"
      },
      {
        nombre: "SALCHIPAPA A LO Pobre",
        descripcion: "Nuestra clásica salchipapa montada con huevo y plátanos fritos.",
        precio: "S/.18.00",
        imagen: "/images/salchipapa_a_lo_pobre.png"
      },
      {
        nombre: "Alitas Broaster Crispy",
        descripcion: "Alitas de pollo super crujientes y doradas.",
        precio: "6 Piezas: S/.18.00 | 12 Piezas: S/.30.00",
        imagen: "/images/alitas_crispy.png"
      },
      {
        nombre: "Alitas Acevichadas",
        descripcion: "Alitas bañadas en una cremosa y refrescante salsa acevichada.",
        precio: "6 Piezas: S/.18.00 | 12 Piezas: S/.30.00",
        imagen: "/images/alitas_acevichadas.jpg"
      },
      {
        nombre: "Alitas a la BBQ",
        descripcion: "Alitas glaseadas en deliciosa salsa BBQ dulce y ahumada.",
        precio: "6 Piezas: S/.18.00 | 12 Piezas: S/.30.00",
        imagen: "/images/alitas_bbq.jpg"
      },
      {
        nombre: "Alitas Picantes",
        descripcion: "Alitas bañadas en salsa picante estilo BravaZa.",
        precio: "6 Piezas: S/.18.00 | 12 Piezas: S/.30.00",
        imagen: "/images/alitas_picantes.png"
      }
    ]
  },
  {
    id: "guarnicion",
    nombre: "Guarniciones",
    items: [
      {
        nombre: "Papas fritas",
        descripcion: "Porción grande de papas fritas crujientes.",
        precio: "S/.14.00",
        imagen: "/images/papas_fritas.png"
      },
      {
        nombre: "1/2 porción de papas fritas",
        descripcion: "Media porción de papas fritas.",
        precio: "S/.8.00",
        imagen: "/images/medio_papas_fritas.png"
      },
      {
        nombre: "Arroz blanco",
        descripcion: "Porción de arroz blanco bien graneado.",
        precio: "S/.5.50",
        imagen: "/images/arroz_blanco.jpg"
      },
      {
        nombre: "Plátanos fritos",
        descripcion: "Porción de plátanos fritos maduros y dulces.",
        precio: "S/.5.00",
        imagen: "/images/platanos_fritos.png"
      },
      {
        nombre: "Huevo frito",
        descripcion: "Un huevo frito perfecto.",
        precio: "S/.2.00",
        imagen: "/images/huevo_frito.png"
      },
      {
        nombre: "Ensalada Bravaza",
        descripcion: "Fresca ensalada mixta de la casa.",
        precio: "S/.5.00",
        imagen: "/images/ensalada_bravaza.jpg"
      },
      {
        nombre: "Nuggets (5 u)",
        descripcion: "Porción de 5 nuggets crujientes.",
        precio: "S/.8.00",
        imagen: "/images/nuggets.png"
      }
    ]
  },
  {
    id: "bebidas",
    nombre: "Bebidas",
    items: [
      {
        nombre: "Limonada",
        descripcion: "Refresco natural disponible en vaso o jarra.",
        precio: "Vaso: S/.7.00 | Jarra: S/.15.00",
        imagen: "/images/limonada.png"
      },
      {
        nombre: "Chicha",
        descripcion: "Chicha morada clásica disponible en vaso o jarra.",
        precio: "Vaso: S/.7.00 | Jarra: S/.15.00",
        imagen: "/images/chicha.png"
      },
      {
        nombre: "Maracuyá",
        descripcion: "Refresco natural de maracuyá en vaso o jarra.",
        precio: "Vaso: S/.7.00 | Jarra: S/.15.00",
        imagen: "/images/maracuya.png"
      },
      {
        nombre: "Frozen de frutos rojos",
        descripcion: "Bebida batida frozen sabor frutos rojos refrescante.",
        precio: "S/.10.00",
        imagen: "/images/frozen_frutos_rojos.png"
      },
      {
        nombre: "Frozen de chicha",
        descripcion: "Bebida batida frozen de deliciosa chicha morada.",
        precio: "S/.10.00",
        imagen: "/images/frozen_chicha.png"
      },
      {
        nombre: "Frozen de limon",
        descripcion: "Batido frozen refrescante a base de limón.",
        precio: "S/.10.00",
        imagen: "/images/frozen_limon.png"
      },
      {
        nombre: "Frozen de maracuyá",
        descripcion: "Batido frozen refrescante sabor maracuyá.",
        precio: "S/.10.00",
        imagen: "/images/frozen_maracuya.png"
      },
      {
        nombre: "Gaseosa personal pet (192 ml)",
        descripcion: "Selecciona el sabor de tu gaseosa personal.",
        precio: "S/.2.50",
        imagen: "/images/gaseosa_personal.png"
      },
      {
        nombre: "Inca Kola / Coca Cola 600 ml",
        descripcion: "Gaseosa personal de 600 ml (Regular o sin azúcar).",
        precio: "S/.5.90",
        imagen: "/images/gaseosa_600ml.png"
      },
      {
        nombre: "Inca Kola / Coca Cola 1.5 L",
        descripcion: "Gaseosa familiar de 1.5 litros.",
        precio: "S/.10.90",
        imagen: "/images/gaseosa_1_5l.jpg"
      },
      {
        nombre: "Infusiones",
        descripcion: "Té, anís y manzanilla.",
        precio: "Té: S/.3.50 | Anís: S/.3.50 | Manzanilla: S/.3.50",
        imagen: "/images/infusiones.jpg"
      },
      {
        nombre: "Agua personal San Luis",
        descripcion: "Botella San Luis de 625 ml, con o sin gas.",
        precio: "Agua con gas: S/.3.50 | Agua sin gas: S/.3.50",
        imagen: "/images/agua_personal.png"
      }
    ]
  },
  {
    id: "bebidas-alcohol",
    nombre: "Bebidas con Alcohol",
    items: [
      {
        nombre: "Cerveza Heineken 330 ML",
        descripcion: "Cerveza Heineken botella personal 330 ml.",
        precio: "S/.10.00",
        imagen: "/images/heineken_330ml.png"
      },
      {
        nombre: "Cerveza Corona 330 ML",
        descripcion: "Cerveza Corona botella personal 330 ml.",
        precio: "S/.10.00",
        imagen: "/images/corona_330ml.png"
      },
      {
        nombre: "Cerveza Cusqueña Trigo 310 ML",
        descripcion: "Cerveza Cusqueña Trigo de 310 ml.",
        precio: "S/.11.00",
        imagen: "/images/cusquena_trigo_310ml.png"
      },
      {
        nombre: "Cerveza Cusqueña Negra 310 ML",
        descripcion: "Cerveza Cusqueña Negra de 310 ml.",
        precio: "S/.12.00",
        imagen: "/images/cusquena_negra_310ml.png"
      },
      {
        nombre: "Cerveza PILSEN 305 ML",
        descripcion: "Cerveza Pilsen botella de 305 ml.",
        precio: "S/.9.00",
        imagen: "/images/pilsen_305ml.png"
      },
      {
        nombre: "PILSEN LATON X 473 ML",
        descripcion: "Cerveza Pilsen en lata grande de 473 ml.",
        precio: "S/.7.50",
        imagen: "/images/pilsen_laton_473ml.png"
      }
    ]
  },
  {
    id: "happy-day",
    nombre: "Happy Day (2 x S/.30)",
    items: [
      {
        nombre: "Chilcanos clásico y maracuyá",
        descripcion: "Refrescantes chilcanos (2 x S/.30.00 todo el día). Selecciona el sabor.",
        precio: "Individual (Clásico): S/.18.00 | Individual (Maracuyá): S/.18.00 | X2 (Promo): S/.30.00",
        imagen: "/images/chilcanos_clasico_maracuya.png"
      },
      {
        nombre: "Mojitos clásico",
        descripcion: "Mojito tradicional con ron, limón y menta (2 x S/.30.00 todo el día).",
        precio: "Individual: S/.18.00 | X2: S/.30.00",
        imagen: "/images/mojitos_clasico.jpg"
      },
      {
        nombre: "Cuba libre",
        descripcion: "Cuba libre tradicional con ron, limón y gaseosa cola (2 x S/.30.00 todo el día).",
        precio: "Individual: S/.18.00 | X2: S/.30.00",
        imagen: "/images/cuba_libre.jpg"
      },
      {
        nombre: "Sour DE MARACUYÁ",
        descripcion: "Pisco sour peruano sabor maracuyá (2 x S/.30.00 todo el día).",
        precio: "Individual: S/.18.00 | X2: S/.30.00",
        imagen: "/images/sour_de_maracuya.png"
      },
      {
        nombre: "Sour DE CLASICO",
        descripcion: "Clásico pisco sour peruano espumoso (2 x S/.30.00 todo el día).",
        precio: "Individual: S/.18.00 | X2: S/.30.00",
        imagen: "/images/sour_de_clasico.jpg"
      },
      {
        nombre: "Daiquieri de durazno",
        descripcion: "Exquisito y dulce daiquiri licuado de durazno.",
        precio: "S/.19.00",
        imagen: "/images/daiquiri_durazno.png"
      },
      {
        nombre: "Sangria de 1 lt",
        descripcion: "Jarra de Sangría refrescante de 1 litro ideal para compartir.",
        precio: "S/.35.00",
        imagen: "/images/sangria_1l.png"
      }
    ]
  }
];
