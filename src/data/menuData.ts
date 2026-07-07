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
    id: "platos-a-la-carta",
    nombre: "Platos a la Carta",
    items: [
      {
        nombre: "Salchipapa clásica",
        descripcion: "Salchipapa tradicional de estilo popular.",
        precio: "S/.15.00",
        imagen: ""
      },
      {
        nombre: "Salchipapa a lo pobre",
        descripcion: "Salchipapa en versión a lo pobre.",
        precio: "S/.18.00",
        imagen: ""
      },
      {
        nombre: "Tallarín saltado",
        descripcion: "Tallarín saltado de estilo criollo-oriental.",
        precio: "S/.28.00",
        imagen: ""
      },
      {
        nombre: "Lomo saltado",
        descripcion: "Clásico lomo saltado criollo.",
        precio: "S/.35.00",
        imagen: ""
      },
      {
        nombre: "Lomo saltado a lo pobre",
        descripcion: "Lomo saltado en versión a lo pobre.",
        precio: "S/.38.00",
        imagen: ""
      },
      {
        nombre: "Pollo saltado",
        descripcion: "Pollo saltado de estilo criollo.",
        precio: "S/.30.00",
        imagen: ""
      },
      {
        nombre: "Bistec tradicional",
        descripcion: "Bistec tradicional.",
        precio: "S/.30.00",
        imagen: ""
      },
      {
        nombre: "Fetuccini al pesto con pollo a la brasa",
        descripcion: "Fetuccini al pesto acompañado con pollo a la brasa.",
        precio: "S/.30.00",
        imagen: ""
      },
      {
        nombre: "Fetuccini al pesto con churrasco",
        descripcion: "Fetuccini al pesto acompañado con churrasco.",
        precio: "S/.35.00",
        imagen: ""
      },
      {
        nombre: "Fetuccini a lo Alfredo con pechuga al grill",
        descripcion: "Fetuccini a lo Alfredo acompañado con pechuga al grill.",
        precio: "S/.35.00",
        imagen: ""
      },
      {
        nombre: "Aeropuerto",
        descripcion: "Plato tipo aeropuerto de estilo chifa.",
        precio: "S/.20.00",
        imagen: ""
      },
      {
        nombre: "Chaufa de pollo",
        descripcion: "Arroz chaufa preparado con pollo.",
        precio: "S/.16.00",
        imagen: ""
      },
      {
        nombre: "Chaufa de carne",
        descripcion: "Arroz chaufa preparado con carne.",
        precio: "S/.18.00",
        imagen: ""
      },
      {
        nombre: "Chaufa mixto",
        descripcion: "Arroz chaufa mixto.",
        precio: "S/.20.00",
        imagen: ""
      },
      {
        nombre: "Bife",
        descripcion: "Corte de bife.",
        precio: "S/.36.00",
        imagen: ""
      },
      {
        nombre: "Churrasco",
        descripcion: "Churrasco a la parrilla o a la plancha.",
        precio: "S/.20.00",
        imagen: ""
      },
      {
        nombre: "Pechuga a la parrilla",
        descripcion: "Pechuga de pollo a la parrilla.",
        precio: "S/.20.00",
        imagen: ""
      }
    ]
  },
  {
    id: "guarnicion",
    nombre: "Guarnición",
    items: [
      {
        nombre: "Papas fritas",
        descripcion: "Porción de papas fritas.",
        precio: "S/.8.00",
        imagen: ""
      },
      {
        nombre: "Nuggets 6 und.",
        descripcion: "Porción de 6 nuggets.",
        precio: "S/.8.00",
        imagen: ""
      },
      {
        nombre: "Arroz blanco",
        descripcion: "Porción de arroz blanco.",
        precio: "S/.5.00",
        imagen: ""
      }
    ]
  },
  {
    id: "alitas",
    nombre: "Alitas",
    items: [
      {
        nombre: "12 und. Alitas",
        descripcion: "Alitas en sabores BBQ y acevichadas.",
        precio: "S/.30.00",
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
        descripcion: "Refresco disponible en vaso o jarra.",
        precio: "Vaso S/.7.00 | Jarra S/.15.00",
        imagen: ""
      },
      {
        nombre: "Chicha",
        descripcion: "Refresco disponible en vaso o jarra.",
        precio: "Vaso S/.7.00 | Jarra S/.15.00",
        imagen: ""
      },
      {
        nombre: "Maracuyá",
        descripcion: "Refresco disponible en vaso o jarra.",
        precio: "Vaso S/.7.00 | Jarra S/.15.00",
        imagen: ""
      },
      {
        nombre: "Refrescante de Maracuyá",
        descripcion: "Bebida refrescante fría de maracuyá.",
        precio: "S/.12.00",
        imagen: ""
      },
      {
        nombre: "Refrescante de Mango",
        descripcion: "Bebida refrescante fría de mango.",
        precio: "S/.12.00",
        imagen: ""
      },
      {
        nombre: "Refrescante de Frutos Rojos",
        descripcion: "Bebida refrescante fría de frutos rojos.",
        precio: "S/.12.00",
        imagen: ""
      },
      {
        nombre: "Inca Kola / Coca Cola 600 ml",
        descripcion: "Gaseosa regular y sin azúcar.",
        precio: "S/.5.90",
        imagen: ""
      },
      {
        nombre: "Inca Kola / Coca Cola 1.5 L",
        descripcion: "Gaseosa familiar de 1.5 litros.",
        precio: "S/.10.90",
        imagen: ""
      },
      {
        nombre: "Infusiones",
        descripcion: "Té, anís y manzanilla.",
        precio: "S/.3.50",
        imagen: ""
      },
      {
        nombre: "Agua personal",
        descripcion: "Botella San Luis 625 ml, con o sin gas.",
        precio: "S/.3.00",
        imagen: ""
      }
    ]
  },
  {
    id: "chilcanos",
    nombre: "Chilcanos",
    items: [
      {
        nombre: "Chilcano clásico",
        descripcion: "Chilcano clásico.",
        precio: "S/.18.90",
        imagen: ""
      },
      {
        nombre: "Chilcano Maracumango",
        descripcion: "Chilcano sabor maracumango.",
        precio: "S/.19.90",
        imagen: ""
      },
      {
        nombre: "Chilcano Frutos del bosque",
        descripcion: "Chilcano sabor frutos del bosque.",
        precio: "S/.19.90",
        imagen: ""
      },
      {
        nombre: "Chilcano Fresa",
        descripcion: "Chilcano sabor fresa.",
        precio: "S/.19.90",
        imagen: ""
      }
    ]
  },
  {
    id: "pisco-sour",
    nombre: "Pisco Sour",
    items: [
      {
        nombre: "Pisco Sour clásico",
        descripcion: "Pisco sour clásico.",
        precio: "S/.18.90",
        imagen: ""
      },
      {
        nombre: "Pisco Sour Maracuyá",
        descripcion: "Pisco sour sabor maracuyá.",
        precio: "S/.19.90",
        imagen: ""
      }
    ]
  },
  {
    id: "cocteles",
    nombre: "Cocteles",
    items: [
      {
        nombre: "Copa de Sangría",
        descripcion: "Copa de sangría.",
        precio: "S/.16.90",
        imagen: ""
      },
      {
        nombre: "Algarrobina",
        descripcion: "Coctel de algarrobina.",
        precio: "S/.19.90",
        imagen: ""
      },
      {
        nombre: "Machu Picchu",
        descripcion: "Coctel Machu Picchu.",
        precio: "S/.19.90",
        imagen: ""
      },
      {
        nombre: "Piña Colada",
        descripcion: "Coctel de piña colada.",
        precio: "S/.20.90",
        imagen: ""
      }
    ]
  },
  {
    id: "happy-day",
    nombre: "Happy Day",
    items: [
      {
        nombre: "Happy Day 2x26.90",
        descripcion: "Promoción de cocteles disponible todo el día a toda hora.",
        precio: "S/.26.90",
        imagen: ""
      },
      {
        nombre: "Ice Chilcano de Maracumango",
        descripcion: "Ice chilcano de maracumango con precio individual y precio 2x.",
        precio: "S/.23.90 | 2x S/.29.90",
        imagen: ""
      },
      {
        nombre: "Ice Chilcano de Fresa",
        descripcion: "Ice chilcano de fresa con precio individual y precio 2x.",
        precio: "S/.23.90 | 2x S/.29.90",
        imagen: ""
      },
      {
        nombre: "Ice Piña Colada",
        descripcion: "Ice piña colada con precio individual y precio 2x.",
        precio: "S/.24.90 | 2x S/.32.90",
        imagen: ""
      }
    ]
  },
  {
    id: "para-ti",
    nombre: "Para Ti",
    items: [
      {
        nombre: "1/4 Pollo a la Brasa",
        descripcion: "Incluye guarnición clásica mediana y ensalada personal.",
        precio: "S/.18.00",
        imagen: ""
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
        imagen: ""
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
        imagen: ""
      }
    ]
  },
  {
    id: "bravaza-powers",
    nombre: "BravaZa Powers",
    items: [
      {
        nombre: "Mostrito",
        descripcion: "Plato combinado de la casa, de formato personal.",
        precio: "S/.13.00",
        imagen: ""
      },
      {
        nombre: "Mostro",
        descripcion: "Plato combinado más contundente de la casa.",
        precio: "S/.23.00",
        imagen: ""
      },
      {
        nombre: "Brabaza Parrillera",
        descripcion: "Plato parrillero combinado de la casa. En la carta figura como 'Brabaza Parrillera'.",
        precio: "S/.25.00",
        imagen: ""
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
        imagen: ""
      },
      {
        nombre: "Dieta de Pollo",
        descripcion: "Sopa ligera de pollo.",
        precio: "S/.15.00",
        imagen: ""
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
        imagen: ""
      },
      {
        nombre: "8 Nuggets Redondos",
        descripcion: "Incluye papas fritas y 1 vaso de chicha.",
        precio: "S/.13.50",
        imagen: ""
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
        precio: "S/.57.90",
        imagen: ""
      },
      {
        nombre: "2. Bipersonal",
        descripcion: "1/2 cuadril, 1 chorizo ahumado, 1 chorizo de pollo, 1 anticucho de corazón de res, papas fritas más ensalada y 2 gaseosas de 450 ml.",
        precio: "S/.69.90",
        imagen: ""
      },
      {
        nombre: "3. Familiar",
        descripcion: "1 lomo fino, 1 filete de pechuga, 1 chuleta de cerdo, 2 anticuchos de corazón de res, 1 chorizo ahumado, 1 chorizo de pollo, 1/2 pollo a la brasa, papas fritas, ensalada y gaseosa 1.5 L.",
        precio: "S/.120.00",
        imagen: ""
      }
    ]
  }
];
