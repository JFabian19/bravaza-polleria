import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, ChevronRight, X, Trash2, Utensils, Facebook, MapPin, Loader2, Gift, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchSheetData, submitSheetData, SheetDish, SheetCategory, SHEET_ID } from './services/googleSheets';
import { DEFAULT_MENU_DATA } from './data/menuData';

// ==========================================
// 📋 CONFIGURACIÓN DE LA PLANTILLA DEL MENÚ
// ==========================================
const RESTAURANTE_NAME = "BravaZa Pollería";
const RESTAURANTE_SLOGAN = "Sabor a fuego todo el día";
const WHATSAPP_NUMBER = "51992047922"; // WhatsApp oficial de BravaZa Pollería
const FACEBOOK_URL = "";
const MAPS_URL = ""; // No especificado
const LOGO_FOOTER_PATH = "/logo.png";
const BANNER_PATH = "/banner.png";
const MARQUEE_TEXT = "🔥 BRAVAZA POLLERÍA • POLLO A LA BRASA • PARRILLAS • MOSTRITOS • ALITAS BBQ Y ACEVICHADAS • SABOR A FUEGO TODO EL DÍA 🔥 • ";

const CATEGORY_ORDER = [
  "para-ti",
  "para-dos",
  "familiar",
  "super-combos",
  "parrillas",
  "bravaza-powers",
  "especiales-bravaza",
  "platos-criollos",
  "caldos",
  "bravaza-kids",
  "aperitivos-bravaza",
  "guarnicion",
  "bebidas",
  "bebidas-alcohol",
  "happy-day"
];
// ==========================================

// Mapa de imágenes locales por defecto para platos conocidos
const LOCAL_IMAGES: Record<string, string> = {};

interface Dish {
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

interface Category {
  id: string;
  nombre: string;
  items: Dish[];
}

interface CartItem {
  nombre: string;
  precio: string;
  cantidad: number;
  cremas?: string[];
  nota?: string;
}

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [optionModalDish, setOptionModalDish] = useState<Dish | null>(null);
  const [complementModalDish, setComplementModalDish] = useState<Dish | null>(null);
  const [selectedComplement, setSelectedComplement] = useState<{ id: string; nombre: string; precio: number } | null>(null);

  // States for Cremas & Nota Modal
  const [saucesModalDish, setSaucesModalDish] = useState<Dish | null>(null);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [dishNote, setDishNote] = useState<string>('');

  // States for Payment Modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // States for Birthday Form
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [isSubmittingBirthday, setIsSubmittingBirthday] = useState(false);
  const [birthdaySuccess, setBirthdaySuccess] = useState(false);
  const [birthdayData, setBirthdayData] = useState({
    nombre: '',
    telefono: '',
    fechaNacimiento: '',
    distrito: '',
    correo: ''
  });

  // States for Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewData, setReviewData] = useState({
    estrellasMozo: 0,
    estrellasComida: 0,
    comentario: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const sortCategories = (catsList: Category[]) => {
          return [...catsList].sort((a, b) => {
            const idxA = CATEGORY_ORDER.indexOf(a.id);
            const idxB = CATEGORY_ORDER.indexOf(b.id);
            const weightA = idxA !== -1 ? idxA : 999;
            const weightB = idxB !== -1 ? idxB : 999;
            return weightA - weightB;
          });
        };

        if (!SHEET_ID) {
          const sorted = sortCategories(DEFAULT_MENU_DATA);
          setCategories(sorted);
          if (sorted.length > 0) {
            setActiveCategory(sorted[0].id);
          }
          return;
        }

        const [cats, dishes] = await Promise.all([
          fetchSheetData<SheetCategory>('Categorías'),
          fetchSheetData<SheetDish>('Platos')
        ]);

        if (cats.length === 0 && dishes.length === 0) {
          const sorted = sortCategories(DEFAULT_MENU_DATA);
          setCategories(sorted);
          if (sorted.length > 0) {
            setActiveCategory(sorted[0].id);
          }
          return;
        }

        const formattedCategories: Category[] = cats.map(c => ({
          id: c.nombre.toLowerCase().replace(/\s+/g, '-'),
          nombre: c.nombre,
          items: dishes
            .filter(d => d.categoría === c.nombre)
            .map(d => ({
              nombre: d['nombre del plato'],
              descripcion: d.descripción,
              precio: d.precio,
              imagen: LOCAL_IMAGES[d['nombre del plato']] || d['URL de imagen'] || null
            }))
        }));

        const sorted = sortCategories(formattedCategories);
        setCategories(sorted);
        if (sorted.length > 0) {
          setActiveCategory(sorted[0].id);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        const sortCategories = (catsList: Category[]) => {
          return [...catsList].sort((a, b) => {
            const idxA = CATEGORY_ORDER.indexOf(a.id);
            const idxB = CATEGORY_ORDER.indexOf(b.id);
            const weightA = idxA !== -1 ? idxA : 999;
            const weightB = idxB !== -1 ? idxB : 999;
            return weightA - weightB;
          });
        };
        const sorted = sortCategories(DEFAULT_MENU_DATA);
        setCategories(sorted);
        if (sorted.length > 0) {
          setActiveCategory(sorted[0].id);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.cantidad, 0), [cart]);

  const addProductToCart = (nombre: string, precio: string, cremas?: string[], nota?: string) => {
    setCart(prev => {
      const existing = prev.find(i => 
        i.nombre === nombre && 
        i.precio === precio && 
        JSON.stringify(i.cremas || []) === JSON.stringify(cremas || []) && 
        (i.nota || '') === (nota || '')
      );
      if (existing) {
        return prev.map(i =>
          (i.nombre === nombre && 
           i.precio === precio && 
           JSON.stringify(i.cremas || []) === JSON.stringify(cremas || []) && 
           (i.nota || '') === (nota || ''))
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [...prev, { nombre, precio, cantidad: 1, cremas, nota }];
    });
  };

  const addToCart = (dish: Dish, catId?: string) => {
    if (dish.requiere_complemento) {
      setComplementModalDish(dish);
      if (dish.complementos && dish.complementos.length > 0) {
        setSelectedComplement(dish.complementos[0]);
      } else {
        setSelectedComplement(null);
      }
      setSelectedSauces([]);
      setDishNote('');
      return;
    }
    if (["Limonada", "Chicha", "Maracuyá"].includes(dish.nombre)) {
      setOptionModalDish({
        ...dish,
        precio: "Vaso: S/.7.00 | Jarra: S/.15.00"
      });
      return;
    }
    if (["Inca Kola / Coca Cola 600 ml", "Inca Kola / Coca Cola 1.5 L"].includes(dish.nombre)) {
      setOptionModalDish({
        ...dish,
        precio: `Inka Cola: ${dish.precio} | Coca Cola: ${dish.precio}`
      });
      return;
    }
    if (dish.nombre === "Infusiones") {
      setOptionModalDish({
        ...dish,
        precio: `Té: ${dish.precio} | Anís: ${dish.precio} | Manzanilla: ${dish.precio}`
      });
      return;
    }
    if (dish.nombre === "Agua personal") {
      setOptionModalDish({
        ...dish,
        precio: `Agua con gas: ${dish.precio} | Agua sin gas: ${dish.precio}`
      });
      return;
    }
    if (["Ice Chilcano de Maracumango", "Ice Chilcano de Fresa"].includes(dish.nombre)) {
      setOptionModalDish({
        ...dish,
        precio: "Individual: S/.23.90 | X2: S/.29.90"
      });
      return;
    }
    if (dish.nombre === "Ice Piña Colada") {
      setOptionModalDish({
        ...dish,
        precio: "Individual: S/.24.90 | X2: S/.32.90"
      });
      return;
    }
    const slashCount = (dish.precio.match(/\//g) || []).length;
    if (dish.precio.includes('|') || slashCount > 1) {
      setOptionModalDish(dish);
      return;
    }

    const noSaucesCategories = ["bebidas", "chilcanos", "pisco-sour", "cocteles", "happy-day", "guarnicion"];
    const isNoSauces = catId && noSaucesCategories.includes(catId);

    if (catId && !isNoSauces) {
      setSaucesModalDish(dish);
      setSelectedSauces([]);
      setDishNote('');
      return;
    }

    addProductToCart(dish.nombre, dish.precio);
  };

  const updateQuantity = (nombre: string, precio: string, delta: number, cremas?: string[], nota?: string) => {
    setCart(prev =>
      prev
        .map(i => {
          if (
            i.nombre === nombre &&
            i.precio === precio &&
            JSON.stringify(i.cremas || []) === JSON.stringify(cremas || []) &&
            (i.nota || '') === (nota || '')
          ) {
            const newQty = i.cantidad + delta;
            return newQty > 0 ? { ...i, cantidad: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const cleanPrice = item.precio.replace(/^[^\d]*/, '');
      const num = parseFloat(cleanPrice) || 0;
      return acc + num * item.cantidad;
    }, 0);
  };

  const sendToWhatsApp = (metodoPago: string) => {
    const total = calculateTotal();
    let message = `*Hola ${RESTAURANTE_NAME}, deseo realizar un pedido:*\n\n`;
    cart.forEach(item => {
      message += `• ${item.cantidad} x ${item.nombre} (${item.precio})\n`;
      if (item.cremas && item.cremas.length > 0) {
        message += `  Cremas: ${item.cremas.join(', ')}\n`;
      }
      if (item.nota) {
        message += `  Nota: ${item.nota}\n`;
      }
    });
    message += `\n*Método de Pago:* ${metodoPago}\n`;
    message += `*TOTAL: S/.${total.toFixed(2)}*`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText("992047922");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`cat-${catId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBirthdaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBirthday(true);
    const success = await submitSheetData('Cumpleaños', {
      timestamp: new Date().toLocaleString('es-PE'),
      nombre: birthdayData.nombre,
      telefono: birthdayData.telefono,
      fechaNacimiento: birthdayData.fechaNacimiento,
      distrito: birthdayData.distrito,
      correo: birthdayData.correo || 'No indicado'
    });
    
    setIsSubmittingBirthday(false);
    if (success) {
      setBirthdaySuccess(true);
      setTimeout(() => {
        setShowBirthdayForm(false);
        setBirthdaySuccess(false);
        setBirthdayData({ nombre: '', telefono: '', fechaNacimiento: '', distrito: '', correo: '' });
      }, 3000);
    } else {
      alert("Hubo un error al enviar tus datos. Por favor, inténtalo de nuevo.");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewData.estrellasMozo === 0 || reviewData.estrellasComida === 0) {
      alert("Por favor califica ambas opciones con estrellas.");
      return;
    }

    setIsSubmittingReview(true);
    const success = await submitSheetData('Reseñas', {
      timestamp: new Date().toLocaleString('es-PE'),
      estrellasMozo: reviewData.estrellasMozo,
      estrellasComida: reviewData.estrellasComida,
      comentario: reviewData.comentario || 'Sin comentarios'
    });
    
    setIsSubmittingReview(false);
    if (success) {
      setReviewSuccess(true);
      setTimeout(() => {
        setShowReviewForm(false);
        setReviewSuccess(false);
        setReviewData({ estrellasMozo: 0, estrellasComida: 0, comentario: '' });
      }, 3000);
    } else {
      alert("Hubo un error al enviar tu reseña. Por favor, inténtalo de nuevo.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D0D0D]">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-slogan text-primary font-bold tracking-widest uppercase text-xs">Cargando delicias...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans text-white">
      <header className="sticky top-0 bg-black z-50 px-5 py-2 flex justify-between items-center border-b border-[#1A1A1A]">
        <div className="flex items-center">
          <img src="/logo.png" alt={RESTAURANTE_NAME} className="h-10 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-2">
          {FACEBOOK_URL && (
            <motion.a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 bg-black border border-[#1A1A1A] hover:border-secondary rounded-full flex items-center justify-center text-primary hover:text-secondary cursor-pointer transition-colors"
            >
              <Facebook size={22} />
            </motion.a>
          )}
          {MAPS_URL && (
            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 bg-black border border-[#1A1A1A] hover:border-secondary rounded-full flex items-center justify-center text-primary hover:text-secondary cursor-pointer transition-colors"
            >
              <MapPin size={22} />
            </motion.a>
          )}
          <motion.div
            onClick={() => cartCount > 0 && setShowSummary(true)}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 bg-black border border-[#1A1A1A] hover:border-secondary rounded-full flex items-center justify-center relative cursor-pointer transition-colors text-primary hover:text-secondary"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-secondary text-black rounded-full text-[10px] font-black flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </motion.div>
        </div>
      </header>

      <div className="w-full bg-primary py-2 overflow-hidden flex items-center">
        <div className="animate-marquee flex gap-6 text-white font-slogan font-bold text-[11px] tracking-widest uppercase whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i}>{MARQUEE_TEXT}</span>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBirthdayForm(true)}
          className="w-full bg-secondary text-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-[10px] sm:text-[11px] uppercase tracking-wide relative overflow-hidden group text-center cursor-pointer"
        >
          <Gift size={18} className="animate-bounce shrink-0" />
          <span>¡Celebra tu cumpleaños con sabor BravaZa y recibe una sorpresa especial! 🎁🔥 <span className="text-primary font-black underline ml-1">Regístrate aquí</span></span>
        </motion.button>
      </div>

      <div className="px-5 pt-4 pb-3">
        <div className="relative w-full rounded-2xl overflow-hidden aspect-[2/1] bg-black border border-[#1A1A1A]">
          <img src={BANNER_PATH} alt={RESTAURANTE_NAME} className="w-full h-full object-cover opacity-90" />
        </div>
      </div>

      <div className="px-5 py-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`px-4.5 py-2.5 rounded-full text-[13px] font-category tracking-wide uppercase whitespace-nowrap transition-all duration-200 border cursor-pointer
                ${activeCategory === cat.id
                  ? 'bg-secondary text-black border-secondary'
                  : 'bg-black text-white border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-secondary'
                }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-32 px-5">
        {categories.map(cat => (
          <section key={cat.id} id={`cat-${cat.id}`} className="mb-10 scroll-mt-28">
            <div className="mb-5 pt-2">
              <div className="flex items-center gap-2 mb-1">
                <Utensils className="text-primary wave-icon" size={22} />
                <h3 className="font-category text-white text-[26px] leading-none tracking-wider uppercase category-underline">
                  {cat.nombre}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {cat.items.map((dish, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-black rounded-2xl overflow-hidden flex flex-col border border-[#1A1A1A] hover:border-secondary transition-all duration-200"
                >
                  <div className="bg-black aspect-square flex items-center justify-center relative overflow-hidden border-b border-[#1A1A1A]">
                    {dish.imagen ? (
                      <img
                        src={dish.imagen}
                        alt={dish.nombre}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => setSelectedImage(dish.imagen)}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1A1A1A] flex flex-col items-center justify-center p-4 text-center">
                        <Utensils className="text-[#DC2626] w-8 h-8 mb-1" />
                        <span className="font-brand font-black text-[9px] text-[#FACC15] uppercase tracking-widest">
                          BravaZa
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-dish font-bold text-white text-[15px] tracking-wide leading-tight mb-1">
                      {dish.nombre}
                    </h4>
                    {dish.descripcion && (
                      <p className="font-sans text-[11px] text-gray-400 leading-tight mb-2 line-clamp-3">
                        {dish.descripcion}
                      </p>
                    )}
                    <div className="flex-1"></div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-price font-bold text-secondary text-base whitespace-nowrap">
                        {dish.precio}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => addToCart(dish, cat.id)}
                        className="w-8 h-8 bg-secondary text-black rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200 shrink-0 cursor-pointer"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-8 mb-4 border border-[#1A1A1A] bg-black rounded-2xl p-5 text-center">
          <h3 className="font-title text-primary text-[22px] leading-tight mb-2">¿Cómo estuvo todo?</h3>
          <p className="text-[11px] text-white/70 mb-4 px-4">Ayúdanos a mejorar calificando tu experiencia con nosotros</p>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReviewForm(true)}
            className="bg-primary hover:bg-[#B91C1C] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 mx-auto w-full cursor-pointer transition-colors"
          >
            <Star size={18} className="fill-white" />
            Reseña nuestra comida
          </motion.button>
        </section>

        <footer className="mt-8 pt-8 pb-10 border-t border-[#1A1A1A] bg-black flex flex-col items-center justify-center text-center">
          <img src={LOGO_FOOTER_PATH} alt={RESTAURANTE_NAME} className="w-24 h-24 mb-4 object-contain rounded-2xl border border-[#1A1A1A]" />
          <p className="font-brand font-black text-lg text-primary tracking-wide">{RESTAURANTE_NAME}</p>
          <p className="text-xs text-secondary mt-1 max-w-[250px]">{RESTAURANTE_SLOGAN}</p>
          <p className="text-[10px] text-gray-500 mt-6">© 2026 Todos los derechos reservados.</p>
        </footer>

        <div className="bg-black py-6 flex flex-col items-center justify-center">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 text-gray-500">Digital Menu Experience</p>
          <motion.a 
            href="https://tymasolutions.lat/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-sm tracking-tight group cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white group-hover:text-secondary transition-colors duration-200">Hecho por Tyma</span>
            <span className="text-secondary group-hover:text-white transition-colors duration-200">Solutions</span>
          </motion.a>
        </div>
      </main>

      <AnimatePresence>
        {cartCount > 0 && !showSummary && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 w-full max-w-md p-5 z-40"
          >
            <div className="glass rounded-2xl p-4 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <ShoppingBag size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tu Pedido</p>
                  <p className="font-bold text-white text-lg">{cartCount} Artículos</p>
                </div>
              </div>
              <button
                onClick={() => setShowSummary(true)}
                className="bg-secondary text-black hover:bg-primary hover:text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold text-sm border-2 border-secondary hover:border-primary transition-colors"
              >
                Ver Pedido
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-end justify-center p-4 lg:p-0"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-black border-t-2 border-secondary w-full max-w-md rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto text-white"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-title text-2xl text-primary">Mi Pedido</h2>
                <button
                  onClick={() => setShowSummary(false)}
                  className="w-10 h-10 bg-black border-2 border-primary hover:border-secondary rounded-full flex items-center justify-center cursor-pointer text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3 mb-8">
                {cart.map(item => (
                  <div
                    key={`${item.nombre}-${item.precio}-${JSON.stringify(item.cremas || [])}-${item.nota || ''}`}
                    className="flex items-center gap-4 bg-black border border-[#1A1A1A] p-4 rounded-xl"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-dish font-semibold text-white text-sm truncate">{item.nombre}</h4>
                      <p className="font-dish text-xs text-secondary font-bold">{item.precio}</p>
                      {item.cremas && item.cremas.length > 0 && (
                        <p className="text-[10px] text-gray-400 mt-1">
                          <span className="text-secondary font-bold">Cremas:</span> {item.cremas.join(', ')}
                        </p>
                      )}
                      {item.nota && (
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          <span className="text-primary font-bold">Nota:</span> {item.nota}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 bg-black px-3 py-1.5 rounded-xl border border-[#1A1A1A]">
                      <button onClick={() => updateQuantity(item.nombre, item.precio, -1, item.cremas, item.nota)} className="text-white cursor-pointer">
                        <Minus size={16} />
                      </button>
                      <span className="font-dish font-bold text-sm w-4 text-center text-white">{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.nombre, item.precio, 1, item.cremas, item.nota)} className="text-primary cursor-pointer">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => updateQuantity(item.nombre, item.precio, -item.cantidad, item.cremas, item.nota)}
                      className="text-primary hover:text-secondary ml-1 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-dashed border-primary pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <h3 className="font-dish text-xl font-bold text-white">Total a pagar</h3>
                  <h3 className="font-dish text-xl font-bold text-secondary">S/.{calculateTotal().toFixed(2)}</h3>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSummary(false);
                  setShowPaymentModal(true);
                }}
                className="w-full bg-secondary text-black hover:bg-primary hover:text-white py-4 rounded-xl flex items-center justify-center gap-3 border-2 border-secondary hover:border-primary font-bold cursor-pointer transition-colors"
              >
                Completar Pedido (Pagar)
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-black border border-[#1A1A1A] hover:border-secondary rounded-full flex items-center justify-center text-white cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Plato ampliado"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBirthdayForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black border-2 border-secondary w-full max-w-sm rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-white"
            >
              <button
                onClick={() => setShowBirthdayForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-black border border-[#1A1A1A] hover:border-secondary rounded-full flex items-center justify-center cursor-pointer text-white"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                  <Gift size={24} className="text-white" />
                </div>
                <h2 className="font-title text-2xl text-white leading-none tracking-wide mb-2">¡TU CUMPLEAÑOS!</h2>
                <p className="text-xs text-secondary font-medium">Déjanos tus datos para enviarte una sorpresa en tu día especial.</p>
              </div>

              {birthdaySuccess ? (
                <div className="bg-green-950/40 text-green-400 p-4 rounded-2xl text-center text-sm font-bold border border-green-500/20">
                  ¡Gracias! Tus datos han sido guardados.
                </div>
              ) : (
                <form onSubmit={handleBirthdaySubmit} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase ml-1">Nombre Completo</label>
                    <input required type="text" value={birthdayData.nombre} onChange={e => setBirthdayData({...birthdayData, nombre: e.target.value})} className="w-full bg-black border border-[#1A1A1A] focus:border-secondary rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors text-white" placeholder="Ej. Juan Pérez" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase ml-1">Teléfono</label>
                    <input required type="tel" minLength={9} maxLength={11} pattern="[0-9]*" value={birthdayData.telefono} onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      setBirthdayData({...birthdayData, telefono: val});
                    }} className="w-full bg-black border border-[#1A1A1A] focus:border-secondary rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors text-white" placeholder="Ej. 987654321" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase ml-1">Fecha de Nacimiento</label>
                    <input required type="date" value={birthdayData.fechaNacimiento} onChange={e => setBirthdayData({...birthdayData, fechaNacimiento: e.target.value})} className="w-full bg-black border border-[#1A1A1A] focus:border-secondary rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors text-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase ml-1">Distrito</label>
                    <input required type="text" value={birthdayData.distrito} onChange={e => setBirthdayData({...birthdayData, distrito: e.target.value})} className="w-full bg-black border border-[#1A1A1A] focus:border-secondary rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors text-white" placeholder="Ej. Miraflores" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase ml-1">Correo Electrónico (Opcional)</label>
                    <input type="email" value={birthdayData.correo} onChange={e => setBirthdayData({...birthdayData, correo: e.target.value})} className="w-full bg-black border border-[#1A1A1A] focus:border-secondary rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors text-white" placeholder="correo@ejemplo.com" />
                  </div>
                  
                  <button disabled={isSubmittingBirthday} type="submit" className="w-full bg-secondary text-black hover:bg-primary hover:text-white py-3 rounded-xl font-bold text-sm border-2 border-secondary hover:border-primary mt-2 disabled:opacity-70 flex justify-center items-center cursor-pointer transition-colors">
                    {isSubmittingBirthday ? <Loader2 size={18} className="animate-spin" /> : "Guardar mis datos"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black border-2 border-secondary w-full max-w-sm rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-white"
            >
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-black border border-[#1A1A1A] hover:border-secondary rounded-full flex items-center justify-center cursor-pointer text-white"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                  <Star size={24} className="text-white fill-white" />
                </div>
                <h2 className="font-title text-2xl text-white leading-none mb-2">¡CALIFÍCANOS!</h2>
                <p className="text-xs text-secondary font-medium">Tu opinión es muy importante para nosotros.</p>
              </div>

              {reviewSuccess ? (
                <div className="bg-green-950/40 text-green-400 p-4 rounded-2xl text-center text-sm font-bold border border-green-500/20">
                  ¡Gracias por tu reseña! Nos ayuda a mejorar.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                  
                  <div className="bg-black p-4 rounded-2xl border border-[#1A1A1A] flex flex-col items-center">
                    <p className="text-xs font-bold text-secondary mb-2">Atención del Mozo</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} type="button" 
                          onClick={() => setReviewData({...reviewData, estrellasMozo: star})}
                          className="p-1 transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star size={28} className={reviewData.estrellasMozo >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black p-4 rounded-2xl border border-[#1A1A1A] flex flex-col items-center">
                    <p className="text-xs font-bold text-secondary mb-2">Calidad de la Comida</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} type="button" 
                          onClick={() => setReviewData({...reviewData, estrellasComida: star})}
                          className="p-1 transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star size={28} className={reviewData.estrellasComida >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase ml-1">Comentario (Opcional)</label>
                    <textarea 
                      rows={3} 
                      value={reviewData.comentario} 
                      onChange={e => setReviewData({...reviewData, comentario: e.target.value})} 
                      className="w-full bg-black border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors resize-none mt-1 text-white" 
                      placeholder="Cuéntanos más sobre tu experiencia..." 
                    />
                  </div>
                  
                  <button disabled={isSubmittingReview} type="submit" className="w-full bg-secondary text-black hover:bg-primary hover:text-white py-3 rounded-xl font-bold text-sm border-2 border-secondary hover:border-primary mt-2 disabled:opacity-70 flex justify-center items-center cursor-pointer transition-colors">
                    {isSubmittingReview ? <Loader2 size={18} className="animate-spin" /> : "Enviar Reseña"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {optionModalDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black border-2 border-secondary w-full max-w-sm rounded-2xl p-6 shadow-2xl relative text-white"
            >
              <button
                onClick={() => setOptionModalDish(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black border border-[#1A1A1A] hover:border-secondary rounded-full flex items-center justify-center cursor-pointer text-white"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <h2 className="font-title text-2xl text-white leading-none tracking-wider mb-2">
                  {["Inca Kola / Coca Cola 600 ml", "Inca Kola / Coca Cola 1.5 L"].includes(optionModalDish.nombre)
                    ? "SELECCIONA SABOR"
                    : ["Limonada", "Chicha", "Maracuyá"].includes(optionModalDish.nombre)
                      ? "SELECCIONA TAMAÑO"
                      : "SELECCIONA OPCIÓN"
                  }
                </h2>
                <p className="text-xs text-secondary font-medium">{optionModalDish.nombre}</p>
              </div>

              <div className="space-y-3">
                {(() => {
                  const delimiter = optionModalDish.precio.includes('|') ? '|' : '/';
                  const options = optionModalDish.precio.split(delimiter).map(opt => opt.trim());
                  
                  return options.map((opt, i) => {
                    let label = opt;
                    let price = opt;
                    if (opt.includes(':')) {
                      const parts = opt.split(':');
                      label = parts[0].trim();
                      price = parts[1].trim();
                    } else {
                      label = i === 0 ? "Porción Chica / Simple" : "Porción Grande / Especial";
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          addProductToCart(`${optionModalDish.nombre} (${label})`, price);
                          setOptionModalDish(null);
                        }}
                        className="w-full bg-black hover:bg-primary/20 hover:text-secondary border border-[#1A1A1A] hover:border-secondary rounded-xl py-3 px-4 flex justify-between items-center font-bold text-sm transition-colors cursor-pointer text-left text-white"
                      >
                        <span>{label}</span>
                        <span className="text-secondary">{price}</span>
                      </button>
                    );
                  });
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {saucesModalDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black border-2 border-secondary w-full max-w-sm rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-white"
            >
              <button
                onClick={() => setSaucesModalDish(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black border border-[#1A1A1A] hover:border-secondary rounded-full flex items-center justify-center cursor-pointer text-white"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                  <Utensils size={24} className="text-white" />
                </div>
                <h2 className="font-title text-2xl text-white leading-none tracking-wide mb-1 uppercase">¿CÓMO DESEAS TU PLATO?</h2>
                <p className="text-xs text-secondary font-medium">{saucesModalDish.nombre}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase ml-1 block mb-2">Selecciona tus cremas</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Mayonesa", "Ají", "Chimichurri", "Mostaza", "Ketchup", "Vinagreta"].map(sauce => {
                      const isSelected = selectedSauces.includes(sauce);
                      return (
                        <button
                          key={sauce}
                          type="button"
                          onClick={() => {
                            setSelectedSauces(prev => 
                              prev.includes(sauce) ? prev.filter(s => s !== sauce) : [...prev, sauce]
                            );
                          }}
                          className={`py-2 px-3 rounded-xl border font-bold text-xs transition-colors cursor-pointer text-center block w-full
                            ${isSelected 
                              ? "bg-primary border-primary text-white" 
                              : "bg-black border-[#1A1A1A] text-gray-400 hover:border-secondary hover:text-white"
                            }`}
                        >
                          {sauce}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase ml-1 block mb-1">Nota / Especificación (Opcional)</label>
                  <textarea
                    rows={2}
                    value={dishNote}
                    onChange={e => setDishNote(e.target.value)}
                    className="w-full bg-black border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors resize-none mt-1 text-white"
                    placeholder="Ej. Papas bien fritas, sin ensalada, etc..."
                  />
                </div>

                <button
                  onClick={() => {
                    addProductToCart(saucesModalDish.nombre, saucesModalDish.precio, selectedSauces, dishNote);
                    setSaucesModalDish(null);
                  }}
                  className="w-full bg-secondary text-black hover:bg-primary hover:text-white py-3 rounded-xl font-bold text-sm border-2 border-secondary hover:border-primary mt-2 flex justify-center items-center cursor-pointer transition-colors"
                >
                  Agregar al Pedido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black border-2 border-secondary w-full max-w-sm rounded-2xl p-6 shadow-2xl relative text-white"
            >
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPaymentMethod(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 bg-black border border-[#1A1A1A] hover:border-secondary rounded-full flex items-center justify-center cursor-pointer text-white"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                  <ShoppingBag size={24} className="text-white" />
                </div>
                <h2 className="font-title text-2xl text-white leading-none tracking-wide mb-1">MÉTODO DE PAGO</h2>
                <p className="text-xs text-secondary font-medium">Selecciona cómo deseas pagar tu pedido antes de enviarlo</p>
              </div>

              <div className="space-y-3">
                {["Efectivo", "Tarjeta", "Yape/Plin"].map(method => {
                  const isSelected = selectedPaymentMethod === method;
                  return (
                    <button
                      key={method}
                      onClick={() => setSelectedPaymentMethod(method)}
                      className={`w-full py-3.5 px-4 rounded-xl border font-bold text-sm text-left flex justify-between items-center transition-colors cursor-pointer
                        ${isSelected 
                          ? "bg-secondary text-black border-secondary" 
                          : "bg-black text-white border-[#1A1A1A] hover:border-secondary"
                        }`}
                    >
                      <span>{method}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-black"></span>}
                    </button>
                  );
                })}

                {selectedPaymentMethod === "Yape/Plin" && (
                  <div className="bg-[#1A1A1A] border border-[#1A1A1A] p-4 rounded-xl space-y-2 mt-4 text-center">
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Detalles de Transferencia</p>
                    <div className="text-sm font-black text-white">Inversiones Darkred S.A.C.</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-black text-secondary tracking-widest">992 047 922</span>
                      <button
                        onClick={handleCopyNumber}
                        className="py-1 px-2.5 bg-primary hover:bg-[#B91C1C] text-white text-[10px] font-black rounded-lg transition-colors cursor-pointer uppercase"
                      >
                        {copied ? "¡Copiado!" : "Copiar"}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  disabled={!selectedPaymentMethod}
                  onClick={() => {
                    if (selectedPaymentMethod) {
                      sendToWhatsApp(selectedPaymentMethod);
                      setShowPaymentModal(false);
                      setSelectedPaymentMethod(null);
                    }
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#1ebd53] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold cursor-pointer transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar y Enviar a WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {complementModalDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black border-2 border-secondary w-full max-w-sm rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-white"
            >
              <button
                onClick={() => setComplementModalDish(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black border border-[#1A1A1A] hover:border-secondary rounded-full flex items-center justify-center cursor-pointer text-white"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                  <Utensils size={24} className="text-white" />
                </div>
                <h2 className="font-title text-2xl text-white leading-none tracking-wide mb-1 uppercase">ARMA TU PLATO</h2>
                <p className="text-xs text-secondary font-medium">{complementModalDish.nombre}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase ml-1 block mb-2">Selecciona el complemento</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                    {complementModalDish.complementos?.map(comp => {
                      const isSelected = selectedComplement?.id === comp.id;
                      return (
                        <button
                          key={comp.id}
                          type="button"
                          onClick={() => setSelectedComplement(comp)}
                          className={`w-full py-2.5 px-4 rounded-xl border font-bold text-xs flex justify-between items-center transition-colors cursor-pointer text-left
                            ${isSelected
                              ? "bg-secondary text-black border-secondary"
                              : "bg-black border-[#1A1A1A] text-gray-300 hover:border-secondary"
                            }`}
                        >
                          <span>{comp.nombre}</span>
                          <span className={isSelected ? "text-black font-extrabold" : "text-secondary"}>
                            S/.{comp.precio.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase ml-1 block mb-2">Selecciona tus cremas</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Mayonesa", "Ají", "Chimichurri", "Mostaza", "Ketchup", "Vinagreta"].map(sauce => {
                      const isSelected = selectedSauces.includes(sauce);
                      return (
                        <button
                          key={sauce}
                          type="button"
                          onClick={() => {
                            setSelectedSauces(prev =>
                              prev.includes(sauce) ? prev.filter(s => s !== sauce) : [...prev, sauce]
                            );
                          }}
                          className={`py-2 px-3 rounded-xl border font-bold text-xs transition-colors cursor-pointer text-center block w-full
                            ${isSelected
                              ? "bg-primary border-primary text-white"
                              : "bg-black border-[#1A1A1A] text-gray-400 hover:border-secondary hover:text-white"
                            }`}
                        >
                          {sauce}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase ml-1 block mb-1">Nota / Especificación (Opcional)</label>
                  <textarea
                    rows={2}
                    value={dishNote}
                    onChange={e => setDishNote(e.target.value)}
                    className="w-full bg-black border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors resize-none mt-1 text-white"
                    placeholder="Ej. Sin ensalada, cremas aparte, etc..."
                  />
                </div>

                <button
                  onClick={() => {
                    if (selectedComplement) {
                      addProductToCart(
                        `${complementModalDish.nombre} con ${selectedComplement.nombre}`,
                        `S/.${selectedComplement.precio.toFixed(2)}`,
                        selectedSauces,
                        dishNote
                      );
                      setComplementModalDish(null);
                    }
                  }}
                  className="w-full bg-secondary text-black hover:bg-primary hover:text-white py-3 rounded-xl font-bold text-sm border-2 border-secondary hover:border-primary mt-2 flex justify-center items-center cursor-pointer transition-colors"
                >
                  Agregar al Pedido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
