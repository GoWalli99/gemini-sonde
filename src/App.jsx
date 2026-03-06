import { useState } from 'react'

function App() {
  const [antwort, setAntwort] = useState('')

  const fragGemini = async () => {
    setAntwort('Ich frage nach...')
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyALbTPV6ywZaAhcuXS75DPaSOnX0OOjbHM', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Sag kurz Hallo!" }] }] })
      })
      const data = await response.json()
      setAntwort(data.candidates[0].content.parts[0].text)
    } catch (e) {
      setAntwort('Fehler: ' + e.message)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gemini Test-Sonde</h1>
      <button onClick={fragGemini}>Frag Gemini!</button>
      <p>Antwort: {antwort}</p>
    </div>
  )
}

export default App