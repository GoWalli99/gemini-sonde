import { useState } from 'react'

function App() {
  const [antwort, setAntwort] = useState('')

  const fragGemini = async () => {
    // Wir nutzen hier direkt Ihren funktionierenden Key aus dem AI Studio
    const apiKey = "AIzaSyALbTPV6ywZaAhcuXS75DPaSOnX0OOjbHM";
    
    setAntwort('Ich frage nach...')
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Sag kurz Hallo!" }] }] })
      })

      // Falls Google einen Fehler (wie 404) meldet, fangen wir das hier sauber ab
      if (!response.ok) {
        const errorData = await response.json();
        setAntwort(`Google-Fehler (${response.status}): ${errorData.error?.message || 'Unbekannter Fehler'}`);
        return;
      }

      const data = await response.json()
      
      // Wir prüfen, ob die Antwort von Google die erwartete Struktur hat
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setAntwort(data.candidates[0].content.parts[0].text)
      } else {
        setAntwort('Antwort erhalten, aber Format ist unerwartet.')
      }
      
    } catch (e) {
      setAntwort('Netzwerk-Fehler: ' + e.message)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Gemini Test-Sonde</h1>
      <p>Status: Verbindung zum AI Studio Key wird geprüft...</p>
      <button 
        onClick={fragGemini} 
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Frag Gemini!
      </button>
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <strong>Antwort:</strong> 
        <p>{antwort}</p>
      </div>
    </div>
  )
}

export default App