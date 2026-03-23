import { useState, useEffect, useRef } from "react";
import imagen1 from "../../../assets/carrucel1.png";
import imagen2 from "../../../assets//carrucel2.png";
import imagen3 from "../../../assets/carrucel3.png";
import imagen4 from "../../../assets/carrucel4.png";

const useFadeInOnScroll = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, visible };
};

interface LifestyleCard {
    id: number;
    image: string;
    imageFallback: string;
    title: string;
    intro: string;
    body: string;
    actives: string;
    cta: string;
}


const CARDS: LifestyleCard[] = [
    {
        id: 1,
        image: imagen2,
        imageFallback: "#2d2d2d",
        title: "Potencia tu disciplina",
        intro: "El complemento ideal para tu entrenamiento diario.",
        body: "Diseñado para quienes buscan que su esfuerzo se refleje en una piel más firme, tonificada y con una textura visiblemente más lisa.",
        actives: "Activos: L-Carnitina, extracto de toronja y centella asiática.",
        cta: "VER KIT DE ENTRENAMIENTO",
    },
    {
        id: 2,
        image: imagen1,
        imageFallback: "#3a5a3a",
        title: "Escudo urbano invisible",
        intro: "Protección solar práctica y efectiva que se adapta a tu ritmo de vida.",
        body: "Formatos innovadores diseñados para llevar contigo y reaplicar en cualquier momento y lugar.",
        actives: "Activos: Vitamina E y filtros solares de amplio espectro.",
        cta: "DESCUBRIR PROTECCIÓN STICK",
    },
    {
        id: 3,
        image: imagen4,
        imageFallback: "#1a2a3a",
        title: "Firmeza mientras duermes",
        intro: "Aprovecha el ciclo de renovación nocturna de tu piel.",
        body: "Fórmulas inteligentes que trabajan mientras duermes para mejorar la elasticidad y suavidad de los tejidos.",
        actives: "Activos: Corallina Officinalis (coral vegetal) y extractos relajantes.",
        cta: "OPTIMIZAR MI DESCANSO",
    },
    {
        id: 4,
        image: imagen3,
        imageFallback: "#2a1a1a",
        title: "Soluciones de textura avanzada",
        intro: "Tratamientos enfocados en zonas específicas y necesidades puntuales de la piel.",
        body: "Ciencia y naturaleza unidas para atenuar la apariencia de la piel de naranja y estrías.",
        actives: "Activos: Mezcla de algas, romero y aceites naturales.",
        cta: "VER CUIDADO ESPECÍFICO",
    },
];


const ArrowRight = () => (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.07404 4.81247H0V3.93749H7.07404L3.75128 0.614729L4.37498 0L8.74996 4.37498L4.37498 8.74996L3.75128 8.13523L7.07404 4.81247Z" fill="#FF4D00" />
    </svg>


);

const ChevronLeft = () => (
    <svg width="10" height="16" viewBox="0 0 10 18" fill="none">
        <path
            d="M8.5 1L1 9L8.5 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ChevronRight = () => (
    <svg width="10" height="16" viewBox="0 0 10 18" fill="none">
        <path
            d="M1.5 1L9 9L1.5 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);


const LifestyleCardItem = ({ card }: { card: LifestyleCard }) => (
    <div
        className="flex-shrink-0 flex flex-col bg-white overflow-hidden"
        style={{
            width: 405,
            borderRadius: 12,
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            border: "1px solid #f0f0f0",
        }}
    >
        <div
            className="w-full relative overflow-hidden"
            style={{
                height: 339,
                borderRadius: "12px 12px 0 0",
                backgroundColor: card.imageFallback,
            }}
        >
            {card.image ? (
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.3">
                        <rect width="48" height="48" rx="8" fill="white" />
                        <path
                            d="M8 36L18 22L25 30L30 24L40 36H8Z"
                            fill="white"
                        />
                        <circle cx="32" cy="16" r="5" fill="white" />
                    </svg>
                </div>
            )}
        </div>

        <div className="flex flex-col gap-3 p-6 flex-1">
            <h3 className="text-lg font-bold text-gray-900 m-0 leading-snug">
                {card.title}
            </h3>
            <p className="text-sm text-gray-600 m-0 leading-relaxed">{card.intro}</p>
            <p className="text-sm text-gray-600 m-0 leading-relaxed">{card.body}</p>
            <p className="text-sm text-gray-600 m-0 leading-relaxed">{card.actives}</p>

            <button
                className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider mt-auto pt-2 w-fit group outline-none focus:outline-none focus:ring-0"
                style={{ color: "#FF4D00", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
                {card.cta}
                <span
                    className="transition-transform duration-200 group-hover:translate-x-1 outline-none"
                    style={{ color: "#FF4D00" }}
                >
                    <ArrowRight />
                </span>
            </button>
        </div>
    </div>
);

const Lifestyle = () => {
    const [current, setCurrent] = useState(0);

    const CARD_WIDTH = 405;
    const GAP = 24;
    const STEP = CARD_WIDTH + GAP;
    const VIEWPORT = CARD_WIDTH * 2 + GAP;
    const maxIndex = CARDS.length - 2;

    const prev = () => setCurrent((c) => Math.max(c - 1, 0));
    const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));

    const { ref, visible } = useFadeInOnScroll();


    const navBtnStyle: React.CSSProperties = {
        width: 33.66,
        height: 45,
        borderRadius: 50,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #E2E8F0",
        backgroundColor: "#ffffff00",
        cursor: "pointer",
        transition: "all 0.2s",
    };

    return (
        <section
            ref={ref}
            className="w-full py-16"
            style={{
                backgroundColor: "#F6F8F6",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold  m-0 leading-tight" style={{ color: "#0F172A" }}>
                        Diseñado para tu estilo de vida
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-[520px] mx-auto leading-relaxed">
                        Soluciones premium para el cuidado de la piel diseñadas para seguir
                        el ritmo de tu rutina activa, desde el entrenamiento de alta
                        intensidad hasta la recuperación esencial.
                    </p>
                </div>


                <div className="flex items-center justify-center gap-4">

                    <button
                        onClick={prev}
                        disabled={current === 0}
                        style={navBtnStyle}
                        className="hover:border-gray-400 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed "
                        aria-label="Anterior"
                    >
                        <ChevronLeft />
                    </button>

                    <div
                        className="overflow-hidden"
                        style={{ maxWidth: VIEWPORT }}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                gap: GAP,
                                transform: `translateX(-${current * STEP}px)`,
                            }}
                        >
                            {CARDS.map((card) => (
                                <LifestyleCardItem key={card.id} card={card} />
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={next}
                        disabled={current === maxIndex}
                        style={navBtnStyle}
                        className="hover:border-gray-400 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed outline-none"
                        aria-label="Siguiente"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Lifestyle;