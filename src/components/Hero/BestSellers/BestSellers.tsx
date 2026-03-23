import { useState, useRef, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import imagen1 from "../../../assets/masVen1.png";
import imagen2 from "../../../assets/masVen2.png";
import imagen3 from "../../../assets/masVen3.png";

interface Product {
  id: number;
  image: string;
  imageFallback: string;
  reviews: number;
  rating: number;
  name: string;
  description: string;
  price: string;
}

const TABS = [
  "Todos los productos",
  "Corporales",
  "Faciales",
  "Protectores solares",
];

const FILTER_OPTIONS = ["Más vendidos", "Menor precio", "Mayor precio"];

const PRODUCTS: Product[] = [
  {
    id: 1,
    image: imagen1,
    imageFallback: "#f5e6c8",
    reviews: 120,
    rating: 3,
    name: "Protector solar REAFIRMANTE UV FIRM FPS 50",
    description:
      "Protección solar de alto desempeño con beneficio reafirmante para tu rostro.",
    price: "$125.00",
  },
  {
    id: 2,
    image: imagen2,
    imageFallback: "#d4e8e0",
    reviews: 85,
    rating: 3,
    name: "Gel Corporal Reafirmante",
    description:
      "Tu aliado post-entrenamiento para una piel visiblemente más firme y tonificada.",
    price: "$125.00",
  },
  {
    id: 3,
    image: imagen3,
    imageFallback: "#f5c842",
    reviews: 40,
    rating: 3,
    name: "Protector solar en barra FPS 50",
    description:
      "Alta protección invisible que se desliza contigo, sin ensuciar tus manos.",
    price: "$329.00",
  },
];

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "#FF4D00" : "none"}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke={filled ? "#FF4D00" : "#9ca3af"}
      strokeWidth="1.5"
      fill={filled ? "#FF4D00" : "none"}
    />
  </svg>
);

const CartIcon = () => (
  <svg
    width="12"
    height="15"
    viewBox="0 0 12 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 15C1.0875 15 0.734375 14.8531 0.440625 14.5594C0.146875 14.2656 0 13.9125 0 13.5V4.5C0 4.0875 0.146875 3.73438 0.440625 3.44062C0.734375 3.14687 1.0875 3 1.5 3H3C3 2.175 3.29375 1.46875 3.88125 0.88125C4.46875 0.29375 5.175 0 6 0C6.825 0 7.53125 0.29375 8.11875 0.88125C8.70625 1.46875 9 2.175 9 3H10.5C10.9125 3 11.2656 3.14687 11.5594 3.44062C11.8531 3.73438 12 4.0875 12 4.5V13.5C12 13.9125 11.8531 14.2656 11.5594 14.5594C11.2656 14.8531 10.9125 15 10.5 15H1.5ZM1.5 13.5H10.5V4.5H9V6C9 6.2125 8.92813 6.39062 8.78438 6.53438C8.64062 6.67813 8.4625 6.75 8.25 6.75C8.0375 6.75 7.85938 6.67813 7.71562 6.53438C7.57187 6.39062 7.5 6.2125 7.5 6V4.5H4.5V6C4.5 6.2125 4.42813 6.39062 4.28438 6.53438C4.14062 6.67813 3.9625 6.75 3.75 6.75C3.5375 6.75 3.35938 6.67813 3.21563 6.53438C3.07188 6.39062 3 6.2125 3 6V4.5H1.5V13.5ZM4.5 3H7.5C7.5 2.5875 7.35312 2.23438 7.05937 1.94062C6.76562 1.64687 6.4125 1.5 6 1.5C5.5875 1.5 5.23438 1.64687 4.94063 1.94062C4.64688 2.23438 4.5 2.5875 4.5 3ZM1.5 13.5V4.5V13.5Z"
      fill="#0F172A"
    />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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

const StarRating = ({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) => (
  <div className="flex flex-wrap items-center gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <StarIcon key={i} filled={i <= rating} />
    ))}
    <span className="ml-1 text-[11px] sm:text-xs text-gray-400">
      ({reviews} reviews)
    </span>
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const ProductCard = ({ product }: { product: Product }) => {
  const [liked, setLiked] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [buyHover, setBuyHover] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white"
      style={{
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        border: "1px solid #f0f0f0",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        transition: { duration: 0.25 },
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "clamp(220px, 38vw, 277px)",
          backgroundColor: product.imageFallback,
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              opacity="0.2"
            >
              <rect width="48" height="48" rx="8" fill="#888" />
              <path d="M8 36L18 22L25 30L30 24L40 36H8Z" fill="#888" />
              <circle cx="32" cy="16" r="5" fill="#888" />
            </svg>
          </div>
        )}

        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white outline-none"
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

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <StarRating rating={product.rating} reviews={product.reviews} />

        <h3 className="m-0 line-clamp-2 text-lg font-bold leading-snug text-gray-900 sm:text-xl">
          {product.name}
        </h3>

        <p className="m-0 flex-1 text-sm leading-relaxed text-gray-500">
          {product.description}
        </p>

        <p className="m-0 text-lg font-extrabold sm:text-xl" style={{ color: "#FF4D00" }}>
          {product.price}
        </p>

        <div className="mt-1 flex flex-col gap-2 sm:flex-row">
          <button
            onMouseEnter={() => setCartHover(true)}
            onMouseLeave={() => setCartHover(false)}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-xs font-semibold outline-none sm:flex-1"
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
            className="h-11 w-full rounded-full px-4 text-xs font-semibold text-white outline-none sm:flex-1"
            style={{
              backgroundColor: buyHover ? "#e64400" : "#FF4D00",
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
  const filterRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      className="w-full overflow-hidden py-14 sm:py-16 lg:py-20"
      style={{ backgroundColor: "#F6F8F6" }}
    >
      <div
        ref={ref}
        className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      >
        <motion.div
          className="mb-8 text-center sm:mb-10"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2 className="m-0 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl xl:text-5xl">
            Nuestros más vendidos
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] px-2 text-sm leading-relaxed text-gray-500 sm:text-base">
            Descubre los productos esenciales de alto rendimiento que nuestra
            comunidad adora. Ingredientes botánicos comprobados para resultados
            radiantes y saludables.
          </p>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-col gap-4 border-b border-[#4e4e4e2a] pb-5 lg:flex-row lg:items-center lg:justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className="h-10 flex-shrink-0 rounded-full px-4 sm:px-5 text-sm font-semibold outline-none"
                style={{
                  backgroundColor: activeTab === i ? "#FF4D00" : "#fff",
                  color: activeTab === i ? "#fff" : "#374151",
                  border: activeTab === i ? "none" : "1.5px solid #e5e7eb",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div ref={filterRef} className="relative w-full sm:w-auto">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="flex h-10 w-full items-center justify-between gap-2 rounded-full bg-white px-4 text-sm font-semibold outline-none sm:min-w-[220px]"
              style={{
                border: "1.5px solid #e5e7eb",
                color: "#374151",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              <span className="truncate">
                <span className="font-normal text-gray-400">Filtrar por: </span>
                {FILTER_OPTIONS[activeFilter]}
              </span>
              <ChevronDown />
            </button>

            {filterOpen && (
              <div
                className="absolute right-0 top-12 z-20 w-full overflow-hidden rounded-xl bg-white shadow-lg sm:min-w-[220px]"
                style={{ border: "1px solid #f0f0f0" }}
              >
                {FILTER_OPTIONS.map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setActiveFilter(i);
                      setFilterOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm outline-none"
                    style={{
                      color: activeFilter === i ? "#FF4D00" : "#374151",
                      fontWeight: activeFilter === i ? 600 : 400,
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fff5f2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6"
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