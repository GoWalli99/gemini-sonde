import { useState } from 'react'

function App() {
  const [antwort, setAntwort] = useState('')

  const fragGemini = async () => {
    // Ihr bewährter Key vom AI Studio
    const apiKey = "AIzaSyALbTPV6ywZaAhcuXS75DPaSOnX0OOjbHM";
    
    setAntwort('Ich frage nach...')
    
    try {
      // Änderung: Wir nutzen /v1/ statt /v1beta/ für maximale Stabilität
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Sag kurz Hallo!" }] }] })
      })

      if (!response.ok) {
        const errorData = await response.json();
        setAntwort(`Google-Fehler (${response.status}): ${errorData.error?.message || 'Modell-Konflikt'}`);
        return;
      }

      const data = await response.json()
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setAntwort(data.candidates[0].content.parts[0].text)
      } else {
        setAntwort('Antwort erhalten, aber kein Text gefunden.')
      }
      
    } catch (e) {
      setAntwort('Netzwerk-Fehler: ' + e.message)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Gemini Test-Sonde</h1>
      <p>Status: Teste stabile API-Version (v1)...</p>
      <button 
        onClick={fragGemini} 
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
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