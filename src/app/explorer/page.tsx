"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";

interface Track {
  track_id: string;
  title: string;
  game: string;
  game_title: string;
  era: string;
  stage_position: string;
  x: number;
  y: number;
}

const ERA_COLORS: Record<string, string> = {
  pc98: "#FF6B6B",
  early_windows: "#4ECDC4",
  mid_windows: "#45B7D1",
  late_windows: "#96CEB4",
};

const GAME_COLORS: Record<string, string> = {
  TH01: "#FF6B6B", TH02: "#FF8E72", TH03: "#FFB07C", TH04: "#FFD93D", TH05: "#C9E4CA",
  TH06: "#6BCB77", TH07: "#4D96FF", TH08: "#9B59B6", TH09: "#E91E63",
  TH10: "#00BCD4", TH11: "#3F51B5", TH12: "#8BC34A", TH13: "#FF5722", TH14: "#795548",
  TH15: "#607D8B", TH16: "#9C27B0", TH17: "#673AB7", TH18: "#2196F3", TH19: "#009688",
};

const GAME_ABBREVS: Record<string, string> = {
  TH01: "HRtP", TH02: "SoEW", TH03: "PoDD", TH04: "LLS", TH05: "MS",
  TH06: "EoSD", TH07: "PCB", TH08: "IN", TH09: "PoFV",
  TH10: "MoF", TH11: "SA", TH12: "UFO", TH13: "TD", TH14: "DDC",
  TH15: "LoLK", TH16: "HSiFS", TH17: "WBaWC", TH18: "UM", TH19: "UDoALG",
};

const ALL_GAMES = Object.keys(GAME_ABBREVS);

export default function Explorer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [colorBy, setColorBy] = useState<"era" | "game">("era");
  const [showLabels, setShowLabels] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<Track | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetch("/data/umap_coords.json")
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  const draw = useCallback(() => {
    if (!tracks.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;

    // Clear with dark background
    ctx.fillStyle = "#0d0d1a";
    ctx.fillRect(0, 0, width, height);

    // Find bounds
    const xs = tracks.map((t) => t.x);
    const ys = tracks.map((t) => t.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);

    // Add margin
    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const dataMinX = minX - rangeX * 0.1;
    const dataMaxX = maxX + rangeX * 0.1;
    const dataMinY = minY - rangeY * 0.1;
    const dataMaxY = maxY + rangeY * 0.1;

    const scaleX = (x: number) => {
      const base = padding + ((x - dataMinX) / (dataMaxX - dataMinX)) * (width - 2 * padding);
      return (base - width / 2) * zoom + width / 2 + pan.x;
    };
    const scaleY = (y: number) => {
      const base = padding + ((y - dataMinY) / (dataMaxY - dataMinY)) * (height - 2 * padding);
      return (base - height / 2) * zoom + height / 2 + pan.y;
    };

    // Group tracks by game for label positioning
    const gamePositions: Record<string, { x: number; y: number; count: number }> = {};

    // Filter tracks if a game is selected
    const visibleTracks = selectedGame
      ? tracks.filter((t) => t.game === selectedGame)
      : tracks;

    // Draw ALL points first (dimmed if filtered)
    if (selectedGame) {
      tracks.forEach((track) => {
        if (track.game === selectedGame) return; // Draw selected later
        const px = scaleX(track.x);
        const py = scaleY(track.y);
        if (px < -20 || px > width + 20 || py < -20 || py > height + 20) return;

        const pointSize = Math.max(2, 3 * zoom);
        ctx.beginPath();
        ctx.arc(px, py, pointSize, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(50, 50, 70, 0.4)";
        ctx.fill();
      });
    }

    // Draw visible points with glow effect
    visibleTracks.forEach((track) => {
      const px = scaleX(track.x);
      const py = scaleY(track.y);

      if (px < -20 || px > width + 20 || py < -20 || py > height + 20) return;

      const color = colorBy === "era"
        ? ERA_COLORS[track.era] || "#888"
        : GAME_COLORS[track.game] || "#888";

      // Track centroid for labels
      if (!gamePositions[track.game]) {
        gamePositions[track.game] = { x: 0, y: 0, count: 0 };
      }
      gamePositions[track.game].x += px;
      gamePositions[track.game].y += py;
      gamePositions[track.game].count += 1;

      const pointSize = Math.max(2, 3.5 * zoom);

      // Glow effect
      const gradient = ctx.createRadialGradient(px, py, 0, px, py, pointSize * 2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color + "88");
      gradient.addColorStop(1, color + "00");

      ctx.beginPath();
      ctx.arc(px, py, pointSize * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core point
      ctx.beginPath();
      ctx.arc(px, py, pointSize, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // Draw labels at centroids (only if enabled and zoomed enough)
    if (showLabels && zoom >= 1.2) {
      ctx.font = `bold ${Math.max(9, 10 * zoom)}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      Object.entries(gamePositions).forEach(([game, pos]) => {
        if (pos.count === 0) return;
        const cx = pos.x / pos.count;
        const cy = pos.y / pos.count - 12 * zoom; // Offset above cluster

        if (cx < 0 || cx > width || cy < 0 || cy > height) return;

        const abbrev = GAME_ABBREVS[game] || game;
        const color = GAME_COLORS[game] || "#888";

        // Draw text with outline
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.strokeText(abbrev, cx, cy);
        ctx.fillStyle = color;
        ctx.fillText(abbrev, cx, cy);
      });
    }

    // Draw zoom indicator
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "10px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`Zoom: ${zoom.toFixed(1)}x | ${visibleTracks.length} tracks`, 8, height - 8);

  }, [tracks, colorBy, zoom, pan, showLabels, selectedGame]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !tracks.length) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setMousePos({ x: e.clientX, y: e.clientY });

    if (isDragging) {
      const dx = mx - dragStart.x;
      const dy = my - dragStart.y;
      setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: mx, y: my });
      return;
    }

    // Find hovered track
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;

    const xs = tracks.map((t) => t.x);
    const ys = tracks.map((t) => t.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const dataMinX = minX - rangeX * 0.1;
    const dataMaxX = maxX + rangeX * 0.1;
    const dataMinY = minY - rangeY * 0.1;
    const dataMaxY = maxY + rangeY * 0.1;

    const scaleX = (x: number) => {
      const base = padding + ((x - dataMinX) / (dataMaxX - dataMinX)) * (width - 2 * padding);
      return (base - width / 2) * zoom + width / 2 + pan.x;
    };
    const scaleY = (y: number) => {
      const base = padding + ((y - dataMinY) / (dataMaxY - dataMinY)) * (height - 2 * padding);
      return (base - height / 2) * zoom + height / 2 + pan.y;
    };

    let closest: Track | null = null;
    let closestDist = Infinity;
    const hitRadius = Math.max(8, 12 / zoom);

    const searchTracks = selectedGame ? tracks.filter((t) => t.game === selectedGame) : tracks;

    searchTracks.forEach((track) => {
      const px = scaleX(track.x);
      const py = scaleY(track.y);
      const dist = Math.sqrt((px - mx) ** 2 + (py - my) ** 2);
      if (dist < hitRadius && dist < closestDist) {
        closest = track;
        closestDist = dist;
      }
    });

    setHoveredTrack(closest);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.min(8, Math.max(0.5, prev * delta)));
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(8, prev * 1.4));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev / 1.4));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedGame(null);
  };

  return (
    <div className="page-wrapper">
      <header className="site-header">
        <h1>✧ Track Explorer ✧</h1>
        <p className="last-updated">UMAP Visualization - ZUN&apos;s 379 Original Compositions</p>
      </header>

      <div className="main-container">
        <nav className="sidebar">
          <div className="nav-section">
            <h3>Navigation</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/explorer" className="active">Track Explorer</Link></li>
              <li><Link href="/classifier">Circle Classifier</Link></li>
            </ul>
          </div>

          <div className="nav-section" style={{ marginTop: "12px" }}>
            <h3>Color By</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              <label style={{ fontSize: "11px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="colorBy"
                  checked={colorBy === "era"}
                  onChange={() => setColorBy("era")}
                /> Era
              </label>
              <label style={{ fontSize: "11px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="colorBy"
                  checked={colorBy === "game"}
                  onChange={() => setColorBy("game")}
                /> Game
              </label>
            </div>
          </div>

          <div className="nav-section" style={{ marginTop: "12px" }}>
            <h3>Filter Game</h3>
            <select
              value={selectedGame || ""}
              onChange={(e) => setSelectedGame(e.target.value || null)}
              style={{
                width: "100%",
                padding: "4px",
                fontSize: "11px",
                border: "1px solid #9370DB",
                background: "#fff",
              }}
            >
              <option value="">All Games</option>
              {ALL_GAMES.map((game) => (
                <option key={game} value={game}>
                  {game} ({GAME_ABBREVS[game]})
                </option>
              ))}
            </select>
          </div>

          <div className="nav-section" style={{ marginTop: "12px" }}>
            <h3>Zoom</h3>
            <div style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
              <button onClick={handleZoomOut} style={{ flex: 1, padding: "4px", background: "#DDA0DD", border: "1px solid #9370DB", cursor: "pointer", fontWeight: "bold" }}>−</button>
              <button onClick={handleZoomIn} style={{ flex: 1, padding: "4px", background: "#DDA0DD", border: "1px solid #9370DB", cursor: "pointer", fontWeight: "bold" }}>+</button>
            </div>
            <button onClick={handleReset} style={{ width: "100%", padding: "4px", background: "#FFFAF0", border: "1px solid #9370DB", cursor: "pointer", fontSize: "10px" }}>Reset View</button>
          </div>

          <div className="nav-section" style={{ marginTop: "12px" }}>
            <label style={{ fontSize: "11px", cursor: "pointer" }}>
              <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} /> Show labels (zoom 1.2x+)
            </label>
          </div>

          <div className="nav-section" style={{ marginTop: "12px" }}>
            <h3>Legend</h3>
            <div style={{ fontSize: "9px", maxHeight: "120px", overflowY: "auto" }}>
              {colorBy === "era" ? (
                <>
                  <div><span style={{ color: ERA_COLORS.pc98 }}>●</span> PC-98 (TH01-05)</div>
                  <div><span style={{ color: ERA_COLORS.early_windows }}>●</span> Early (TH06-09)</div>
                  <div><span style={{ color: ERA_COLORS.mid_windows }}>●</span> Mid (TH10-14)</div>
                  <div><span style={{ color: ERA_COLORS.late_windows }}>●</span> Late (TH15+)</div>
                </>
              ) : (
                Object.entries(GAME_ABBREVS).slice(0, 10).map(([game, abbrev]) => (
                  <div key={game} style={{ cursor: "pointer" }} onClick={() => setSelectedGame(game)}>
                    <span style={{ color: GAME_COLORS[game] }}>●</span> {abbrev}
                  </div>
                ))
              )}
            </div>
          </div>
        </nav>

        <main className="content">
          <div className="content-box">
            <div className="content-box-header">♦ UMAP Projection ♦ Scroll=zoom, Drag=pan, Click legend to filter</div>
            <div className="content-box-body" style={{ padding: "8px", background: "#0d0d1a" }}>
              <canvas
                ref={canvasRef}
                width={560}
                height={450}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => { setHoveredTrack(null); setIsDragging(false); }}
                onWheel={handleWheel}
                style={{ display: "block", cursor: isDragging ? "grabbing" : "grab" }}
              />
              {hoveredTrack && (
                <div style={{
                  position: "fixed",
                  left: mousePos.x + 15,
                  top: mousePos.y + 15,
                  background: "#fff",
                  border: "2px solid #9370DB",
                  padding: "8px",
                  fontSize: "11px",
                  boxShadow: "3px 3px 0 #C0C0C0",
                  zIndex: 1000,
                  maxWidth: "200px",
                }}>
                  <div style={{ fontWeight: "bold", color: "#663399" }}>{hoveredTrack.title}</div>
                  <div style={{ color: GAME_COLORS[hoveredTrack.game] }}>
                    {hoveredTrack.game} ({GAME_ABBREVS[hoveredTrack.game]})
                  </div>
                  <div style={{ fontSize: "10px" }}>{hoveredTrack.game_title}</div>
                  <div style={{ color: "#888", fontSize: "9px" }}>Era: {hoveredTrack.era.replace("_", " ")}</div>
                </div>
              )}
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ How to Use ♦</div>
            <div className="content-box-body" style={{ fontSize: "11px" }}>
              <ul style={{ margin: 0, paddingLeft: "18px" }}>
                <li><strong>Zoom:</strong> Scroll wheel or +/- buttons</li>
                <li><strong>Pan:</strong> Click and drag</li>
                <li><strong>Filter:</strong> Select a game from dropdown to isolate</li>
                <li><strong>Hover:</strong> See track details</li>
              </ul>
              <p style={{ marginTop: "10px", marginBottom: 0, color: "#663399" }}>
                <strong>Tip:</strong> Color by Era to see PC-98 tracks cluster separately. Filter to TH11 (SA) to see its isolated position.
              </p>
            </div>
          </div>
        </main>
      </div>

      <footer className="site-footer">
        <p className="copyright">© 2026 Amadeus Wu | UMAP: n_neighbors=15, min_dist=0.1</p>
      </footer>
    </div>
  );
}
