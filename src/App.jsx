import { useState } from 'react'
import JokeCard from './components/JokeCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <JokeCard/>
      </div>
      
    </>
  )
}

export default App
