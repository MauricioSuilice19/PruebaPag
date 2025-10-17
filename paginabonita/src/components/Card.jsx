import { useEffect, useRef, useState } from 'react';
import '../styles/Card.css';

export default function Card() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);          // 1er tap: abre el sobre
    } else if (!showPhotos) {
      setShowPhotos(true);      // 2do tap: muestra carta
    } else {
      // 3er tap: reiniciar todo
      setIsOpen(false);
      setShowPhotos(false);
    }
  };

  // Fotos en /public/fotos/
  const photos = [
    '/fotos/foto1.jpg',
    '/fotos/foto2.jpg',
    '/fotos/foto3.jpg',
    '/fotos/foto4.jpg',
  ];

  return (
    <div className="card-container" onClick={handleClick}>
      {/* Pétalos detrás (cayendo desde arriba) */}
      <div className="background" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={`back-${i}`}
            className={i % 2 === 0 ? 'heart' : 'petal'}
            style={{
              left: `${Math.random() * 100}%`,
              // Podés tunear duración/retardo por elemento:
              ['--dur']: `${12 + Math.random() * 6}s`,
              ['--delay']: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      {!showPhotos ? (
        <div className={`envelope ${isOpen ? 'open' : ''}`}>
          {/* Frente del sobre (el sello va ADENTRO del frente) */}
          <div className="front">
            <div className="heart-seal" aria-hidden="true" />
            <div className="to-from">
              <p className="to">Para: Trini</p>
              <p className="from">De: Lautaro</p>
              <p className="date">Por muchos meses más ✨</p>
            </div>
          </div>

          {/* Carta (detrás del frente) */}
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

          {/* Solapa */}
          <div className="flap" />
        </div>
      ) : (
        <>
          {/* Carrusel arrastrable infinito */}
          <div className="carousel" onClick={(e)=>e.stopPropagation()}>
            <div className="carousel-fade left" />
            <div className="carousel-fade right" />
            <DraggableInfiniteCarousel photos={photos} />
          </div>
          <div className="restart-hint outside">
            Toca fuera para volver al inicio ❤️
          </div>
        </>
      )}

      {/* Pétalos por delante de TODO, excepto en la solapa de fotos */}
      {!showPhotos && (
        <div className="foreground-petals" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`front-${i}`}
              className={i % 2 === 0 ? 'heart small' : 'petal small'}
              style={{
                left: `${Math.random() * 100}%`,
                ['--dur']: `${13 + Math.random() * 6}s`,
                ['--delay']: `${i * 0.9}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Carrusel arrastrable infinito con inercia ---------- */
function DraggableInfiniteCarousel({ photos }) {
  const n = photos.length;             // 4
  const COPIES = 3;                    // 3 copias para loop infinito
  const loopPhotos = Array.from({ length: COPIES }, () => photos).flat(); // 12

  const START = n;                     // arrancamos en el bloque central
  const [absIndex, setAbsIndex] = useState(START);
  const trackRef = useRef(null);
  const slideRef = useRef(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);

  const getSlideFullWidth = () => {
    if (!slideRef.current) return 0;
    return slideRef.current.getBoundingClientRect().width; // incluye padding
  };

  const applyTransform = (tx, withTransition = false) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = withTransition ? 'transform .35s cubic-bezier(.22,.8,.24,1)' : 'none';
    el.style.transform = `translateX(${tx}px)`;
  };

  const goToAbs = (i, withTransition = true) => {
    applyTransform(-i * getSlideFullWidth(), withTransition);
  };

  const normalizeIndex = (i) => {
    let x = i;
    if (x < n) x = i + n;     // volvemos al bloque central
    if (x >= 2*n) x = i - n;
    return x;
  };

  const liveDrag = (dx) => {
    const baseTx = -absIndex * getSlideFullWidth();
    applyTransform(baseTx + dx, false);
  };

  const onPointerDown = (e) => {
    isDown.current = true;
    const x = e.clientX ?? 0;
    startX.current = x;
    deltaX.current = 0;
    lastX.current = x;
    lastT.current = performance.now();

    if (e.pointerId != null && e.target && typeof e.target.setPointerCapture === 'function') {
      e.target.setPointerCapture(e.pointerId);
    }
    applyTransform(-absIndex * getSlideFullWidth(), false);
  };

  const onPointerMove = (e) => {
    if (!isDown.current) return;
    const x = e.clientX ?? 0;
    const t = performance.now();

    deltaX.current = x - startX.current;
    liveDrag(deltaX.current);

    if (t - lastT.current > 16) {
      lastX.current = x;
      lastT.current = t;
    }
  };

  const onPointerUp = () => {
    if (!isDown.current) return;
    isDown.current = false;

    const slideW = getSlideFullWidth();
    const t = performance.now();
    const dt = Math.max(1, t - lastT.current);
    const vx = (lastX.current - (startX.current + deltaX.current)) / dt; // px/ms
    const momentumBoost = Math.abs(vx) > 0.4 ? 1 : 0;

    const THRESHOLD = Math.max(40, slideW * 0.15);
    let nextAbs = absIndex;

    if (deltaX.current <= -THRESHOLD || (vx < -0.4)) nextAbs = absIndex + 1 + momentumBoost;
    else if (deltaX.current >= THRESHOLD || (vx > 0.4)) nextAbs = absIndex - 1 - momentumBoost;

    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function' && nextAbs !== absIndex) {
      navigator.vibrate(10);
    }

    goToAbs(nextAbs, true);

    const el = trackRef.current;
    const onEnd = () => {
      const normalized = normalizeIndex(nextAbs);
      if (normalized !== nextAbs) {
        goToAbs(normalized, false);
        setAbsIndex(normalized);
      } else {
        setAbsIndex(nextAbs);
      }
      el?.removeEventListener('transitionend', onEnd);
    };
    el?.addEventListener('transitionend', onEnd, { once: true });

    deltaX.current = 0;
  };

  // Alinear en mount/resize/orientación (sin depender de goToAbs)
  useEffect(() => {
    const align = () => {
      const el = trackRef.current;
      if (!el) return;
      const slideW = slideRef.current?.getBoundingClientRect().width ?? 0;
      el.style.transition = 'none';
      el.style.transform = `translateX(${-absIndex * slideW}px)`;
    };

    const RO = typeof ResizeObserver !== 'undefined' ? ResizeObserver : null;
    const ro = RO ? new RO(align) : null;

    if (trackRef.current && ro) ro.observe(trackRef.current);
    window.addEventListener('orientationchange', align);
    window.addEventListener('resize', align);

    const raf = requestAnimationFrame(align);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('orientationchange', align);
      window.removeEventListener('resize', align);
      cancelAnimationFrame(raf);
    };
  }, [absIndex]);

  const visibleBase = ((absIndex % n) + n) % n;

  return (
    <div
      className="carousel-viewport"
      role="listbox"
      aria-label="Carrusel de fotos, arrastrable"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="carousel-track drag" ref={trackRef}>
        {loopPhotos.map((src, i) => {
          const baseIndex = i % n;
          const extra =
            baseIndex === 1 ? ' cover2' :
            baseIndex === 3 ? ' contain center4' : '';
          const active = (i % n) === visibleBase ? ' active' : '';
          return (
            <div className={`carousel-slide${active}`} key={i} ref={i === 0 ? slideRef : undefined}>
              <img
                className={`carousel-img${extra}`}
                src={src}
                alt={`Foto ${baseIndex + 1}`}
                loading="lazy"
                draggable="false"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
