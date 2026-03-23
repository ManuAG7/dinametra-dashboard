import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const NewsletterBanner = () => {
    const [email, setEmail] = useState("");
    const [btnHover, setBtnHover] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="w-full py-10" style={{ backgroundColor: "#F6F8F6" }}>
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex justify-center">

                {/* Contenedor principal 1120x366 */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 32 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 w-full rounded-2xl px-10 py-10"
                    style={{
                        maxWidth: 1120,
                        minHeight: 366,
                        backgroundColor: "#0F172A",
                    }}
                >
                    {/* ── Mancha derecha ── */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            width: 373,
                            height: 410,
                            borderRadius: "50%",
                            backgroundColor: "#FF4D0033",
                            filter: "blur(90px)",
                            top: "50%",
                            right: -60,
                            transform: "translateY(-50%)",
                        }}
                    />

                    {/* ── Columna izquierda: textos ── */}
                    <div className="flex flex-col gap-2 z-10 flex-1">
                        {/* Label superior */}
                        <span
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{ color: "#FF4D00" }}
                        >
                            Exclusivo para miembros
                        </span>

                        {/* Título */}
                        <h2
                            className="font-extrabold text-white m-0 leading-tight"
                            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                        >
                            Únete al club y ahorra
                        </h2>

                        {/* % gigante */}
                        <p
                            className="font-extrabold m-0 leading-none"
                            style={{
                                fontSize: "clamp(4rem, 10vw, 8rem)",
                                color: "#FF4D00",
                                letterSpacing: "-2px",
                            }}
                        >
                            el %15
                        </p>

                        {/* Subtexto */}
                        <p
                            className="text-sm leading-relaxed m-0 max-w-[380px]"
                            style={{ color: "#94a3b8" }}
                        >
                            Obtenga acceso anticipado a nuevos lanzamientos
                            y consejos restaurativos exclusivos.
                        </p>
                    </div>
                    {/* ── Columna derecha: input + botón ── */}
                    <div className="flex flex-row items-center justify-center z-10 flex-shrink-0 gap-3">

                        {/* Input */}
                        <div
                            className="flex items-center"
                            style={{
                                width: 320,
                                height: 56,
                                borderRadius: 12,
                                border: "1.5px solid #FF4D004D",
                                backgroundColor: "rgba(255,255,255,0.05)",
                                padding: "0 20px",
                            }}
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingresa tu correo electrónico"
                                className="flex-1 bg-transparent outline-none border-none text-white text-sm"
                                style={{ color: "#fff", caretColor: "#FF4D00", fontSize: 14 }}
                            />
                        </div>

                        {/* Botón separado */}
                        <button
                            onMouseEnter={() => setBtnHover(true)}
                            onMouseLeave={() => setBtnHover(false)}
                            className="flex items-center justify-center font-bold text-sm outline-none focus:outline-none focus:ring-0"
                            style={{
                                width: 151,
                                height: 52,
                                backgroundColor: btnHover ? "#e64400" : "#FF4D00",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.2s",
                                borderRadius: 8,
                            }}
                        >
                            Unirme ahora
                        </button>

                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterBanner;