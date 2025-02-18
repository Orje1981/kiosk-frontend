import { useEffect, useState } from "react";

export default function KioskControlDashboard() {
  const [players, setPlayers] = useState([]);
  const [videos, setVideos] = useState([]);

  // Fetch Players
  useEffect(() => {
    fetch("https://kiosk-backend-djuc.onrender.com/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  // Fetch Available Videos
  useEffect(() => {
    fetch("https://kiosk-backend-djuc.onrender.com/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  // Add Video to Playlist
  const addVideo = (playerName, video) => {
    fetch(`https://kiosk-backend-djuc.onrender.com/players/${playerName}/playlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", video })
    })
    .then((res) => res.json())
    .then((updatedPlayer) => {
      setPlayers(players.map(p => p.name === playerName ? updatedPlayer : p));
    });
  };

  // Remove Video from Playlist
  const removeVideo = (playerName, video) => {
    fetch(`https://kiosk-backend-djuc.onrender.com/players/${playerName}/playlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove", video })
    })
    .then((res) => res.json())
    .then((updatedPlayer) => {
      setPlayers(players.map(p => p.name === playerName ? updatedPlayer : p));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kiosk Dashboard</h1>
      <div>
        {players.map((player) => (
          <div key={player.name} style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
            <h2>{player.name}</h2>
            <p>IP: {player.ip}</p>
            <p>Status: {player.status}</p>
            <h3>Playlist:</h3>
            <ul>
              {player.playlist.map(video => (
                <li key={video}>
                  {video} <button onClick={() => removeVideo(player.name, video)}>❌ Entfernen</button>
                </li>
              ))}
            </ul>
            <h3>Video hinzufügen:</h3>
            <select onChange={(e) => addVideo(player.name, e.target.value)}>
              <option value="">-- Video auswählen --</option>
              {videos.map(video => (
                <option key={video} value={video}>{video}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
