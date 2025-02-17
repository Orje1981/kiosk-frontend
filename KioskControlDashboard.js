import { useEffect, useState } from "react";

export default function KioskControlDashboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://kiosk-backend-djuc.onrender.com/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kiosk Dashboard</h1>
      <div>
        {players.map((player) => (
          <div key={player.name} style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
            <h2>{player.name}</h2>
            <p>IP: {player.ip}</p>
            <p>Status: {player.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
