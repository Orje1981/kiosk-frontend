import React, { useEffect, useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://kiosk-backend-djuc.onrender.com/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error("Fehler beim Laden der Daten:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kiosk Dashboard</h1>
      <div>
        {players.length > 0 ? (
          players.map((player) => (
            <div
              key={player.name}
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "5px",
                cursor: "pointer",
              }}
              onClick={() => alert(`Player: ${player.name}`)}
            >
              <h2>{player.name}</h2>
              <p>IP: {player.ip}</p>
              <p>Status: {player.status}</p>
            </div>
          ))
        ) : (
          <p>Lade Daten...</p>
        )}
      </div>
    </div>
  );
}

export default App;
