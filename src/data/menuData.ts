export interface Dish {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: string;
}

export interface Category {
  id: string;
  nombre: string;
  items: Dish[];
}

export const DEFAULT_MENU_DATA: Category[] = [
  {
    id: "para-empezar",
    nombre: "Para Empezar",
    items: [
      {
        nombre: "Cevichop Clásico",
        descripcion: "Clásica leche de tigre, acompaña chicharrón de pota.",
        precio: "S/.19.00",
        imagen: ""
      },
      {
        nombre: "Leche en Salsa de Rocoto",
        descripcion: "Leche en salsa de rocoto en chicharrón de pota.",
        precio: "S/.24.00",
        imagen: ""
      },
      {
        nombre: "Leche Cinco Fuegos",
        descripcion: "Mega copa de leche de tigre con pescado o mariscos flameados.",
        precio: "S/.29.00",
        imagen: ""
      },
      {
        nombre: "Causa Marina",
        descripcion: "Clásica base de papa amarilla acompañada de mariscos flameados.",
        precio: "S/.26.00",
        imagen: ""
      },
      {
        nombre: "Causa de Langostinos al Panko en Salsa Golf",
        descripcion: "Clásica base de papa amarilla con langostinos crocantes en salsa golf.",
        precio: "S/.28.00",
        imagen: ""
      },
      {
        nombre: "Pulpitos a la Chalaca",
        descripcion: "Pulpo en salsa con cebolla, tomate y ají amarillo.",
        precio: "S/.26.00",
        imagen: ""
      },
      {
        nombre: "Pulpo al Olivo",
        descripcion: "Pulpo en salsa al olivo, acompaña palta y soda.",
        precio: "S/.30.00",
        imagen: ""
      }
    ]
  },
  {
    id: "tequenos",
    nombre: "Tequeños",
    items: [
      {
        nombre: "Tequeños Napolitanos",
        descripcion: "Tequeños rellenos de jamón y queso, acompaña crema de palta.",
        precio: "S/.14.00",
        imagen: ""
      },
      {
        nombre: "Tequeños de Ají de Gallina",
        descripcion: "Tequeños de ají de gallina, acompaña crema de palta.",
        precio: "S/.16.00",
        imagen: ""
      },
      {
        nombre: "Tequeños de Lomo Fino",
        descripcion: "Tequeños de lomo fino saltado, acompaña crema de palta.",
        precio: "S/.18.00",
        imagen: ""
      },
      {
        nombre: "Tequeños de Cinco Fuegos",
        descripcion: "Combinación de 15 tequeños en todos los sabores disponibles.",
        precio: "S/.24.00",
        imagen: ""
      }
    ]
  },
  {
    id: "ceviches",
    nombre: "Ceviches",
    items: [
      {
        nombre: "Ceviche Clásico / Norteño",
        descripcion: "Ceviche de la casa o al estilo norteño con limón y sal.",
        precio: "S/.30.00",
        imagen: "/images/ceviche.png"
      },
      {
        nombre: "Ceviche Carretillero",
        descripcion: "Ceviche clásico acompañado de chicharrón de pota.",
        precio: "S/.34.00",
        imagen: "/images/ceviche.png"
      },
      {
        nombre: "Ceviche Mixto",
        descripcion: "Frutos del mar acompañado de pesca del día.",
        precio: "S/.36.00",
        imagen: ""
      },
      {
        nombre: "Ceviche Cinco Fuegos",
        descripcion: "Cantidad de frutos del mar flameados en crema de rocoto.",
        precio: "S/.42.00",
        imagen: ""
      }
    ]
  },
  {
    id: "fondos-marinos",
    nombre: "Fondos Marinos",
    items: [
      {
        nombre: "Sudado de Pescado",
        descripcion: "Pescado grillado, ajíes flameados al sudado fumet y guarnición.",
        precio: "S/.28.00 / S/.38.00",
        imagen: ""
      },
      {
        nombre: "Pescado en Salsa de Ajo",
        descripcion: "Pescado entero o filete en salsa blanca de ajo y champiñones.",
        precio: "S/.32.00 / S/.42.00",
        imagen: ""
      },
      {
        nombre: "Pescado en Salsa a lo Macho",
        descripcion: "Pescado entero o filete bañado en salsa de mariscos picante.",
        precio: "S/.36.00 / S/.46.00",
        imagen: ""
      },
      {
        nombre: "Parihuela Especial",
        descripcion: "Mariscos flameados, filete o pescado entero, jaiba y guarnición.",
        precio: "S/.45.00 / S/.55.00",
        imagen: ""
      },
      {
        nombre: "Chicharrón de Pescado",
        descripcion: "Trozos de pescado crocantes, acompaña yuca y sarza criolla.",
        precio: "S/.28.00",
        imagen: ""
      },
      {
        nombre: "Chaufa de Mariscos",
        descripcion: "Arroz frito al wok con huevo y mariscos en salsa oriental.",
        precio: "S/.30.00",
        imagen: ""
      },
      {
        nombre: "Trucha en Salsa a la Menier",
        descripcion: "Filete de trucha en salsa blanca con ajo y perejil.",
        precio: "S/.32.00",
        imagen: ""
      },
      {
        nombre: "Chicharrón Mixto",
        descripcion: "Trozos de pescado y mariscos crocantes con sarza criolla.",
        precio: "S/.35.00",
        imagen: ""
      },
      {
        nombre: "Arroz con Marisco",
        descripcion: "Cremoso arroz con mariscos flameados en pisco.",
        precio: "S/.35.00",
        imagen: "/images/arroz_mariscos.png"
      },
      {
        nombre: "Fetuccinni en Salsa de Mariscos",
        descripcion: "Fetuccinni acompañado de salsa de mariscos frescos a la diabla o regular.",
        precio: "S/.38.00",
        imagen: ""
      },
      {
        nombre: "Tacu - Tacu en Salsa de Mariscos",
        descripcion: "Tacu - Tacu dorado montado en salsa de mariscos a lo macho.",
        precio: "S/.40.00",
        imagen: ""
      }
    ]
  },
  {
    id: "arma-tu-combo",
    nombre: "Arma tu Combo",
    items: [
      {
        nombre: "Matrimonio Marino",
        descripcion: "Causa de mariscos más lomo fino saltado.",
        precio: "S/.40.00",
        imagen: ""
      },
      {
        nombre: "Divorcio Marino",
        descripcion: "Lomo fino saltado más ceviche clásico.",
        precio: "S/.36.00",
        imagen: ""
      },
      {
        nombre: "Duo Marino",
        descripcion: "Combo de 2 opciones a elección: ceviche clásico, arroz con mariscos, chaufa de mariscos, chicharrón de pescado, causa acevichada o frutos del mar.",
        precio: "S/.35.00",
        imagen: ""
      },
      {
        nombre: "Trio Marino",
        descripcion: "Combo de 3 opciones a elección: ceviche clásico, arroz con mariscos, chaufa de mariscos, chicharrón de pescado, causa acevichada o frutos del mar.",
        precio: "S/.45.00",
        imagen: ""
      }
    ]
  },
  {
    id: "criollos",
    nombre: "Criollos",
    items: [
      {
        nombre: "Ají de Pollo",
        descripcion: "Clásico ají de pollo al estilo del restaurante.",
        precio: "S/.32.00",
        imagen: ""
      },
      {
        nombre: "Lomitos de Cordero",
        descripcion: "300 gr de lomitos de cordero acompañado de guarnición.",
        precio: "S/.34.00",
        imagen: ""
      },
      {
        nombre: "Lomo Fino Saltado",
        descripcion: "Trozos de lomo fino flameados, cebolla, ají amarillo, papas y arroz.",
        precio: "S/.38.00",
        imagen: "/images/lomo_saltado.png"
      },
      {
        nombre: "Medallón de Lomo Fino con Puré",
        descripcion: "Corte de medallón de lomo fino acompañado de puré de la casa.",
        precio: "S/.40.00",
        imagen: ""
      },
      {
        nombre: "Costillar Dorado",
        descripcion: "Cordero candaraveño dorado, acompaña papas doradas y sarza.",
        precio: "S/.42.00",
        imagen: ""
      },
      {
        nombre: "Tacu Tacu con Lomo a lo Pobre",
        descripcion: "Crocante arroz de tacu - tacu montado en lomo fino saltado.",
        precio: "S/.42.00",
        imagen: ""
      }
    ]
  },
  {
    id: "pastas",
    nombre: "Pastas",
    items: [
      {
        nombre: "Rigatoni en Salsa a la Bolognesa",
        descripcion: "Fideos rigatoni en salsa de tomate al estilo del restaurante.",
        precio: "S/.38.00",
        imagen: ""
      },
      {
        nombre: "Fetuccini al Pesto / Huancaína con Lomo Fino",
        descripcion: "Lomo fino saltado con fetuccini en salsa al pesto o a la huancaína.",
        precio: "S/.38.00",
        imagen: ""
      },
      {
        nombre: "Tallarín Saltado 5 Fuegos",
        descripcion: "Tallarines al wok con lomo fino, frutos del mar y pollo.",
        precio: "S/.42.00",
        imagen: ""
      }
    ]
  },
  {
    id: "alitas",
    nombre: "Alitas",
    items: [
      {
        nombre: "Alitas al Grill",
        descripcion: "Alitas sazonadas al grill, papas nativas o fritas.",
        precio: "S/.22.00",
        imagen: ""
      },
      {
        nombre: "Alitas BBQ / BBQ Hot",
        descripcion: "Alitas en salsa BBQ con o sin picante más papas nativas o fritas.",
        precio: "S/.25.00",
        imagen: "/images/alitas.png"
      },
      {
        nombre: "Alitas Acevichadas",
        descripcion: "Alitas crocantes bañadas en salsa acevichada.",
        precio: "S/.25.00",
        imagen: ""
      },
      {
        nombre: "Alitas Cinco Fuegos",
        descripcion: "Puedes combinar 3 sabores de alitas a elección.",
        precio: "S/.40.00",
        imagen: ""
      }
    ]
  },
  {
    id: "kids-promo-jr",
    nombre: "Kids / Promo Jr",
    items: [
      {
        nombre: "Hamburguesa Clásica",
        descripcion: "Hamburguesa al grill, acompaña papas crocantes.",
        precio: "S/.15.00",
        imagen: ""
      },
      {
        nombre: "Chicharrón de Pollo",
        descripcion: "Trozos de pollo acompañado de guarnición.",
        precio: "S/.19.00",
        imagen: ""
      },
      {
        nombre: "Nuggets",
        descripcion: "Clásicos trozos de pollo deshuesados y empanizados.",
        precio: "S/.20.00",
        imagen: ""
      },
      {
        nombre: "Milanesa + (2) Bolas Helados + Jugo del Día",
        descripcion: "Filete de pollo al panko acompañado de papas, dos bolas de helado y jugo del día.",
        precio: "S/.30.00",
        imagen: ""
      }
    ]
  },
  {
    id: "salchipapas",
    nombre: "Salchipapas",
    items: [
      {
        nombre: "Clásica",
        descripcion: "Salchichas al estilo del restaurante con papas fritas crocantes.",
        precio: "S/.15.00",
        imagen: ""
      },
      {
        nombre: "La Chorri",
        descripcion: "Salchichas y chorizo sazonados con papas fritas crocantes.",
        precio: "S/.17.00",
        imagen: ""
      },
      {
        nombre: "La Braseada",
        descripcion: "Salchicha, chorizo, pollo desmenuzado a la brasa y papas fritas.",
        precio: "S/.19.00",
        imagen: ""
      }
    ]
  },
  {
    id: "bebidas",
    nombre: "Bebidas",
    items: [
      {
        nombre: "Limonada",
        descripcion: "Bebida refrescante de limón.",
        precio: "1 LT: S/.14.00 | 1 1/2: S/.18.00",
        imagen: ""
      },
      {
        nombre: "Limonada / Hierba Buena",
        descripcion: "Limonada con hierba buena.",
        precio: "1 LT: S/.14.00 | 1 1/2: S/.18.00",
        imagen: ""
      },
      {
        nombre: "Maracuyá",
        descripcion: "Bebida natural de maracuyá.",
        precio: "1 LT: S/.14.00 | 1 1/2: S/.18.00",
        imagen: ""
      },
      {
        nombre: "Maracumango",
        descripcion: "Bebida frutal de maracuyá con mango.",
        precio: "1 LT: S/.16.00 | 1 1/2: S/.18.00",
        imagen: ""
      },
      {
        nombre: "Mango",
        descripcion: "Bebida natural de mango.",
        precio: "1 LT: S/.14.00 | 1 1/2: S/.18.00",
        imagen: ""
      },
      {
        nombre: "Fresa",
        descripcion: "Bebida natural de fresa.",
        precio: "1 LT: S/.14.00 | 1 1/2: S/.18.00",
        imagen: ""
      },
      {
        nombre: "Chicha Morada",
        descripcion: "Bebida tradicional peruana de maíz morado.",
        precio: "1 LT: S/.16.00 | 1 1/2: S/.19.00",
        imagen: ""
      },
      {
        nombre: "Piña",
        descripcion: "Bebida natural de piña.",
        precio: "1 LT: S/.15.00 | 1 1/2: S/.19.00",
        imagen: ""
      }
    ]
  },
  {
    id: "tradicionales",
    nombre: "Tradicionales",
    items: [
      {
        nombre: "Pisco Sour",
        descripcion: "Pisco, limón, jarabe de azúcar y clara de huevo.",
        precio: "S/.16.00",
        imagen: ""
      },
      {
        nombre: "Tacna Sour",
        descripcion: "Pisco, licor de damasco, limón y clara de huevo.",
        precio: "S/.16.00",
        imagen: ""
      },
      {
        nombre: "Algarrobina",
        descripcion: "Pisco, leche, algarrobina y licor de cacao.",
        precio: "S/.16.00",
        imagen: ""
      },
      {
        nombre: "Chilcano",
        descripcion: "Pisco, bitter de cítricos y ginger ale.",
        precio: "S/.16.00",
        imagen: ""
      },
      {
        nombre: "Mojito",
        descripcion: "Ron, zumo de fruta de estación y hierba buena.",
        precio: "S/.17.00",
        imagen: ""
      },
      {
        nombre: "Piña Colada",
        descripcion: "Ron, zumo de piña y crema de coco.",
        precio: "S/.17.00",
        imagen: ""
      },
      {
        nombre: "Negroni",
        descripcion: "London Dry Gin, Campari y Vermouth Rosso.",
        precio: "S/.17.00",
        imagen: ""
      },
      {
        nombre: "Gin Tonic",
        descripcion: "London Dry Gin y agua tónica.",
        precio: "S/.20.00",
        imagen: ""
      },
      {
        nombre: "Orgasmo",
        descripcion: "Báileys, amaretto y licor de café.",
        precio: "S/.17.00",
        imagen: ""
      },
      {
        nombre: "Ruso Blanco / Negro",
        descripcion: "Vodka, licor de café y crema de leche.",
        precio: "S/.17.00",
        imagen: ""
      },
      {
        nombre: "Clavo Oxidado",
        descripcion: "Whisky escocés y Drambuie.",
        precio: "S/.17.00",
        imagen: ""
      },
      {
        nombre: "Padrino",
        descripcion: "Whisky escocés y Amaretto.",
        precio: "S/.17.00",
        imagen: ""
      },
      {
        nombre: "Té Piteado",
        descripcion: "Amaretto, té canela y clavo, pisco o whisky.",
        precio: "S/.17.00",
        imagen: ""
      },
      {
        nombre: "Manhattan",
        descripcion: "Bourbon, Vermouth Rosso y bitter Angostura.",
        precio: "S/.16.00",
        imagen: ""
      },
      {
        nombre: "Margarita",
        descripcion: "Tequila, Cointreau y zumo de limón.",
        precio: "S/.16.00",
        imagen: ""
      },
      {
        nombre: "Tequila Sunrise",
        descripcion: "Tequila, zumo de naranja y granadina.",
        precio: "S/.16.00",
        imagen: ""
      },
      {
        nombre: "Mojito Corona",
        descripcion: "Ron, zumo de fruta, hierba buena y Coronita.",
        precio: "S/.22.00",
        imagen: ""
      },
      {
        nombre: "Sex on the Beach",
        descripcion: "Vodka, licor de damasco, jugo de naranja y granadina.",
        precio: "S/.17.00",
        imagen: ""
      }
    ]
  },
  {
    id: "cervezas",
    nombre: "Cervezas",
    items: [
      {
        nombre: "Pilsen Callao",
        descripcion: "Cerveza Pilsen Callao.",
        precio: "S/.10.00",
        imagen: ""
      },
      {
        nombre: "Cuzqueña",
        descripcion: "Cerveza Cuzqueña.",
        precio: "S/.12.00",
        imagen: ""
      },
      {
        nombre: "Stella Artois",
        descripcion: "Cerveza Stella Artois.",
        precio: "S/.9.00",
        imagen: ""
      },
      {
        nombre: "Corona",
        descripcion: "Cerveza Corona.",
        precio: "S/.9.00",
        imagen: ""
      },
      {
        nombre: "Heineken",
        descripcion: "Cerveza Heineken.",
        precio: "S/.10.00",
        imagen: ""
      }
    ]
  }
];
