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
  "para-comenzar",
  "criollos",
  "pastas-bravazas",
  "del-horno-a-tu-mesa",
  "para-los-engreídos",
  "caldos",
  "guarniciones",
  "entradas-parrilleras-y-cortes",
  "parrillas-familiares",
  "cocteles-happy-day",
  "vinos-y-cervezas",
  "gaseosas",
  "bebidas-naturales",
  "frozen"
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
    const slashCount = (dish.precio.match(/\//g) || []).length;
    if (dish.precio.includes('|') || slashCount > 1) {
      setOptionModalDish(dish);
      return;
    }

    const noSaucesCategories = ["cocteles-happy-day", "vinos-y-cervezas", "gaseosas", "bebidas-naturales", "frozen", "guarniciones"];
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

  const getDisplayPrice = (dish: Dish) => {
    if (dish.requiere_complemento && dish.complementos && dish.complementos.length > 0) {
      return `S/.${dish.complementos[0].precio.toFixed(2)}`;
    }
    const precio = dish.precio;
    if (precio.includes('|') || precio.includes(' / ')) {
      const delimiter = precio.includes('|') ? '|' : '/';
      const firstOpt = precio.split(delimiter)[0].trim();
      if (firstOpt.includes(':')) {
        return firstOpt.split(':')[1].trim();
      }
      return firstOpt;
    }
    return precio;
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
    <div className="max-w-md mx-auto bg-wood min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans text-white border-x border-[#FF6A00]/10">
      <header className="sticky top-0 bg-black/90 backdrop-blur-md z-50 px-5 py-2 flex justify-between items-center border-b border-[#FF6A00]/25">
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
              className="w-11 h-11 bg-[#101010] border border-[#FF6A00]/20 hover:border-primary rounded-full flex items-center justify-center text-primary hover:text-secondary cursor-pointer transition-colors"
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
              className="w-11 h-11 bg-[#101010] border border-[#FF6A00]/20 hover:border-primary rounded-full flex items-center justify-center text-primary hover:text-secondary cursor-pointer transition-colors"
            >
              <MapPin size={22} />
            </motion.a>
          )}
          <motion.div
            onClick={() => cartCount > 0 && setShowSummary(true)}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 bg-[#101010] border border-[#FF6A00]/20 hover:border-primary rounded-full flex items-center justify-center relative cursor-pointer transition-colors text-primary hover:text-secondary"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-primary text-white rounded-full text-[10px] font-black flex items-center justify-center px-1 shadow-sm">
                {cartCount}
              </span>
            )}
          </motion.div>
        </div>
      </header>

      <div className="w-full bg-gradient-to-r from-[#D94700] via-[#FF8A00] to-[#D94700] py-2.5 overflow-hidden flex items-center shadow-md">
        <div className="animate-marquee flex gap-6 text-white font-slogan font-black text-[11px] tracking-widest uppercase whitespace-nowrap">
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
          className="w-full bg-gradient-to-r from-[#D94700] via-[#FF9A1F] to-[#D94700] text-white py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-[10px] sm:text-[11px] uppercase tracking-wide relative overflow-hidden group text-center cursor-pointer shadow-lg shadow-orange-950/30 border border-[#FF9A1F]/20"
        >
          <Gift size={18} className="animate-bounce shrink-0 text-white" />
          <span>¡Celebra tu cumpleaños con sabor BravaZa y recibe una sorpresa especial! 🎁🔥 <span className="text-white font-black underline ml-1 hover:text-orange-100 transition-colors">Regístrate aquí</span></span>
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
              className={`px-5 py-2.5 rounded-full text-[13px] font-category tracking-wide uppercase whitespace-nowrap transition-all duration-200 border cursor-pointer shadow-sm
                ${activeCategory === cat.id
                  ? 'bg-gradient-to-b from-[#FF9A1F] via-[#F4511E] to-[#D94700] text-white border-transparent shadow-md shadow-orange-900/30'
                  : 'bg-[#101010] text-white border-[#FF6A00]/30 hover:bg-[#FF6A00]/10 hover:border-[#FF6A00] hover:text-white'
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
              <div className="flex items-center gap-2.5 mb-1">
                <span className="w-1.5 h-6.5 bg-gradient-to-b from-[#FF9A1F] to-[#D94700] rounded-sm shrink-0 shadow-sm"></span>
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
                  className="bg-[#101010] rounded-[18px] overflow-hidden flex flex-col border border-[#FF6A00]/20 hover:border-[#FF6A00]/60 transition-all duration-200 shadow-md shadow-black/45 h-full"
                >
                  <div className={`aspect-square flex items-center justify-center relative overflow-hidden border-b border-[#FF6A00]/10 ${dish.imagen ? 'bg-white' : 'bg-[#151515]'}`}>
                    {dish.imagen ? (
                      <img
                        src={dish.imagen}
                        alt={dish.nombre}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => setSelectedImage(dish.imagen)}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#151515] flex flex-col items-center justify-center p-4 text-center">
                        <Utensils className="text-[#FF6A00] w-8 h-8 mb-1" />
                        <span className="font-brand font-black text-[9px] text-[#FF9A1F] uppercase tracking-widest">
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
                      <p className="font-sans text-[11px] text-[#BDBDBD] leading-tight mb-2 line-clamp-3">
                        {dish.descripcion}
                      </p>
                    )}
                    <div className="flex-1"></div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-price font-bold text-[#FF6A00] text-[17px] tracking-wide whitespace-nowrap">
                        {getDisplayPrice(dish)}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => addToCart(dish, cat.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer bg-gradient-to-br from-[#FF9A1F] to-[#F4511E] text-white hover:scale-105 active:brightness-90 shadow-md shadow-orange-950/20"
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

        <section className="mt-8 mb-4 border border-[#FF6A00]/25 bg-[#101010] rounded-[18px] p-5 text-center shadow-md">
          <h3 className="font-title text-[#FF6A00] text-[22px] leading-tight mb-2 uppercase tracking-wide">¿Cómo estuvo todo?</h3>
          <p className="text-[11px] text-[#BDBDBD] mb-4 px-4">Ayúdanos a mejorar calificando tu experiencia con nosotros</p>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReviewForm(true)}
            className="w-full bg-gradient-to-b from-[#FF9A1F] via-[#F4511E] to-[#D94700] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mx-auto cursor-pointer transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-orange-950/30 uppercase tracking-wide border-0"
          >
            <Star size={18} className="fill-white" />
            Reseña nuestra comida
          </motion.button>
        </section>

        <footer className="mt-8 pt-8 pb-10 border-t border-[#FF6A00]/20 bg-transparent flex flex-col items-center justify-center text-center">
          <img src={LOGO_FOOTER_PATH} alt={RESTAURANTE_NAME} className="w-24 h-24 mb-4 object-contain rounded-2xl border border-[#FF6A00]/25 bg-black p-1 shadow-sm" />
          <p className="font-brand font-black text-lg text-primary tracking-wide">{RESTAURANTE_NAME}</p>
          <p className="text-xs text-secondary mt-1 max-w-[250px]">{RESTAURANTE_SLOGAN}</p>
          <p className="text-[10px] text-gray-500 mt-6">© 2026 Todos los derechos reservados.</p>
        </footer>

        <div className="bg-transparent py-6 flex flex-col items-center justify-center">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 text-gray-500">Digital Menu Experience</p>
          <motion.a 
            href="https://tymasolutions.lat/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-sm tracking-tight group cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white group-hover:text-[#FF9A1F] transition-colors duration-200">Hecho por Tyma</span>
            <span className="text-[#FF9A1F] group-hover:text-white transition-colors duration-200">Solutions</span>
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
            <div className="glass rounded-[20px] p-4 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A1F] to-[#D94700] rounded-xl flex items-center justify-center relative overflow-hidden shadow-md shadow-orange-950/15">
                  <ShoppingBag size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tu Pedido</p>
                  <p className="font-bold text-white text-lg">{cartCount} Artículos</p>
                </div>
              </div>
              <button
                onClick={() => setShowSummary(true)}
                className="bg-gradient-to-r from-[#FF9A1F] via-[#F4511E] to-[#D94700] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-sm border-0 transition-all hover:brightness-110 active:scale-95 shadow-md shadow-orange-950/20 cursor-pointer uppercase tracking-wider"
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
            className="fixed inset-0 z-[60] bg-black/95 flex items-end justify-center p-4 lg:p-0"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-[#101010] border-t-2 border-primary w-full max-w-md rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto text-white shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-title text-2xl text-primary uppercase tracking-wide">Mi Pedido</h2>
                <button
                  onClick={() => setShowSummary(false)}
                  className="w-10 h-10 bg-[#151515] border border-[#FF6A00]/30 hover:border-primary rounded-full flex items-center justify-center cursor-pointer text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3 mb-8">
                {cart.map(item => (
                  <div
                    key={`${item.nombre}-${item.precio}-${JSON.stringify(item.cremas || [])}-${item.nota || ''}`}
                    className="flex items-center gap-4 bg-[#151515] border border-[#FF6A00]/15 p-4 rounded-xl shadow-sm"
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
                    <div className="flex items-center gap-3 bg-[#101010] px-3 py-1.5 rounded-xl border border-[#FF6A00]/15">
                      <button onClick={() => updateQuantity(item.nombre, item.precio, -1, item.cremas, item.nota)} className="text-white hover:text-primary cursor-pointer transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="font-dish font-bold text-sm w-4 text-center text-white">{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.nombre, item.precio, 1, item.cremas, item.nota)} className="text-primary hover:text-secondary cursor-pointer transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => updateQuantity(item.nombre, item.precio, -item.cantidad, item.cremas, item.nota)}
                      className="text-primary hover:text-secondary ml-1 cursor-pointer transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-[#FF6A00]/30 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <h3 className="font-dish text-xl font-bold text-white uppercase tracking-wide">Total a pagar</h3>
                  <h3 className="font-dish text-2xl font-black text-primary">S/.{calculateTotal().toFixed(2)}</h3>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSummary(false);
                  setShowPaymentModal(true);
                }}
                className="w-full bg-gradient-to-b from-[#FF9A1F] via-[#F4511E] to-[#D94700] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold cursor-pointer transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-orange-600/20 border-0 uppercase tracking-wide"
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
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#101010] border border-[#FF6A00]/40 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-white"
            >
              <button
                onClick={() => setShowBirthdayForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#151515] border border-[#FF6A00]/30 hover:border-primary rounded-full flex items-center justify-center cursor-pointer text-white transition-colors"
              >
                <X size={18} />
              </button>
 
              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A1F] to-[#D94700] rounded-full flex items-center justify-center mb-3 shadow-md shadow-orange-950/20">
                  <Gift size={24} className="text-white" />
                </div>
                <h2 className="font-title text-2xl text-primary leading-none tracking-wide mb-2">¡TU CUMPLEAÑOS!</h2>
                <p className="text-xs text-[#BDBDBD] font-medium">Déjanos tus datos para enviarte una sorpresa en tu día especial.</p>
              </div>
 
              {birthdaySuccess ? (
                <div className="bg-green-950/40 text-green-400 p-4 rounded-2xl text-center text-sm font-bold border border-green-500/20">
                  ¡Gracias! Tus datos han sido guardados.
                </div>
              ) : (
                <form onSubmit={handleBirthdaySubmit} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1">Nombre Completo</label>
                    <input required type="text" value={birthdayData.nombre} onChange={e => setBirthdayData({...birthdayData, nombre: e.target.value})} className="w-full bg-[#151515] border border-[#FF6A00]/25 focus:border-primary rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-white placeholder-gray-600" placeholder="Ej. Juan Pérez" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1">Teléfono</label>
                    <input required type="tel" minLength={9} maxLength={11} pattern="[0-9]*" value={birthdayData.telefono} onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      setBirthdayData({...birthdayData, telefono: val});
                    }} className="w-full bg-[#151515] border border-[#FF6A00]/25 focus:border-primary rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-white placeholder-gray-600" placeholder="Ej. 987654321" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1">Fecha de Nacimiento</label>
                    <input required type="date" value={birthdayData.fechaNacimiento} onChange={e => setBirthdayData({...birthdayData, fechaNacimiento: e.target.value})} className="w-full bg-[#151515] border border-[#FF6A00]/25 focus:border-primary rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1">Distrito</label>
                    <input required type="text" value={birthdayData.distrito} onChange={e => setBirthdayData({...birthdayData, distrito: e.target.value})} className="w-full bg-[#151515] border border-[#FF6A00]/25 focus:border-primary rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-white placeholder-gray-600" placeholder="Ej. Miraflores" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1">Correo Electrónico (Opcional)</label>
                    <input type="email" value={birthdayData.correo} onChange={e => setBirthdayData({...birthdayData, correo: e.target.value})} className="w-full bg-[#151515] border border-[#FF6A00]/25 focus:border-primary rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-white placeholder-gray-600" placeholder="correo@ejemplo.com" />
                  </div>
                  
                  <button disabled={isSubmittingBirthday} type="submit" className="w-full bg-gradient-to-b from-[#FF9A1F] via-[#F4511E] to-[#D94700] text-white py-3.5 rounded-xl font-bold text-sm mt-2 disabled:opacity-70 flex justify-center items-center cursor-pointer transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-orange-600/20 border-0 uppercase tracking-wide">
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
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#101010] border border-[#FF6A00]/40 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-white"
            >
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#151515] border border-[#FF6A00]/30 hover:border-primary rounded-full flex items-center justify-center cursor-pointer text-white transition-colors"
              >
                <X size={18} />
              </button>
 
              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A1F] to-[#D94700] rounded-full flex items-center justify-center mb-3 shadow-md shadow-orange-950/20">
                  <Star size={24} className="text-white fill-white" />
                </div>
                <h2 className="font-title text-2xl text-primary leading-none mb-2 uppercase tracking-wide">¡CALIFÍCANOS!</h2>
                <p className="text-xs text-[#BDBDBD] font-medium">Tu opinión es muy importante para nosotros.</p>
              </div>
 
              {reviewSuccess ? (
                <div className="bg-green-950/40 text-green-400 p-4 rounded-2xl text-center text-sm font-bold border border-green-500/20">
                  ¡Gracias por tu reseña! Nos ayuda a mejorar.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                  
                  <div className="bg-[#151515] p-4 rounded-2xl border border-[#FF6A00]/15 flex flex-col items-center shadow-sm">
                    <p className="text-xs font-bold text-[#BDBDBD] mb-2">Atención del Mozo</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} type="button" 
                          onClick={() => setReviewData({...reviewData, estrellasMozo: star})}
                          className="p-1 transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star size={28} className={reviewData.estrellasMozo >= star ? "text-[#FF9A1F] fill-[#FF9A1F]" : "text-gray-700"} />
                        </button>
                      ))}
                    </div>
                  </div>
 
                  <div className="bg-[#151515] p-4 rounded-2xl border border-[#FF6A00]/15 flex flex-col items-center shadow-sm">
                    <p className="text-xs font-bold text-[#BDBDBD] mb-2">Calidad de la Comida</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} type="button" 
                          onClick={() => setReviewData({...reviewData, estrellasComida: star})}
                          className="p-1 transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star size={28} className={reviewData.estrellasComida >= star ? "text-[#FF9A1F] fill-[#FF9A1F]" : "text-gray-700"} />
                        </button>
                      ))}
                    </div>
                  </div>
 
                  <div>
                    <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1">Comentario (Opcional)</label>
                    <textarea 
                      rows={3} 
                      value={reviewData.comentario} 
                      onChange={e => setReviewData({...reviewData, comentario: e.target.value})} 
                      className="w-full bg-[#151515] border border-[#FF6A00]/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none mt-1 text-white placeholder-gray-600" 
                      placeholder="Cuéntanos más sobre tu experiencia..." 
                    />
                  </div>
                  
                  <button disabled={isSubmittingReview} type="submit" className="w-full bg-gradient-to-b from-[#FF9A1F] via-[#F4511E] to-[#D94700] text-white py-3.5 rounded-xl font-bold text-sm mt-2 disabled:opacity-70 flex justify-center items-center cursor-pointer transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-orange-600/20 border-0 uppercase tracking-wide">
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
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#101010] border border-[#FF6A00]/40 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative text-white"
            >
              <button
                onClick={() => setOptionModalDish(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#151515] border border-[#FF6A00]/30 hover:border-primary rounded-full flex items-center justify-center cursor-pointer text-white transition-colors"
              >
                <X size={18} />
              </button>
 
              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <h2 className="font-title text-2xl text-primary leading-none tracking-wider mb-2 uppercase">
                  {["Inca Kola / Coca Cola 600 ml", "Inca Kola / Coca Cola 1.5 L"].includes(optionModalDish.nombre)
                    ? "SELECCIONA SABOR"
                    : ["Limonada", "Chicha", "Maracuyá"].includes(optionModalDish.nombre)
                      ? "SELECCIONA TAMAÑO"
                      : "SELECCIONA OPCIÓN"
                  }
                </h2>
                <p className="text-xs text-[#BDBDBD] font-medium">{optionModalDish.nombre}</p>
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
                        className="w-full bg-[#151515] hover:bg-[#FF6A00]/10 hover:text-white border border-[#FF6A00]/15 hover:border-[#FF6A00] rounded-xl py-3.5 px-4 flex justify-between items-center font-bold text-sm transition-colors cursor-pointer text-left text-white shadow-sm"
                      >
                        <span>{label}</span>
                        <span className="text-[#FF6A00] font-black">{price}</span>
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
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#101010] border border-[#FF6A00]/40 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-white"
            >
              <button
                onClick={() => setSaucesModalDish(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#151515] border border-[#FF6A00]/30 hover:border-primary rounded-full flex items-center justify-center cursor-pointer text-white transition-colors"
              >
                <X size={18} />
              </button>
 
              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A1F] to-[#D94700] rounded-full flex items-center justify-center mb-3 shadow-md shadow-orange-950/20">
                  <Utensils size={24} className="text-white" />
                </div>
                <h2 className="font-title text-2xl text-primary leading-none tracking-wide mb-1 uppercase">¿CÓMO DESEAS TU PLATO?</h2>
                <p className="text-xs text-[#BDBDBD] font-medium">{saucesModalDish.nombre}</p>
              </div>
 
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1 block mb-2">Selecciona tus cremas</label>
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
                              ? "bg-gradient-to-r from-[#FF9A1F] to-[#F4511E] border-transparent text-white shadow-sm" 
                              : "bg-[#151515] border border-[#FF6A00]/15 text-gray-400 hover:border-primary hover:text-white"
                            }`}
                        >
                          {sauce}
                        </button>
                      );
                    })}
                  </div>
                </div>
 
                <div>
                  <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1 block mb-1">Nota / Especificación (Opcional)</label>
                  <textarea
                    rows={2}
                    value={dishNote}
                    onChange={e => setDishNote(e.target.value)}
                    className="w-full bg-[#151515] border border-[#FF6A00]/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none mt-1 text-white placeholder-gray-600"
                    placeholder="Ej. Papas bien fritas, sin ensalada, etc..."
                  />
                </div>
 
                <button
                  onClick={() => {
                    addProductToCart(saucesModalDish.nombre, saucesModalDish.precio, selectedSauces, dishNote);
                    setSaucesModalDish(null);
                  }}
                  className="w-full bg-gradient-to-b from-[#FF9A1F] via-[#F4511E] to-[#D94700] text-white py-3.5 rounded-xl font-bold text-sm mt-2 flex justify-center items-center cursor-pointer transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-orange-600/20 border-0 uppercase tracking-wide"
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
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#101010] border border-[#FF6A00]/40 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative text-white"
            >
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPaymentMethod(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 bg-[#151515] border border-[#FF6A00]/30 hover:border-primary rounded-full flex items-center justify-center cursor-pointer text-white transition-colors"
              >
                <X size={18} />
              </button>
 
              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A1F] to-[#D94700] rounded-full flex items-center justify-center mb-3 shadow-md shadow-orange-950/20">
                  <ShoppingBag size={24} className="text-white" />
                </div>
                <h2 className="font-title text-2xl text-primary leading-none tracking-wide mb-1 uppercase">MÉTODO DE PAGO</h2>
                <p className="text-xs text-[#BDBDBD] font-medium">Selecciona cómo deseas pagar tu pedido antes de enviarlo</p>
              </div>
 
              <div className="space-y-3">
                {["Efectivo", "Tarjeta", "Yape/Plin"].map(method => {
                  const isSelected = selectedPaymentMethod === method;
                  return (
                    <button
                      key={method}
                      onClick={() => setSelectedPaymentMethod(method)}
                      className={`w-full py-3.5 px-4 rounded-xl border font-bold text-sm text-left flex justify-between items-center transition-colors cursor-pointer shadow-sm
                        ${isSelected 
                          ? "bg-gradient-to-r from-[#FF9A1F] to-[#D94700] text-white border-transparent" 
                          : "bg-[#151515] text-white border border-[#FF6A00]/15 hover:border-primary"
                        }`}
                    >
                      <span>{method}</span>
                      {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm"></span>}
                    </button>
                  );
                })}
 
                {selectedPaymentMethod === "Yape/Plin" && (
                  <div className="bg-[#151515] border border-[#FF6A00]/25 p-4 rounded-xl space-y-2 mt-4 text-center shadow-inner">
                    <p className="text-[10px] font-bold text-[#FF9A1F] uppercase tracking-wider">Detalles de Transferencia</p>
                    <div className="text-sm font-black text-white">Inversiones Darkred S.A.C.</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-black text-white tracking-widest">992 047 922</span>
                      <button
                        onClick={handleCopyNumber}
                        className="py-1 px-3.5 bg-gradient-to-r from-[#FF9A1F] to-[#F4511E] hover:brightness-110 text-white text-[10px] font-black rounded-lg transition-colors cursor-pointer uppercase border-0 shadow-sm"
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
                  className="w-full bg-gradient-to-b from-[#25D366] via-[#20ba59] to-[#128C7E] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold cursor-pointer transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-green-600/20 border-0 mt-4 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
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
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#101010] border border-[#FF6A00]/40 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-white"
            >
              <button
                onClick={() => setComplementModalDish(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#151515] border border-[#FF6A00]/30 hover:border-primary rounded-full flex items-center justify-center cursor-pointer text-white transition-colors"
              >
                <X size={18} />
              </button>
 
              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A1F] to-[#D94700] rounded-full flex items-center justify-center mb-3 shadow-md shadow-orange-950/20">
                  <Utensils size={24} className="text-white" />
                </div>
                <h2 className="font-title text-2xl text-primary leading-none tracking-wide mb-1 uppercase">ARMA TU PLATO</h2>
                <p className="text-xs text-[#BDBDBD] font-medium">{complementModalDish.nombre}</p>
              </div>
 
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1 block mb-2">Selecciona el complemento</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                    {complementModalDish.complementos?.map(comp => {
                      const isSelected = selectedComplement?.id === comp.id;
                      return (
                        <button
                          key={comp.id}
                          type="button"
                          onClick={() => setSelectedComplement(comp)}
                          className={`w-full py-2.5 px-4 rounded-xl border font-bold text-xs flex justify-between items-center transition-colors cursor-pointer text-left shadow-sm
                            ${isSelected
                              ? "bg-gradient-to-r from-[#FF9A1F] to-[#D94700] text-white border-transparent"
                              : "bg-[#151515] border border-[#FF6A00]/15 text-gray-300 hover:border-primary"
                            }`}
                        >
                          <span>{comp.nombre}</span>
                          <span className={isSelected ? "text-white font-extrabold" : "text-[#FF9A1F]"}>
                            S/.{comp.precio.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
 
                <div>
                  <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1 block mb-2">Selecciona tus cremas</label>
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
                              ? "bg-gradient-to-r from-[#FF9A1F] to-[#F4511E] border-transparent text-white shadow-sm"
                              : "bg-[#151515] border border-[#FF6A00]/15 text-gray-400 hover:border-primary hover:text-white"
                            }`}
                        >
                          {sauce}
                        </button>
                      );
                    })}
                  </div>
                </div>
 
                <div>
                  <label className="text-[10px] font-bold text-[#BDBDBD] uppercase ml-1 block mb-1">Nota / Especificación (Opcional)</label>
                  <textarea
                    rows={2}
                    value={dishNote}
                    onChange={e => setDishNote(e.target.value)}
                    className="w-full bg-[#151515] border border-[#FF6A00]/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none mt-1 text-white placeholder-gray-600"
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
                  className="w-full bg-gradient-to-b from-[#FF9A1F] via-[#F4511E] to-[#D94700] text-white py-3.5 rounded-xl font-bold text-sm mt-2 flex justify-center items-center cursor-pointer transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-orange-600/20 border-0 uppercase tracking-wide"
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
