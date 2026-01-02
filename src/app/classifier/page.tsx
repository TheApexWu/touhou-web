"use client";

import Link from "next/link";
import { useState, useRef } from "react";

const CIRCLES = [
  { name: "IOSYS", style: "Electronic, denpa", accuracy: 70, color: "#4ECDC4" },
  { name: "Liz Triangle", style: "Acoustic, folk", accuracy: 75, color: "#98FB98" },
  { name: "SOUND HOLIC", style: "Eurobeat, trance", accuracy: 60, color: "#FFD93D" },
  { name: "UNDEAD CORPORATION", style: "Death metal", accuracy: 95, color: "#FF6B6B" },
  { name: "暁Records", style: "Rock, vocal", accuracy: 80, color: "#DDA0DD" },
];

export default function Classifier() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ circle: string; confidence: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("audio/")) {
      setFile(droppedFile);
      setResult(null);
    }
  };

  const handleClassify = async () => {
    if (!file) return;

    setIsProcessing(true);

    // Simulated classification (ONNX inference would go here)
    // For demo: random result weighted by accuracy
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const randomCircle = CIRCLES[Math.floor(Math.random() * CIRCLES.length)];
    setResult({
      circle: randomCircle.name,
      confidence: 0.7 + Math.random() * 0.25,
    });

    setIsProcessing(false);
  };

  return (
    <div className="page-wrapper">
      <header className="site-header">
        <h1>✧ Circle Classifier ✧</h1>
        <p className="last-updated">Identify Touhou Arrangement Circles</p>
      </header>

      <div className="main-container">
        <nav className="sidebar">
          <div className="nav-section">
            <h3>Navigation</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/explorer">Track Explorer</Link></li>
              <li><Link href="/classifier" className="active">Circle Classifier</Link></li>
            </ul>
          </div>

          <div className="nav-section" style={{ marginTop: "20px" }}>
            <h3>Model Info</h3>
            <div style={{ fontSize: "10px", color: "#666" }}>
              <div>Random Forest</div>
              <div>200 estimators</div>
              <div>431 features</div>
              <div style={{ color: "green", marginTop: "5px" }}>89.5% accuracy</div>
            </div>
          </div>
        </nav>

        <main className="content">
          <div className="spellcard-header">
            Upload Touhou Arrangement
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Audio Upload ♦</div>
            <div className="content-box-body">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: "3px dashed #9370DB",
                  borderRadius: "0",
                  padding: "40px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: file ? "#F0FFF0" : "#FFFAF0",
                  transition: "background 0.2s",
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {file ? (
                  <>
                    <div style={{ fontSize: "24px", marginBottom: "10px" }}>🎵</div>
                    <div style={{ fontWeight: "bold", color: "#663399" }}>{file.name}</div>
                    <div style={{ fontSize: "11px", color: "#888" }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: "24px", marginBottom: "10px" }}>📁</div>
                    <div style={{ color: "#663399" }}>Drop audio file here</div>
                    <div style={{ fontSize: "11px", color: "#888" }}>or click to browse</div>
                    <div style={{ fontSize: "10px", color: "#aaa", marginTop: "10px" }}>
                      Supports: MP3, FLAC, WAV, OGG
                    </div>
                  </>
                )}
              </div>

              {file && !result && (
                <button
                  onClick={handleClassify}
                  disabled={isProcessing}
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    padding: "10px",
                    background: isProcessing
                      ? "#ccc"
                      : "linear-gradient(90deg, #DDA0DD, #87CEEB)",
                    border: "2px solid #9370DB",
                    cursor: isProcessing ? "wait" : "pointer",
                    fontWeight: "bold",
                    color: "#333366",
                  }}
                >
                  {isProcessing ? "Analyzing..." : "Classify Circle →"}
                </button>
              )}
            </div>
          </div>

          {result && (
            <div className="content-box">
              <div className="content-box-header">♦ Classification Result ♦</div>
              <div className="content-box-body" style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#888",
                    marginBottom: "5px",
                  }}
                >
                  Predicted Circle:
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#663399",
                    marginBottom: "10px",
                  }}
                >
                  {result.circle}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: "#F0FFF0",
                    border: "1px solid #98FB98",
                    padding: "5px 15px",
                    fontSize: "12px",
                  }}
                >
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </div>

                <div className="divider-line" style={{ margin: "20px 0" }} />

                <div style={{ fontSize: "11px", color: "#888" }}>
                  Note: This demo uses simulated results.
                  <br />
                  Full ONNX inference coming soon!
                </div>

                <button
                  onClick={() => {
                    setFile(null);
                    setResult(null);
                  }}
                  style={{
                    marginTop: "15px",
                    padding: "8px 20px",
                    background: "#FFFAF0",
                    border: "2px solid #9370DB",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Try Another →
                </button>
              </div>
            </div>
          )}

          <div className="content-box">
            <div className="content-box-header">♦ Supported Circles ♦</div>
            <div className="content-box-body">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Circle</th>
                    <th>Style</th>
                    <th>Model Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {CIRCLES.map((circle) => (
                    <tr key={circle.name}>
                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            background: circle.color,
                            marginRight: "5px",
                          }}
                        />
                        {circle.name}
                      </td>
                      <td>{circle.style}</td>
                      <td>{circle.accuracy}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <footer className="site-footer">
        <p className="copyright">© 2026 Amadeus Wu | Model: Random Forest, 431 handcrafted features</p>
      </footer>
    </div>
  );
}
