import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Welcome daddy</h1>
        <p>
          Name: Marc Aaron M. Gacad<br></br>
          Section: INF 234<br></br>
          Student ID: 2023-102496<br></br>
          Status: Single<br></br>
        </p>
        <a href="https://github.com/DozaPat/gacad-webprog">"https://github.com/DozaPat/gacad-webprog"</a>
      </div>
    </>
  )
}

export default App
