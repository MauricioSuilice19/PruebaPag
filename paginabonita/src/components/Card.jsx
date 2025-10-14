import { useState } from 'react';
import '../styles/Card.css';

const Card = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (!showPhotos) {
      setShowPhotos(true);
    } else {
      // Reiniciar al estado inicial
      setIsOpen(false);
      setShowPhotos(false);
    }
  };

  const photos = [
    'https://placehold.co/600x400/pink/white?text=Foto+1',
    'https://placehold.co/600x400/pink/white?text=Foto+2',
    'https://placehold.co/600x400/pink/white?text=Foto+3'
  ];

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
          {/* Sello corazón arriba a la derecha */}
          <div className="heart-seal"></div>

          <div className="front">
            <div className="to-from">
              <p className="to">Para: Trini</p>
              <p className="from">De: Lautaro</p>
              <p className="date">14 de Julio 2023</p>
            </div>
          </div>

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
        <div className="photo-gallery">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Foto ${index + 1}`}
              className="memory-photo"
            />
          ))}
          <div className="restart-hint">
            Toca para volver al inicio ❤️
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
