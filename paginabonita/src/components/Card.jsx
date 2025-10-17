import { useState } from 'react';
import '../styles/Card.css';

const Card = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);          // 1er tap: abre el sobre
    } else if (!showPhotos) {
      setShowPhotos(true);      // 2do tap: muestra FOTOS
    } else {
      // 3er tap: reinicia
      setIsOpen(false);
      setShowPhotos(false);
    }
  };

  // Usa tus imágenes locales desde /public/fotos/
const images = ['fotos/foto1.jpg','fotos/foto2.jpg','fotos/foto3.jpg','fotos/foto4.jpg'];

  return (
    <div className="card-container" onClick={handleClick}>
      {/* Fondo animado */}
      <div className="background">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={i % 2 === 0 ? 'heart' : 'petal'}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {!showPhotos ? (
        <div className={`envelope ${isOpen ? 'open' : ''}`}>
          {/* Sello corazón */}
          <div className="heart-seal"></div>

          {/* Frente del sobre */}
          <div className="front">
            <div className="to-from">
              <p className="to">Para: Trini</p>
              <p className="from">De: Lautaro</p>
              <p className="date">14 de Julio 2023</p>
            </div>
          </div>

          {/* Carta */}
          <div className="letter">
            <div className="letter-content">
              <h1>¡Felices 3 Meses Mi Amor!</h1>
              <p>
                Tres meses llenos de momentos inolvidables,
                risas compartidas y un amor que crece cada día más.
                Gracias por hacer cada día especial.
              </p>
              <p>Con todo mi amor,</p>
              <p>Lautaro ❤️</p>
            </div>
          </div>

          <div className="flap"></div>
        </div>
      ) : (
        // SOLAPA FOTOS
        <div className="photo-gallery">
          <h2 className="gallery-title">Nuestros momentos 💖</h2>
          <div className="gallery-grid">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Foto ${index + 1}`}
                className="memory-photo"
                loading="lazy"
              />
            ))}
          </div>
          <div className="restart-hint">Toca para volver al inicio ❤️</div>
        </div>
      )}
    </div>
  );
};

export default Card;
