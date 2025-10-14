import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    // Crear corazones y pétalos flotantes
    const createFloatingElements = () => {
      const newHearts = []
      for (let i = 0; i < 20; i++) {
        newHearts.push({
          id: i,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 15}s`,
          size: `${Math.random() * 20 + 10}px`,
          type: Math.random() > 0.5 ? 'heart' : 'petal'
        })
      }
      setHearts(newHearts)
    }
    createFloatingElements()
  }, [])

  return (
    <div className="app-container">
      <div className="floating-hearts">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className={heart.type}
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              fontSize: heart.size,
            }}
          >
            {heart.type === 'heart' ? '❤' : '🌸'}
          </div>
        ))}
      </div>
      <div className="love-container">
        <h1>Mi Amor Eterno</h1>
        <div className="message-card">
          <p>Para la persona que ilumina mis días,</p>
          <p>Cada momento contigo es un regalo,</p>
          <p>Cada sonrisa tuya es mi felicidad,</p>
          <p>Te amo más que a nada en este mundo.</p>
        </div>
        <div className="photo-placeholder">
          <p>Pronto agregaremos nuestras fotos aquí</p>
          <span className="heart-icon">❤</span>
        </div>
      </div>
    </div>
  )
}

export default App
