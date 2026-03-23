import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface PillarCard {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    cta: string;
}

const IconDiscipline = () => (
    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.31728 13.7499L0 12.4326L8.56485 3.80528L13.5649 8.80528L20.5817 1.87495H16.875V0H23.7499V6.87495H21.875V3.19223L13.5649 11.5023L8.56485 6.50233L1.31728 13.7499Z" fill="#FF4D00" />
    </svg>

);

const IconProtection = () => (
    <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.37495 16.3941C11.3076 14.6458 12.546 13.421 13.0901 12.7199C13.6341 12.0188 13.9062 11.3196 13.9062 10.6223C13.9062 9.94381 13.6602 9.35959 13.1682 8.86959C12.6763 8.3796 12.0897 8.1346 11.4086 8.1346C11.0031 8.1346 10.6187 8.21463 10.2554 8.37468C9.89204 8.53473 9.59856 8.75599 9.37495 9.03844C9.14899 8.75599 8.85713 8.53473 8.49936 8.37468C8.14159 8.21463 7.75558 8.1346 7.34132 8.1346C6.66344 8.1346 6.0777 8.37939 5.58412 8.86897C5.09053 9.35855 4.84374 9.94283 4.84374 10.6218C4.84374 10.9802 4.89127 11.3102 4.98633 11.612C5.08139 11.9138 5.29052 12.2674 5.61373 12.6729C5.93693 13.0784 6.39511 13.5736 6.98825 14.1585C7.5814 14.7433 8.37697 15.4886 9.37495 16.3941ZM9.37495 23.6778C6.67144 22.9406 4.43307 21.3493 2.65984 18.9038C0.886614 16.4583 0 13.7243 0 10.7019V3.5096L9.37495 0L18.7499 3.5096V10.7019C18.7499 13.7243 17.8633 16.4583 16.0901 18.9038C14.3168 21.3493 12.0785 22.9406 9.37495 23.6778ZM9.37495 21.7019C11.5416 21.0144 13.3333 19.6394 14.75 17.5769C16.1666 15.5144 16.875 13.2227 16.875 10.7019V4.79562L9.37495 1.99514L1.87495 4.79562V10.7019C1.87495 13.2227 2.58329 15.5144 3.99995 17.5769C5.41662 19.6394 7.20829 21.0144 9.37495 21.7019Z" fill="#FF4D00" />
    </svg>

);

const IconFirmeza = () => (
    <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 23.5215H11.25C11.25 23.5215 11.3983 23.4241 11.6951 23.2292C11.9919 23.0343 12.3147 22.8161 12.6634 22.5744C13.0121 22.3328 13.3348 22.1145 13.6316 21.9197C13.9284 21.7248 14.0768 21.6273 14.0768 21.6273H14.9422C16.6858 21.5504 18.2972 21.06 19.7764 20.1562C21.2556 19.2523 22.4238 18.0304 23.2812 16.4903C21.4895 16.3232 19.7916 15.8688 18.1875 15.1272C16.5833 14.3856 15.1458 13.3776 13.875 12.1033C12.6121 10.8325 11.6037 9.39497 10.8497 7.7908C10.0957 6.18664 9.64579 4.49273 9.49995 2.70907C7.89579 3.60491 6.64058 4.83928 5.73433 6.4122C4.82808 7.98511 4.37495 9.68824 4.37495 11.5216C4.37495 11.6674 4.38096 11.8321 4.39298 12.0156C4.405 12.1991 4.42303 12.3597 4.44707 12.4976C4.44707 12.4976 4.35413 12.5368 4.16824 12.6154C3.98234 12.6939 3.77442 12.7776 3.54445 12.8666C3.31449 12.9555 3.10656 13.0412 2.92067 13.1238C2.73478 13.2063 2.64183 13.2476 2.64183 13.2476C2.59215 12.9703 2.55609 12.6846 2.53366 12.3906C2.51122 12.0965 2.5 11.8068 2.5 11.5216C2.5 8.78442 3.33453 6.34653 5.00358 4.20792C6.67263 2.06932 8.83086 0.666674 11.4783 0C11.2475 2.00641 11.4542 3.95191 12.0985 5.83652C12.7427 7.72113 13.7804 9.37898 15.2115 10.8101C16.6425 12.2412 18.3004 13.2788 20.185 13.923C22.0696 14.5673 24.0151 14.774 26.0215 14.5433C25.3677 17.1907 23.9682 19.3489 21.8232 21.018C19.6782 22.687 17.2371 23.5215 14.5 23.5215ZM5.62495 21.6466H11.25C11.7708 21.6466 12.2135 21.4643 12.5781 21.0997C12.9427 20.7351 13.125 20.2924 13.125 19.7716C13.125 19.2507 12.9479 18.808 12.5937 18.4434C12.2395 18.0789 11.8125 17.8966 11.3125 17.8966H9.68745L9.06245 16.3966C8.77079 15.7091 8.31245 15.1622 7.68745 14.7559C7.06245 14.3497 6.37495 14.1466 5.62495 14.1466C4.58329 14.1466 3.69787 14.5059 2.9687 15.2247C2.23954 15.9434 1.87495 16.8341 1.87495 17.8966C1.87495 18.9382 2.23954 19.8237 2.9687 20.5528C3.69787 21.282 4.58329 21.6466 5.62495 21.6466ZM5.62495 23.5215C4.06407 23.5055 2.73636 22.9522 1.64181 21.8617C0.547271 20.7711 0 19.4483 0 17.893C0 16.3378 0.547271 15.012 1.64181 13.9159C2.73636 12.8197 4.06449 12.2716 5.62621 12.2716C6.75517 12.2716 7.78368 12.5776 8.71173 13.1896C9.63978 13.8016 10.3288 14.6254 10.7788 15.661L10.935 16.0216H11.3197C12.3389 16.0473 13.2071 16.4232 13.9242 17.1494C14.6413 17.8755 14.9999 18.7497 14.9999 19.7717C14.9999 20.8117 14.6349 21.6966 13.905 22.4266C13.175 23.1565 12.29 23.5215 11.25 23.5215H5.62495Z" fill="#FF4D00" />
    </svg>

);

const IconSolutions = () => (
    <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 23.149V21.274H6.25V18.149H5.93748C4.29478 18.149 2.89452 17.5701 1.73671 16.4123C0.578904 15.2545 0 13.8542 0 12.2115C0 10.9984 0.340945 9.89461 1.02283 8.90022C1.70472 7.90584 2.61538 7.18109 3.7548 6.72596C3.85736 5.94551 4.22515 5.32852 4.85816 4.87499C5.49118 4.42146 6.18429 4.26281 6.9375 4.39904L6.17788 2.29326L7.36538 1.85576L6.92788 0.706718L8.84612 0L9.24516 1.1875L10.3846 0.77404L13.6538 9.69228L12.5144 10.1298L12.9519 11.3173L11.0336 12.024L10.6346 10.8365L9.4471 11.298L8.67306 9.11533C8.39261 9.43905 8.05327 9.68986 7.65503 9.86774C7.2568 10.0456 6.84133 10.1218 6.40864 10.0961C5.91825 10.0705 5.46913 9.92384 5.06128 9.65621C4.65342 9.38858 4.3237 9.04963 4.0721 8.63937C3.39741 8.98072 2.86255 9.4687 2.46751 10.1033C2.07247 10.7379 1.87495 11.4407 1.87495 12.2115C1.87495 13.34 2.26992 14.2992 3.05986 15.0891C3.84979 15.8791 4.809 16.274 5.93748 16.274H15.625V18.149H8.89415V21.274H16.3941V23.149H0ZM10.3557 9.34134L11.7211 8.80768L9.49998 2.66824L8.07207 3.17786L10.3557 9.34134ZM6.56163 8.60576C6.95643 8.60576 7.28764 8.47222 7.55527 8.20516C7.8229 7.93809 7.95672 7.60716 7.95672 7.21236C7.95672 6.81756 7.82318 6.48635 7.55612 6.21872C7.28905 5.95109 6.95812 5.81728 6.56332 5.81728C6.16852 5.81728 5.83731 5.95081 5.56968 6.21788C5.30205 6.48495 5.16824 6.81588 5.16824 7.21067C5.16824 7.60547 5.30177 7.93668 5.56884 8.20431C5.83591 8.47194 6.16684 8.60576 6.56163 8.60576Z" fill="#FF4D00" />
    </svg>
);

const ArrowRight = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path
            d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
            fill="currentColor"
        />
    </svg>
);

const PILLARS: PillarCard[] = [
    {
        id: 1,
        icon: <IconDiscipline />,
        title: "Disciplina que\nse nota en tu piel.",
        description:
            "No dejes que la falta de tono oculte tus resultados. Los geles de Torongia son el complemento de tu entrenamiento diario; diseñados para reafirmar y mejorar la elasticidad mientras mantienes tu ritmo activo.",
        cta: "QUIERO MÁS FIRMEZA",
    },
    {
        id: 2,
        icon: <IconProtection />,
        title: 'Protección invisible\n"On-the-go"',
        description:
            "Protege tu piel del fotoenvejecimiento sin interrumpir tus actividades. Formatos innovadores que brindan alta protección UVA/UVB con un acabado imperceptible y ligero.",
        cta: "LLEVAR PROTECCIÓN",
    },
    {
        id: 3,
        icon: <IconFirmeza />,
        title: "Firmeza que trabaja\nmientras descansas.",
        description:
            "Aprovecha las horas de sueño para recuperar la elasticidad de tu piel. Fórmulas inteligentes que actúan durante el reposo para que despiertes con una textura más suave y renovada.",
        cta: "OPTIMIZAR MI DESCANSO",
    },
    {
        id: 4,
        icon: <IconSolutions />,
        title: "Soluciones precisas\npara zonas exigentes.",
        description:
            "Tratamientos enfocados en mejorar la apariencia de estrías y zonas con pérdida severa de tono. La combinación exacta de ciencia y extractos naturales para reestructurar visualmente tu piel.",
        cta: "VER CUIDADO ESPECÍFICO",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const PillarCardItem = ({ card }: { card: PillarCard }) => (
    <motion.div
        variants={cardVariants}
        className="relative flex flex-col items-center text-center gap-5 p-6 rounded-2xl overflow-hidden"
        style={{
            backgroundColor: "rgba(255, 255, 255, 0)",
            border: "1px solid rgba(255, 255, 255, 0)",
            flexShrink: 0,
        }}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.06)", transition: { duration: 0.25 } }}
    >
        <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
                width: 64,
                height: 64,
                borderRadius: "100%",
                backgroundColor: "#FF4D001A",
            }}
        >
            {card.icon}
        </div>

        <h3
            className="text-white font-bold text-xl leading-snug m-0 whitespace-pre-line"
        >
            {card.title}
        </h3>

        <p className="text-sm leading-relaxed m-0" style={{ color: "#94a3b8" }}>
            {card.description}
        </p>

        <button
            className="flex items-center gap-2 mt-auto mx-auto group outline-none focus:outline-none focus:ring-0"
            style={{
                color: "#FF4D00",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                lineHeight: "20px",
                letterSpacing: 0,
                textTransform: "uppercase",
            }}
        >
            {card.cta}
            <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight />
            </span>
        </button>
    </motion.div>
);

const Pillars = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            className="w-full py-20 overflow-hidden relative"
            style={{ backgroundColor: "#0F172A" }}
        >
            <div
                className="absolute pointer-events-none"
                style={{
                    width: 330,
                    height: 850,
                    backgroundColor: "#FF4D0033",
                    filter: "blur(100px)",
                    top: "50%",
                    right: -100,
                    transform: "translateY(-50%)",
                }}
            />
            <div
                ref={ref}
                className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
            >
                <motion.div
                    className="text-center mb-14"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={headerVariants}
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white m-0 leading-tight">
                        Los pilares de Torongia
                    </h2>
                    <p
                        className="text-sm sm:text-base mt-4 max-w-[500px] mx-auto leading-relaxed"
                        style={{ color: "#94a3b8" }}
                    >
                        Nuestro compromiso con la precisión clínica, la disciplina de alto
                        rendimiento y la transformación visible.
                    </p>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {PILLARS.map((card) => (
                        <PillarCardItem key={card.id} card={card} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Pillars;