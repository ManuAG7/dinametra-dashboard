import { useState } from "react";
import productosImg from '../../assets/imaen.png';
import peq from '../../assets/peq.png';

const Hero = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [btnHover, setBtnHover] = useState(false);
    const [cardHover, setCardHover] = useState(false);

    const features = [
        {
            label: 'Resultados visibles',
            sub: 'Eficacia clínica',
            icon: (
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <path d="M6.95 13.55L12.6 7.9L11.175 6.475L6.95 10.7L4.85 8.6L3.425 10.025L6.95 13.55ZM8 20C5.68333 19.4167 3.77083 18.0875 2.2625 16.0125C0.754167 13.9375 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 11.6333 15.2458 13.9375 13.7375 16.0125C12.2292 18.0875 10.3167 19.4167 8 20ZM8 17.9C9.73333 17.35 11.1667 16.25 12.3 14.6C13.4333 12.95 14 11.1167 14 9.1V4.375L8 2.125L2 4.375V9.1C2 11.1167 2.56667 12.95 3.7 14.6C4.83333 16.25 6.26667 17.35 8 17.9Z" fill="#FF4D00" />
                </svg>
            ),
        },
        {
            label: 'Fórmula natural',
            sub: 'Activos de origen vegetal',
            icon: (
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path d="M2.4 14.5923C1.65 13.8423 1.0625 12.9756 0.6375 11.9923C0.2125 11.009 0 9.99231 0 8.94231C0 7.89231 0.2 6.85481 0.6 5.82981C1 4.80481 1.65 3.84231 2.55 2.94231C3.13333 2.35897 3.85417 1.85897 4.7125 1.44231C5.57083 1.02564 6.5875 0.696474 7.7625 0.454808C8.9375 0.213141 10.2792 0.0673077 11.7875 0.0173077C13.2958 -0.0326923 14.9833 0.025641 16.85 0.192308C16.9833 1.95897 17.025 3.58397 16.975 5.06731C16.925 6.55064 16.7875 7.88814 16.5625 9.07981C16.3375 10.2715 16.0208 11.3131 15.6125 12.2048C15.2042 13.0965 14.7 13.8423 14.1 14.4423C13.2167 15.3256 12.2792 15.9715 11.2875 16.3798C10.2958 16.7881 9.28333 16.9923 8.25 16.9923C7.16667 16.9923 6.10833 16.7798 5.075 16.3548C4.04167 15.9298 3.15 15.3423 2.4 14.5923ZM5.2 14.1923C5.68333 14.4756 6.17917 14.6798 6.6875 14.8048C7.19583 14.9298 7.71667 14.9923 8.25 14.9923C9.01667 14.9923 9.775 14.8381 10.525 14.5298C11.275 14.2215 11.9917 13.7256 12.675 13.0423C12.975 12.7423 13.2792 12.3215 13.5875 11.7798C13.8958 11.2381 14.1625 10.5298 14.3875 9.65481C14.6125 8.77981 14.7833 7.72147 14.9 6.47981C15.0167 5.23814 15.0333 3.75897 14.95 2.04231C14.1333 2.00897 13.2125 1.99647 12.1875 2.00481C11.1625 2.01314 10.1417 2.09231 9.125 2.24231C8.10833 2.39231 7.14167 2.63397 6.225 2.96731C5.30833 3.30064 4.55833 3.75897 3.975 4.34231C3.225 5.09231 2.70833 5.83397 2.425 6.56731C2.14167 7.30064 2 8.00897 2 8.69231C2 9.67564 2.1875 10.5381 2.5625 11.2798C2.9375 12.0215 3.26667 12.5423 3.55 12.8423C4.25 11.509 5.175 10.2298 6.325 9.00481C7.475 7.77981 8.81667 6.77564 10.35 5.99231C9.15 7.04231 8.10417 8.22981 7.2125 9.55481C6.32083 10.8798 5.65 12.4256 5.2 14.1923Z" fill="#FF4D00" />
                </svg>
            ),
        },
        {
            label: 'Envíos nacionales',
            sub: 'Entrega rápida y confiable',
            icon: (
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                    <path d="M5 16C4.16667 16 3.45833 15.7083 2.875 15.125C2.29167 14.5417 2 13.8333 2 13H0V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16V4H19L22 8V13H20C20 13.8333 19.7083 14.5417 19.125 15.125C18.5417 15.7083 17.8333 16 17 16C16.1667 16 15.4583 15.7083 14.875 15.125C14.2917 14.5417 14 13.8333 14 13H8C8 13.8333 7.70833 14.5417 7.125 15.125C6.54167 15.7083 5.83333 16 5 16ZM5 14C5.28333 14 5.52083 13.9042 5.7125 13.7125C5.90417 13.5208 6 13.2833 6 13C6 12.7167 5.90417 12.4792 5.7125 12.2875C5.52083 12.0958 5.28333 12 5 12C4.71667 12 4.47917 12.0958 4.2875 12.2875C4.09583 12.4792 4 12.7167 4 13C4 13.2833 4.09583 13.5208 4.2875 13.7125C4.47917 13.9042 4.71667 14 5 14ZM2 11H2.8C3.08333 10.7 3.40833 10.4583 3.775 10.275C4.14167 10.0917 4.55 10 5 10C5.45 10 5.85833 10.0917 6.225 10.275C6.59167 10.4583 6.91667 10.7 7.2 11H14V2H2V11ZM17 14C17.2833 14 17.5208 13.9042 17.7125 13.7125C17.9042 13.5208 18 13.2833 18 13C18 12.7167 17.9042 12.4792 17.7125 12.2875C17.5208 12.0958 17.2833 12 17 12C16.7167 12 16.4792 12.0958 16.2875 12.2875C16.0958 12.4792 16 12.7167 16 13C16 13.2833 16.0958 13.5208 16.2875 13.7125C16.4792 13.9042 16.7167 14 17 14ZM16 9H20.25L18 6H16V9Z" fill="#FF4D00" />
                </svg>
            ),
        },
    ];

    return (
        <section className="w-full overflow-visible" style={{ backgroundColor: '#F6F8F6' }}>
            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-left  { animation: fadeInUp 0.6s ease both; }
        .hero-right { animation: fadeInUp 0.7s ease 0.15s both; }
        .feature-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(255,77,0,0.12) !important;
          border-color: #FF4D00 !important;
        }
        .float-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .float-card:hover {
          transform: translate(-4px, -4px);
          box-shadow: 10px 10px 32px rgba(0,0,0,0.16) !important;
        }
        .main-image-wrap {
          transition: transform 0.3s ease;
        }
        .main-image-wrap:hover {
          transform: scale(1.01);
        }
      `}</style>

            <div className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-12 gap-6 w-full max-w-[1400px] mx-auto">

                {/* ── COLUMNA IZQUIERDA ── */}
                <div className="hero-left flex flex-col gap-5 w-full lg:w-1/2">

                    {/* Estrellas */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} width="18" height="17" viewBox="0 0 20 21" fill="none">
                                <path d="M6.85 14.825L10 12.925L13.15 14.85L12.325 11.25L15.1 8.85L11.45 8.525L10 5.125L8.55 8.5L4.9 8.825L7.675 11.25L6.85 14.825ZM3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="#FACC15" />
                            </svg>
                        ))}
                        <span className="text-gray-500 text-sm pl-2">1,500+ Clientes felices</span>
                    </div>

                    {/* Título */}
                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 m-0">
                            Reafirma tu<br />esfuerzo.
                        </h1>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight m-0" style={{ color: '#FF4D00' }}>
                            Potencia tu piel.
                        </h2>
                    </div>

                    {/* Descripción */}
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-[511px]">
                        El complemento experto para tu rutina diaria que brinda firmeza, mejora la elasticidad y suaviza la textura de tu piel con extractos naturales.
                    </p>

                    {/* Botón CTA */}
                    <button
                        className="flex items-center gap-2 text-white font-semibold rounded-full px-7 h-14 w-fit active:scale-95"
                        style={{
                            backgroundColor: '#FF4D00',
                            transition: 'background-color 0.2s, transform 0.15s',
                            transform: btnHover ? 'scale(1.04)' : 'scale(1)',
                        }}
                        onMouseEnter={() => setBtnHover(true)}
                        onMouseLeave={() => setBtnHover(false)}
                    >
                        Comprar ahora
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z" fill="white" />
                        </svg>

                    </button>

                    {/* Features */}
                    <div className="flex flex-wrap gap-3 mt-2">
                        {features.map((f) => (
                            <div
                                key={f.label}
                                className="feature-card flex items-center gap-3 bg-white rounded-xl p-3 cursor-pointer"
                                style={{
                                    border: '1px solid #f3f4f6',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                    width: 177,
                                    minWidth: 177,
                                }}
                            >
                                <div className="flex-shrink-0 self-start" style={{ marginTop: 6 }}>
                                    {f.icon}
                                </div>
                                <div>
                                    <p className="m-0 font-semibold text-xs text-gray-900">{f.label}</p>
                                    <p className="m-0 text-xs text-gray-400">{f.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── COLUMNA DERECHA ── */}
                <div
                    className="hero-right main-image-wrap relative w-full lg:w-[567px] lg:h-[709px] md:h-[500px] h-[360px] rounded-3xl flex-shrink-0"
                    style={{
                        backgroundColor: '#fff7ed',
                        boxShadow: '8px 8px 32px rgba(0,0,0,0.12), 4px 4px 16px rgba(0,0,0,0.08)',
                    }}
                >
                    {/* Badge */}
                    <div className="absolute z-20" style={{ top: -20, right: -20 }}>
                        <div style={{
                            width: 100, height: 100, borderRadius: '50%',
                            backgroundColor: '#FF4D00', color: '#fff',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            lineHeight: 1, gap: 3,
                        }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px' }}>100%</span>
                            <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em' }}>NATURAL</span>
                        </div>
                    </div>

                    {/* Imagen */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                        <img src={productosImg} alt="Productos Torongia" className="w-full h-full object-cover" />
                    </div>

                    {/* Card flotante */}
                    <div
                        className="float-card absolute bg-white rounded-2xl p-3 flex flex-col gap-2"
                        style={{
                            bottom: -20, left: -20,
                            boxShadow: '6px 6px 24px rgba(0,0,0,0.12)',
                            border: '1px solid #f3f4f6',
                            width: 170, zIndex: 20, 
                        }}
                    >
                        <img src={peq} alt="UV FIRM" className="w-full rounded-lg object-contain" style={{ height: 170  }} />
                        <p className="m-0 text-xs font-bold uppercase tracking-wider" style={{ color: '#FF4D00' }}>Lo más vendido</p>
                        <p className="m-0 text-xs font-semibold text-gray-900 leading-snug">
                            Protector solar<br />REAFIRMANTE UV<br />FIRM FP50
                        </p>
                        <div className="flex items-center justify-between w-full">
                            <p className="m-0 text-sm font-bold text-gray-900" style={{ color: '#FF4D00' }}>$499.00</p>
                            <div
                                className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
                                style={{ backgroundColor: '#FF4D00', transition: 'transform 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.15)')}
                                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 4.66667H0V3.5H3.5V0H4.66667V3.5H8.16667V4.66667H4.66667V8.16667H3.5V4.66667Z" fill="#0F172A" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;