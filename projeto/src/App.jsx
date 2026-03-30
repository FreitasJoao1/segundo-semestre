import { useState } from 'react'
import './App.css'
import Mensagem from './components/Mensagem'
import InfoAluno from './components/InfoAluno'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to projeto</h1>


      <Mensagem />
      <InfoAluno />
    </>
  )
}

export default App
