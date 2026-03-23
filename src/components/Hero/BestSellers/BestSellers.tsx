import { useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import imagen1 from "../../../assets/masVen1.png";
import imagen2 from "../../../assets/masVen2.png";
import imagen3 from "../../../assets/masVen3.png";

interface Product {
    id: number;
    image: string;
    imageFallback: string;
    reviews: number;
    rating: number; // 1-5
    name: string;
    description: string;
    price: string;
}


const TABS = ["Todos los productos", "Corporales", "Faciales", "Protectores solares"];

const FILTER_OPTIONS = ["Más vendidos", "Menor precio", "Mayor precio"];


const PRODUCTS: Product[] = [
    {
        id: 1,
        image: imagen1,
        imageFallback: "#f5e6c8",
        reviews: 120,
        rating: 3,
        name: "Protector solar REAFIRMANTE UV FIRM FPS 50",
        description: "Protección solar de alto desempeño con beneficio reafirmante para tu rostro.",
        price: "$125.00",
    },
    {
        id: 2,
        image: imagen2,
        imageFallback: "#d4e8e0",
        reviews: 85,
        rating: 3,
        name: "Gel Corporal Reafirmante",
        description: "Tu aliado post-entrenamiento para una piel visiblemente más firme y tonificada.",
        price: "$125.00",
    },
    {
        id: 3,
        image: imagen3,
        imageFallback: "#f5c842",
        reviews: 40,
        rating: 3,
        name: "Protector solar en barra FPS 50",
        description: "Alta protección invisible que se desliza contigo, sin ensuciar tus manos.",
        price: "$329.00",
    },
];

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#FF4D00" : "none"}>
        <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke={filled ? "#FF4D00" : "#9ca3af"}
            strokeWidth="1.5"
            fill={filled ? "#FF4D00" : "none"}
        />
    </svg>
);

const CartIcon = () => (
    <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 15C1.0875 15 0.734375 14.8531 0.440625 14.5594C0.146875 14.2656 0 13.9125 0 13.5V4.5C0 4.0875 0.146875 3.73438 0.440625 3.44062C0.734375 3.14687 1.0875 3 1.5 3H3C3 2.175 3.29375 1.46875 3.88125 0.88125C4.46875 0.29375 5.175 0 6 0C6.825 0 7.53125 0.29375 8.11875 0.88125C8.70625 1.46875 9 2.175 9 3H10.5C10.9125 3 11.2656 3.14687 11.5594 3.44062C11.8531 3.73438 12 4.0875 12 4.5V13.5C12 13.9125 11.8531 14.2656 11.5594 14.5594C11.2656 14.8531 10.9125 15 10.5 15H1.5ZM1.5 13.5H10.5V4.5H9V6C9 6.2125 8.92813 6.39062 8.78438 6.53438C8.64062 6.67813 8.4625 6.75 8.25 6.75C8.0375 6.75 7.85938 6.67813 7.71562 6.53438C7.57187 6.39062 7.5 6.2125 7.5 6V4.5H4.5V6C4.5 6.2125 4.42813 6.39062 4.28438 6.53438C4.14062 6.67813 3.9625 6.75 3.75 6.75C3.5375 6.75 3.35938 6.67813 3.21563 6.53438C3.07188 6.39062 3 6.2125 3 6V4.5H1.5V13.5ZM4.5 3H7.5C7.5 2.5875 7.35312 2.23438 7.05937 1.94062C6.76562 1.64687 6.4125 1.5 6 1.5C5.5875 1.5 5.23438 1.64687 4.94063 1.94062C4.64688 2.23438 4.5 2.5875 4.5 3ZM1.5 13.5V4.5V13.5Z" fill="#0F172A" />
    </svg>

);

const ChevronDown = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            stroke="#FACC15"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill={filled ? "#FACC15" : "none"}
        />
    </svg>
);

const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon key={i} filled={i <= rating} />
        ))}
        <span className="text-xs text-gray-400 ml-1">({reviews} reviews)</span>
    </div>
);


const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};


const ProductCard = ({ product }: { product: Product }) => {
    const [liked, setLiked] = useState(false);
    const [cartHover, setCartHover] = useState(false);
    const [buyHover, setBuyHover] = useState(false);

    return (
        <motion.div
            variants={cardVariants}
            className="flex flex-col bg-white overflow-hidden"
            style={{
                width: 365,
                borderRadius: 12,
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                border: "1px solid #f0f0f0",
                flexShrink: 0,
            }}
            whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", transition: { duration: 0.25 } }}
        >
            <div
                className="relative w-full overflow-hidden"
                style={{
                    height: 277,
                    borderRadius: "12px 12px 0 0",
                    backgroundColor: product.imageFallback,
                }}
            >
                {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.2">
                            <rect width="48" height="48" rx="8" fill="#888" />
                            <path d="M8 36L18 22L25 30L30 24L40 36H8Z" fill="#888" />
                            <circle cx="32" cy="16" r="5" fill="#888" />
                        </svg>
                    </div>
                )}

                <button
                    onClick={() => setLiked((v) => !v)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center outline-none focus:outline-none focus:ring-0"
                    style={{
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        transition: "transform 0.2s",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    aria-label="Favorito"
                >
                    <HeartIcon filled={liked} />
                </button>
            </div>

            <div className="flex flex-col gap-2 p-4 flex-1">
                <StarRating rating={product.rating} reviews={product.reviews} />

                <h3 className="text-xl font-bold text-gray-900 m-0 leading-snug">
                    {product.name}
                </h3>

                <p className="text-2xs text-gray-500 m-0 leading-relaxed flex-1">
                    {product.description}
                </p>

                <p className="text-lg font-extrabold m-0" style={{ color: "#FF4D00" }}>
                    {product.price}
                </p>

                <div className="flex gap-2 mt-1">
                    <button
                        onMouseEnter={() => setCartHover(true)}
                        onMouseLeave={() => setCartHover(false)}
                        className="flex items-center justify-center gap-2 text-xs font-semibold rounded-full h-10 flex-1 outline-none focus:outline-none focus:ring-0"
                        style={{
                            border: `1.5px solid ${cartHover ? "#FF4D00" : "#e5e7eb"}`,
                            backgroundColor: cartHover ? "#fff5f2" : "#fff",
                            color: cartHover ? "#FF4D00" : "#000000",
                            transition: "all 0.2s",
                            cursor: "pointer",
                        }}
                    >
                        <CartIcon />
                        Agregar al carrito
                    </button>

                    <button
                        onMouseEnter={() => setBuyHover(true)}
                        onMouseLeave={() => setBuyHover(false)}
                        className="flex items-center justify-center text-xs font-semibold rounded-full h-13 flex-1 outline-none focus:outline-none focus:ring-0"
                        style={{
                            backgroundColor: buyHover ? "#e64400" : "#FF4D00",
                            color: "#fff",
                            border: "none",
                            transition: "background-color 0.2s",
                            cursor: "pointer",
                        }}
                    >
                        Comprar ahora
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const BestSellers = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeFilter, setActiveFilter] = useState(0);
    const [filterOpen, setFilterOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="w-full py-20 overflow-hidden" style={{ backgroundColor: "#F6F8F6" }}>
            <div ref={ref} className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">


                <motion.div
                    className="text-center mb-10"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={headerVariants}
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 m-0 leading-tight">
                        Nuestros más vendidos
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-[560px] mx-auto leading-relaxed">
                        Descubre los productos esenciales de alto rendimiento que nuestra comunidad adora.
                        Ingredientes botánicos comprobados para resultados radiantes y saludables.
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap items-center justify-between gap-4 mb-8"
                    style={{ borderBottom: "1px solid #4e4e4e2a", paddingBottom: 20 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex flex-wrap gap-2">
                        {TABS.map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(i)}
                                className="px-5 h-10 rounded-full text-sm font-semibold outline-none focus:outline-none focus:ring-0"
                                style={{
                                    backgroundColor: activeTab === i ? "#FF4D00" : "#fff",
                                    color: activeTab === i ? "#fff" : "#374151",
                                    border: activeTab === i ? "none" : "1.5px solid #e5e7eb",
                                    transition: "all 0.2s",
                                    cursor: "pointer",
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setFilterOpen((v) => !v)}
                            className="flex items-center gap-2 px-4 h-10 rounded-full text-sm font-semibold bg-white outline-none focus:outline-none focus:ring-0"
                            style={{
                                border: "1.5px solid #e5e7eb",
                                color: "#374151",
                                cursor: "pointer",
                                transition: "border-color 0.2s",
                            }}
                        >
                            <span className="text-gray-400 font-normal">Filtrar por:</span>
                            {FILTER_OPTIONS[activeFilter]}
                            <ChevronDown />
                        </button>

                        {filterOpen && (
                            <div
                                className="absolute right-0 top-12 bg-white rounded-xl shadow-lg z-20 overflow-hidden"
                                style={{ border: "1px solid #f0f0f0", minWidth: 160 }}
                            >
                                {FILTER_OPTIONS.map((opt, i) => (
                                    <button
                                        key={opt}
                                        onClick={() => { setActiveFilter(i); setFilterOpen(false); }}
                                        className="w-full text-left px-4 py-3 text-sm outline-none focus:outline-none"
                                        style={{
                                            color: activeFilter === i ? "#FF4D00" : "#374151",
                                            fontWeight: activeFilter === i ? 600 : 400,
                                            backgroundColor: "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                            transition: "background-color 0.15s",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fff5f2")}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className="flex justify-center gap-6 flex-wrap"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default BestSellers;