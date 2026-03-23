import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const NewsletterStrip = () => {
  const [email, setEmail] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "#FF4D00", marginTop: 60, marginBottom: 60 }}
    >
      {" "}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col items-center gap-4"
      >
        <h2
          className="text-white font-extrabold m-0 text-center"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
        >
          Newsletter
        </h2>

        <p
          className="text-white font-semibold text-center m-0"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}
        >
          Suscríbete para recibir promociones y descuentos especiales
        </p>

        <div
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2 w-full"
          style={{ maxWidth: 616 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            className="flex-1 outline-none border-none text-gray-600 text-sm px-4 rounded-lg w-full"
            style={{
              height: 56,
              backgroundColor: "#fff",
              caretColor: "#FF4D00",
              fontSize: 14,
            }}
          />

          <button
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            className="flex items-center justify-center font-bold text-sm tracking-widest uppercase outline-none focus:outline-none focus:ring-0 w-full sm:w-auto"
            style={{
              height: 56,
              paddingLeft: 24,
              paddingRight: 24,
              backgroundColor: btnHover ? "#1e293b" : "#0F172A",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
              borderRadius: 8,
              letterSpacing: "0.08em",
            }}
          >
            Suscribirme
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsletterStrip;
