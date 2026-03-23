import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import imagen4 from "../../../assets/gel.png";

const BARS = [
  { stars: 5, pct: 86 },
  { stars: 4, pct: 10 },
  { stars: 3, pct: 2 },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke="#FACC15"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill={filled ? "#FACC15" : "none"}
    />
  </svg>
);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const barVariant: Variants = {
  hidden: { scaleX: 0 },
  visible: (pct: number) => ({
    scaleX: pct / 100,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
  }),
};

const SocialProof = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full py-20" style={{ backgroundColor: "#ffffff" }}>
      <div
        ref={ref}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-12"
      >
        <motion.div
          className="flex flex-col gap-5 flex-1"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit"
            style={{
              color: "#FF4D00",
              backgroundColor: "#FF4D001A",
              border: "1px solid #FF4D0033",
            }}
          >
            Resultados reales
          </span>
          <h2
            className="font-extrabold text-gray-900 m-0 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", maxWidth: 578 }}
          >
            Transformación Impulsada por la ciencia y la naturaleza
          </h2>
          <p
            className="text-sm text-gray-500 m-0 leading-relaxed"
            style={{ maxWidth: 518 }}
          >
            Únete a más de 50 000 clientes satisfechos que han logrado una piel
            más firme y radiante con nuestras fórmulas botánicas.
          </p>

          <div
            className="flex items-start gap-6 mt-2"
            style={{ maxWidth: 500 }}
          >
            <div className="flex flex-col gap-1 flex-shrink-0">
              <span className="text-4xl font-extrabold text-gray-900 leading-none">
                4.9
              </span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} filled={i === 1} />
                ))}
              </div>
              <span className="text-xs text-gray-400 leading-tight">
                2,450 Reseñas
                <br />
                verificadas
              </span>
            </div>
            <div className="flex flex-col gap-2 flex-1 pt-1">
              {BARS.map(({ stars, pct }) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-3">{stars}</span>
                  <div
                    className="flex-1 rounded-full overflow-hidden"
                    style={{ height: 6, backgroundColor: "#e5e7eb" }}
                  >
                    <motion.div
                      className="h-full rounded-full origin-left"
                      style={{ backgroundColor: "#FF4D00" }}
                      custom={pct}
                      variants={barVariant}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-7 text-right">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          className="relative w-full lg:w-[544px] overflow-hidden rounded-2xl"
          style={{ height: "clamp(300px, 50vw, 496px)" }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeRight}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#2a1f1a" }}
          >
            <img
              src={imagen4}
              alt="Producto Torongia"
              className="w-full h-full object-cover"
              style={{ opacity: 0.5 }}
            />
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="8" fill="#888" />
                <path d="M8 36L18 22L25 30L30 24L40 36H8Z" fill="#888" />
                <circle cx="32" cy="16" r="5" fill="#888" />
              </svg>
            </div>
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)",
            }}
          />

          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-6"
            style={{ maxWidth: 480 }}
          >
            <p
              className="text-white font-medium leading-relaxed m-0"
              style={{ fontSize: "clamp(14px, 2vw, 20px)" }}
            >
              "Me encanta que se absorbe al instante. Me lo aplico terminando mi
              rutina, me visto y listo. Siento mi piel mucho más firme. ¡Cero
              sensación pegajosa!"
            </p>
            <span className="font-bold text-lg" style={{ color: "#FF4D00" }}>
              -Carla R.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
