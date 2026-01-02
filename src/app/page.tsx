import Link from "next/link";

export default function Home() {
  return (
    <div className="page-wrapper">
      <header className="site-header">
        <h1>✧ Touhou Music Analysis Lab ✧</h1>
        <p className="last-updated">Last Updated: 2026.01.01</p>
      </header>

      <div className="marquee">
        <span>★ Welcome! Two computational musicology projects! ★ ZUN&apos;s 379 original tracks analyzed! ★ 89.5% doujin circle classification! ★</span>
      </div>

      <div className="main-container">
        <nav className="sidebar">
          <div className="nav-section">
            <h3>Navigation</h3>
            <ul>
              <li><Link href="/" className="active">Home</Link></li>
              <li><Link href="/explorer">Track Explorer</Link></li>
              <li><Link href="/classifier">Circle Classifier</Link></li>
            </ul>
          </div>
          <div className="nav-section" style={{ marginTop: "15px" }}>
            <h3>GitHub</h3>
            <ul>
              <li><Link href="https://github.com/TheApexWu/touhou-composition-analysis">OST Analysis</Link></li>
              <li><Link href="https://github.com/TheApexWu/touhou-style-classifier">Circle Classifier</Link></li>
            </ul>
          </div>
        </nav>

        <main className="content">
          {/* Project 1: Original Soundtrack Analysis */}
          <div className="spellcard-header">
            Project 1: ZUN Original Soundtrack Analysis
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ What Is This? ♦</div>
            <div className="content-box-body">
              <p style={{ fontSize: "12px", margin: 0 }}>
                Computational analysis of <strong>ZUN&apos;s 379 original compositions</strong> across 19 Touhou games (TH01-TH19).
                Extracted 110+ audio features per track to empirically measure compositional evolution,
                game atmospheres, and stage vs boss theme differences.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="stat-highlight" style={{ flex: 1 }}>
              <div className="stat-number">379</div>
              <div className="stat-label">ZUN Tracks</div>
            </div>
            <div className="stat-highlight" style={{ flex: 1 }}>
              <div className="stat-number">19</div>
              <div className="stat-label">Games Analyzed</div>
            </div>
            <div className="stat-highlight" style={{ flex: 1 }}>
              <div className="stat-number">110+</div>
              <div className="stat-label">Audio Features</div>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Era Evolution (20 Years of ZUN) ♦</div>
            <div className="content-box-body">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Era</th>
                    <th>Games</th>
                    <th>Tempo</th>
                    <th>Character</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PC-98</td>
                    <td>TH01-05</td>
                    <td>~150 BPM</td>
                    <td>Bright, dense FM synthesis</td>
                  </tr>
                  <tr>
                    <td>Early Windows</td>
                    <td>TH06-09</td>
                    <td>~150 BPM</td>
                    <td>Classic sound, MIDI origins</td>
                  </tr>
                  <tr>
                    <td>Mid Windows</td>
                    <td>TH10-14</td>
                    <td>~140 BPM</td>
                    <td>Maturing, darker</td>
                  </tr>
                  <tr>
                    <td>Late Windows</td>
                    <td>TH15+</td>
                    <td>~130 BPM</td>
                    <td>Modern, melancholic</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ fontSize: "11px", color: "#663399", marginBottom: 0, marginTop: "10px" }}>
                <strong>Key insight:</strong> ZUN&apos;s music has gotten slower and moodier over 20 years.
              </p>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Stage vs Boss Themes ♦</div>
            <div className="content-box-body">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Stage</th>
                    <th>Boss</th>
                    <th>Interpretation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tempo</td>
                    <td>138 BPM</td>
                    <td>125 BPM</td>
                    <td>Stage drives forward</td>
                  </tr>
                  <tr>
                    <td>Spectral Centroid</td>
                    <td>2503 Hz</td>
                    <td>2705 Hz</td>
                    <td>Boss is brighter/piercing</td>
                  </tr>
                  <tr>
                    <td>Onset Rate</td>
                    <td>3.55/s</td>
                    <td>2.84/s</td>
                    <td>Stage is busier</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ fontSize: "11px", color: "#663399", marginBottom: 0, marginTop: "10px" }}>
                <strong>Key insight:</strong> Boss themes emphasize <em>weight over speed</em>.
              </p>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Interactive Demo ♦</div>
            <div className="content-box-body">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Demo</th>
                    <th>Description</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Track Explorer</td>
                    <td>UMAP visualization of all 379 ZUN tracks, colored by era/game</td>
                    <td><Link href="/explorer">Open →</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="divider-sparkle">
            ✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧
          </div>

          {/* Project 2: Doujin Circle Classifier */}
          <div className="spellcard-header">
            Project 2: Doujin Circle Style Classifier
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ What Is This? ♦</div>
            <div className="content-box-body">
              <p style={{ fontSize: "12px", margin: 0 }}>
                Machine learning classifier that identifies which <strong>doujin circle (fan arrangement group)</strong> created
                a Touhou arrangement based on audio features. Trained on 954 tracks from 5 major circles.
                These are <em>fan-made arrangements</em>, not ZUN&apos;s original compositions.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="stat-highlight" style={{ flex: 1 }}>
              <div className="stat-number">89.5%</div>
              <div className="stat-label">Classification Accuracy</div>
            </div>
            <div className="stat-highlight" style={{ flex: 1 }}>
              <div className="stat-number">5</div>
              <div className="stat-label">Doujin Circles</div>
            </div>
            <div className="stat-highlight" style={{ flex: 1 }}>
              <div className="stat-number">954</div>
              <div className="stat-label">Arrangement Tracks</div>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Target Circles ♦</div>
            <div className="content-box-body">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Circle</th>
                    <th>Style</th>
                    <th>Tracks</th>
                    <th>Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>UNDEAD CORPORATION</td>
                    <td>Death metal</td>
                    <td>63</td>
                    <td style={{ color: "green" }}>95%</td>
                  </tr>
                  <tr>
                    <td>暁Records</td>
                    <td>Rock, vocal</td>
                    <td>281</td>
                    <td>80%</td>
                  </tr>
                  <tr>
                    <td>Liz Triangle</td>
                    <td>Acoustic, folk</td>
                    <td>84</td>
                    <td>75%</td>
                  </tr>
                  <tr>
                    <td>IOSYS</td>
                    <td>Electronic, denpa</td>
                    <td>324</td>
                    <td>70%</td>
                  </tr>
                  <tr>
                    <td>SOUND HOLIC</td>
                    <td>Eurobeat, trance</td>
                    <td>202</td>
                    <td style={{ color: "#cc6600" }}>60%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Embeddings Experiment ♦</div>
            <div className="content-box-body">
              <p style={{ fontSize: "12px", marginTop: 0 }}>Handcrafted features vs pretrained neural embeddings:</p>
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Accuracy</th>
                    <th>Dims</th>
                    <th>Time/Sample</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: "#98FB98" }}>
                    <td><strong>Handcrafted</strong></td>
                    <td><strong>76.0%</strong></td>
                    <td>431</td>
                    <td>2.28s</td>
                  </tr>
                  <tr>
                    <td>CLAP (pretrained)</td>
                    <td>57.0%</td>
                    <td>512</td>
                    <td>0.14s</td>
                  </tr>
                  <tr>
                    <td>MERT (music-specific)</td>
                    <td>52.0%</td>
                    <td>768</td>
                    <td>5.43s</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ fontSize: "11px", color: "#663399", marginBottom: 0, marginTop: "10px" }}>
                <strong>Key insight:</strong> Domain-specific feature engineering beats transfer learning for niche music classification.
              </p>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ What Are &quot;Handcrafted Features&quot;? ♦</div>
            <div className="content-box-body" style={{ fontSize: "11px" }}>
              <p style={{ margin: "0 0 10px 0" }}>
                Instead of using neural network embeddings, we extract <strong>431 interpretable audio measurements</strong> using signal processing (librosa):
              </p>
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Feature Type</th>
                    <th>What It Measures</th>
                    <th>Dims</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mel Spectrogram</td>
                    <td>Energy across 128 frequency bands (mean, std per band)</td>
                    <td>256</td>
                  </tr>
                  <tr>
                    <td>MFCCs</td>
                    <td>Timbral texture - 20 coefficients + deltas (rate of change)</td>
                    <td>60</td>
                  </tr>
                  <tr>
                    <td>Chroma</td>
                    <td>Pitch class distribution (C, C#, D... B) - harmonic content</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Spectral Contrast</td>
                    <td>Peak vs valley energy in 7 frequency bands</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <td>Spectral Stats</td>
                    <td>Centroid (brightness), bandwidth, rolloff, flatness</td>
                    <td>16</td>
                  </tr>
                  <tr>
                    <td>Tempo</td>
                    <td>BPM estimate</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ margin: "10px 0 0 0", color: "#663399" }}>
                <strong>Why handcrafted beat pretrained:</strong>
              </p>
              <ul style={{ margin: "5px 0 0 0", paddingLeft: "18px", color: "#555" }}>
                <li><strong>Domain mismatch:</strong> CLAP trained on general audio (AudioSet), MERT on generic music - neither saw Touhou arrangements</li>
                <li><strong>Style vs content:</strong> Pretrained models capture <em>what&apos;s playing</em> (instruments, genre), but circle style is subtler - production choices, mixing, arrangement patterns</li>
                <li><strong>Small data:</strong> 954 tracks isn&apos;t enough to fine-tune large models; handcrafted + Random Forest works well with limited data</li>
                <li><strong>Interpretable:</strong> We can explain <em>why</em> - UNDEAD CORPORATION has low spectral centroid (dark/heavy) + high contrast (metal), IOSYS has fast tempo + bright timbre (denpa)</li>
              </ul>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Interactive Demo ♦</div>
            <div className="content-box-body">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Demo</th>
                    <th>Description</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Circle Classifier</td>
                    <td>Upload a Touhou arrangement → predict which circle made it</td>
                    <td><Link href="/classifier">Open →</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="divider-sparkle">
            ✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧
          </div>

          {/* Bonus: Diffusion Experiments */}
          <div className="spellcard-header">
            Bonus: Diffusion Model Experiments
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Learning Journey ♦</div>
            <div className="content-box-body">
              <p style={{ fontSize: "12px", margin: 0 }}>
                As a learning exercise, I implemented <strong>DDPM (Denoising Diffusion Probabilistic Models)</strong> from scratch
                to understand generative modeling. Trained on mel spectrograms from the doujin circle dataset.
                This is educational/experimental work, not production-ready generation.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <div className="stat-highlight" style={{ flex: 1 }}>
              <div className="stat-number">500</div>
              <div className="stat-label">Epochs Trained</div>
            </div>
            <div className="stat-highlight" style={{ flex: 1 }}>
              <div className="stat-number">2,832</div>
              <div className="stat-label">Mel Spectrograms</div>
            </div>
            <div className="stat-highlight" style={{ flex: 1 }}>
              <div className="stat-number">5.5h</div>
              <div className="stat-label">Training Time (M2)</div>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Implementation Details ♦</div>
            <div className="content-box-body">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Implementation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Noise Schedule</td>
                    <td>Linear and cosine β schedules (1000 timesteps)</td>
                  </tr>
                  <tr>
                    <td>Architecture</td>
                    <td>U-Net with skip connections, GroupNorm, sinusoidal time embeddings</td>
                  </tr>
                  <tr>
                    <td>Sampling</td>
                    <td>DDPM (1000 steps) and DDIM (50 steps, deterministic)</td>
                  </tr>
                  <tr>
                    <td>Conditioning</td>
                    <td>Class-conditioned with classifier-free guidance (CFG scale 3.0)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Forward Process Visualization ♦</div>
            <div className="content-box-body" style={{ textAlign: "center", padding: "10px" }}>
              <img
                src="/images/diffusion_forward_process.png"
                alt="Diffusion forward process - adding noise over timesteps"
                style={{ maxWidth: "100%", border: "1px solid #9370DB" }}
              />
              <p style={{ fontSize: "10px", color: "#888", margin: "8px 0 0 0" }}>
                Forward process: Clean spectrogram → progressively noisier → pure noise (t=1000)
              </p>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Generated Samples (Epoch 500) ♦</div>
            <div className="content-box-body" style={{ textAlign: "center", padding: "10px" }}>
              <img
                src="/images/touhou_full_epoch_500.png"
                alt="Generated mel spectrograms after 500 epochs"
                style={{ maxWidth: "100%", border: "1px solid #9370DB" }}
              />
              <p style={{ fontSize: "10px", color: "#888", margin: "8px 0 0 0" }}>
                Class-conditioned generation: Each row is a different doujin circle
              </p>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ Training Loss ♦</div>
            <div className="content-box-body" style={{ textAlign: "center", padding: "10px" }}>
              <img
                src="/images/touhou_full_loss.png"
                alt="Training loss curve over 500 epochs"
                style={{ maxWidth: "100%", border: "1px solid #9370DB" }}
              />
              <p style={{ fontSize: "10px", color: "#888", margin: "8px 0 0 0" }}>
                MSE loss on predicted noise. Converged around epoch 300.
              </p>
            </div>
          </div>

          <div className="content-box">
            <div className="content-box-header">♦ What I Learned ♦</div>
            <div className="content-box-body" style={{ fontSize: "12px" }}>
              <ul style={{ margin: 0, paddingLeft: "18px" }}>
                <li><strong>Forward process math:</strong> q(x_t | x_0) lets you jump to any timestep directly</li>
                <li><strong>Reparameterization:</strong> Predicting noise ε instead of x_0 stabilizes training</li>
                <li><strong>CFG tradeoff:</strong> Higher guidance = more class-coherent but less diverse</li>
                <li><strong>DDIM acceleration:</strong> Deterministic sampling enables 20x fewer steps</li>
                <li><strong>Spectrograms are hard:</strong> High-frequency details need more capacity than toy datasets</li>
              </ul>
              <p style={{ marginTop: "10px", marginBottom: 0, color: "#888", fontSize: "11px" }}>
                Code available in <code>scripts/experiment_diffusion_simple.py</code>
              </p>
            </div>
          </div>
        </main>
      </div>

      <footer className="site-footer">
        <div className="content-box" style={{ margin: "0 15px 15px 15px", textAlign: "center" }}>
          <div className="content-box-header">♦ Special Thanks ♦</div>
          <div className="content-box-body" style={{ fontSize: "11px" }}>
            <p style={{ margin: 0 }}>
              Touhou Project © <strong>Team Shanghai Alice</strong> (ZUN)
            </p>
            <p style={{ margin: "5px 0 0 0", color: "#888" }}>
              This is a fan-made analysis project. All original music and characters belong to ZUN.
              <br />
              東方Projectの二次創作です。
            </p>
          </div>
        </div>
        <div className="button-bar">
          <div className="button-88x31">Python 3.11</div>
          <div className="button-88x31">librosa</div>
          <div className="button-88x31">soundfile</div>
          <div className="button-88x31">scikit-learn</div>
          <div className="button-88x31">NumPy</div>
          <div className="button-88x31">Next.js</div>
        </div>
        <div className="hit-counter">
          <span>You are visitor #</span>
          <span>0</span><span>0</span><span>1</span><span>3</span><span>3</span><span>7</span>
        </div>
        <p className="copyright">© 2026 Amadeus Wu | Best viewed in 800x600</p>
      </footer>
    </div>
  );
}
