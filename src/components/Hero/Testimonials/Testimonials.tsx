import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import imagen1 from "../../../assets/testimonio1.png";
import imagen2 from "../../../assets/testimonio2.png";
import imagen3 from "../../../assets/testimonio3.png";

interface Testimonial {
  id: number;
  image: string;
  imageFallback: string;
  rating: number;
  quote: string;
  author: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    image: imagen1,
    imageFallback: "#c9b8a8",
    rating: 4,
    quote: '"Llevo semanas usándolo y la elasticidad de mis piernas mejoró muchísimo. Es el complemento real para quienes entrenamos diario."',
    author: "-Alejandra S.",
  },
  {
    id: 2,
    image: imagen2,
    imageFallback: "#d4cfc8",
    rating: 4,
    quote: '"El Torongia Stick es lo mejor para retocarme el bloqueador sin ensuciarme las manos. Es invisible y no arruina mi maquillaje."',
    author: "-Lorena N.",
  },
  {
    id: 3,
    image: imagen3,
    imageFallback: "#c8a882",
    rating: 4,
    quote: '"El UV Firm es súper ligero y deja un acabado mate perfecto. Protege mi cara del sol mientras le da firmeza. ¡Me encanta!"',
    author: "-Emilia E.",
  },
];

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

const ChevronLeft = () => (
  <svg width="10" height="16" viewBox="0 0 10 18" fill="none">
    <path d="M8.5 1L1 9L8.5 17" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="10" height="16" viewBox="0 0 10 18" fill="none">
    <path d="M1.5 1L9 9L1.5 17" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const TestimonialCard = ({ item }: { item: Testimonial }) => {
  const [playHover, setPlayHover] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col gap-3 flex-shrink-0 "
      style={{ width: 320 }}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: 320, height: 250, backgroundColor: item.imageFallback }}
      >
        {item.image && (
          <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
        )}

        <motion.div
          className="absolute inset-0"
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          whileHover={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          transition={{ duration: 0.25 }}
        />

        <button
          className="absolute inset-0 flex items-center justify-center outline-none focus:outline-none focus:ring-0"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          onMouseEnter={() => setPlayHover(true)}
          onMouseLeave={() => setPlayHover(false)}
          aria-label="Reproducir video"
        >
          <motion.div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 56,
              height: 56,
              backgroundColor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
            }}
            animate={{ scale: playHover ? 1.15 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path
                d="M1 1.5L17 10L1 18.5V1.5Z"
                fill="#0F172A"
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </button>
      </div>

      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} filled={i <= item.rating} />
        ))}
      </div>

      <p className="text-2sm text-gray-700 m-0 leading-relaxed font-bold">{item.quote}</p>
      <span className="text-sm text-gray-400">{item.author}</span>
    </motion.div>
  );
};
const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const CARD_WIDTH = 320;
  const GAP = 24;
  const STEP = CARD_WIDTH + GAP;
  const VISIBLE = 3;
  const VIEWPORT = CARD_WIDTH * VISIBLE + GAP * (VISIBLE - 1);
  const maxIndex = TESTIMONIALS.length - VISIBLE;

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));

  const navBtnStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1.5px solid #e5e7eb",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "all 0.2s",
  };

  return (
    <section className="w-full  overflow-hidden" style={{ backgroundColor: "#fff" }}>
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            disabled={current === 0}
            style={navBtnStyle}
            className="hover:border-gray-400 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed outline-none focus:outline-none focus:ring-0"
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>
          <div className="overflow-hidden" style={{ width: VIEWPORT }}>
            <motion.div
              className="flex"
              style={{ gap: GAP }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div
                className="flex"
                style={{ gap: GAP }}
                animate={{ x: -current * STEP }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {TESTIMONIALS.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </motion.div>
            </motion.div>
          </div>
          <button
            onClick={next}
            disabled={current === maxIndex}
            style={navBtnStyle}
            className="hover:border-gray-400 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed outline-none focus:outline-none focus:ring-0"
            aria-label="Siguiente"
          >
            <ChevronRight />
          </button>

        </div>
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(Math.min(i, maxIndex))}
              className="rounded-full transition-all duration-300 outline-none focus:outline-none focus:ring-0"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                backgroundColor: i === current ? "#FF4D00" : "#d1d5db",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;