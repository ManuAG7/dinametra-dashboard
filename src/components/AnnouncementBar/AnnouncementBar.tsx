const AnnouncementBar = () => {
  return (
    <div
      className="w-full py-2 px-4 text-center text-white text-xs sm:text-sm tracking-wide"
      style={{ backgroundColor: '#0A1628' }}
    >
      PROMOCIÓN DE TEMPORADA: ENVÍO GRATIS EN PEDIDOS DE MÁS DE $899.00 • USA EL CÓDIGO:{' '}
      <span style={{ color: '#FF4D00' }}>REFRESH</span>
    </div>
  );
};

export default AnnouncementBar;