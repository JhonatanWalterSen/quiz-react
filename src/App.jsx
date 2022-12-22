import { useState, useEffect } from 'react'
import preguntas from './helpers/preguntas'


function App() {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [puntuacion, setPuntuacion] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [tiemporestante, setTiempoRestante] = useState(15)
  const [areDisabled, setAreDisabled] = useState(false)
  const [answersShow, setAnswersShow] = useState(false)

  function handleAnswerSubmit(isCorrect, e) {
    if (isCorrect) setPuntuacion(puntuacion + 1)
    e.target.classList.add(isCorrect? "correct": "incorrect")
    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true)
      } else{
        setPreguntaActual(preguntaActual+1)
        setTiempoRestante(10)
      }
    }, 400);
  }

  useEffect(()=>{
    const interval = setInterval(() => {
      if (tiemporestante > 0) setTiempoRestante(tiemporestante - 1)
      if (tiemporestante === 0) setAreDisabled(true)
    }, 1000);
    return() => clearInterval(interval)
  },[tiemporestante])

  if (isFinished)
  return (
    <main className='app'>
      <div className='juego-terminado'>
        <span>
          {" "}
          Obtuviste {puntuacion}  de {preguntas.length}{" "}
        </span>
        <button  onClick={() =>{ window.location.href ="/"}}>
          {" "}
          Volver a jugar
        </button>
        <button  onClick={() =>{
          setIsFinished(false)
          setAnswersShow(true)
          setPreguntaActual(0)
        }}>
          Ver Respuestas
        </button>
      </div>
    </main>
  )
  if (answersShow) return <main className='app'>

  <div className='lado-izquierdo'>
        <div className='numero-pregunta'>
          <span>Pregunta {preguntaActual+1} de</span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">
          {preguntas[preguntaActual].titulo} {" "}
        </div>
        <div>
          {
            preguntas[preguntaActual].opciones.filter(
              (opcion) => opcion.isCorrect
            )[0].textoRespuesta
          }
        </div>
        <button onClick={()=>{
          if (preguntaActual === preguntas.length - 1) {
            window.location.href='/'
          } else{
            setPreguntaActual(preguntaActual+1)
          }
        }}>
          {preguntaActual === preguntas.length -1
          ? "Volver a jugar"
          : 'Siguiente'}
        </button>
      </div>
  </main>

  return (
    <main className='app'>

      <div className='lado-izquierdo'>
        <div className='numero-pregunta'>
          <span>Pregunta {preguntaActual+1} de</span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">
          {preguntas[preguntaActual].titulo} {" "}
        </div>
        <div>
        {!areDisabled ? (
          <span className='tiempo-restante'>Tiempo restante: {tiemporestante}</span>
        ):(
            <button onClick={() =>{
              setTiempoRestante(10)
              setAreDisabled(false)
              setPreguntaActual(preguntaActual+1)
            }}>Continuar</button>
          )
        }
        </div>
      </div>

      <div className='lado-derecho'>
        {preguntas[preguntaActual].opciones.map(opcion =>(
          <button
            disabled={areDisabled}
            key={opcion.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(opcion.isCorrect, e)}
          >{opcion.textoRespuesta}</button>
        ))}
      </div>

    </main>
  )
}

export default App
