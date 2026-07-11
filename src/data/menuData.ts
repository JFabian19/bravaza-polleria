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
    id: "happy-day",
    nombre: "Happy Day (2 x S/.30)",
    items: [
      {
        nombre: "Sour DE MARACUYÁ",
        descripcion: "Pisco sour peruano sabor maracuyá (2 x S/.30.00 todo el día).",
        precio: "Individual: S/.18.00 | X2: S/.30.00",
        imagen: "/images/sour_maracuya.png"
      }
    ]
  }
];
